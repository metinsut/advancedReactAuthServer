const express = require('express');
const router = express.Router();
const userSchema = require('../models/user');

router.post('/', (req, res) => {
    const deleteAll = userSchema.findOneAndRemove();
    deleteAll
        .then(data => {
            res.json({
                data
            });
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;
