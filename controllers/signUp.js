const express = require('express');
const router = express.Router();
const userSchema = require('../models/user');
const jtw = require('jwt-simple');
const config = require('../config');

tokenForUser = user => {
    const timestamp = new Date().getTime();
    return jtw.encode({ sub: user.id, iat: timestamp }, config.secret);
};

router.post('/', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.json({
            fail: 'You must provide email and password',
            state: null,
            success: null
        });
    } else {
        const findUser = userSchema.findOne({ email: email });

        findUser
            .then(data => {
                if (data) {
                    res.json({
                        fail: 'Email is in use',
                        state: null,
                        success: null
                    });
                } else {
                    const user = new userSchema({
                        email: email,
                        password: password,
                    });
                    const saveUser = user.save();
                    saveUser
                        .then(user => {
                            res.json({
                                fail: null,
                                state: null,
                                success: {
                                    user: {
                                        id: user.id,
                                        email: user.email,
                                        token: tokenForUser(user)
                                    }
                                }
                            });
                        })
                        .catch(err => {
                            res.json({
                                fail: {
                                    type: 'Save problem',
                                    error: err
                                },
                                state: null,
                                success: null
                            });
                        });
                }
            })
            .catch(err => {
                res.json({
                    fail: {
                        type: 'Find problem',
                        error: err
                    },
                    state: null,
                    success: null
                });
            });
    }
});

module.exports = router;
