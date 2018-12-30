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
	// res.cookie('cookie', tokenForUser(req.user));
	res.json({
		fail: null,
		state: null,
		success: {
			user: {
				token: tokenForUser(req.user)
			}
		}
	});
});

module.exports = router;
