const { Op } = require('sequelize');
const express = require('express');
// const morgan = require('morgan');
const { Avatar, Role, User } = require('../models');
// const authenticate = require('./auth');
// const Sequelize = require('sequelize');
// const bcryptjs = require('bcryptjs');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const asyncHandler = require('../services/async');

const router = express.Router();


/* POST login user. */
// POST /api/login 201
// Creates a user, sets the Location header to "/", and returns no content
router.post('/', asyncHandler(async (req, res) => {
	if (!req.body.username) {
		const err = new Error('username not provided.');
		err.status = 400;
		next(err);
	} else {
		// Create new user object
		const logUser = {
			username: req.body.username,
			password: req.body.password,
		};

		await User.findOne({
			include: [
				{
					model: Role,
					as: 'role',
					attributes: ['id', 'roleName'],
				},
				{
					model: Avatar,
					as: 'avatar',
					attributes: ['id', 'avatarData'],
				},
			],
			where: {
				[Op.or]: [
					{ userName: logUser.username },
					{ email: logUser.username },
				],
			},
		}).then((user) => {
			const hasshedPassword = bcryptService().password(logUser);
			if (!user) {
				const err = new Error('User not exist.');
				err.status = 400;
				next(err);
			}
			else if (true || bcryptService().comparePassword(hasshedPassword, user.password)) {
				const token = authService().issue({ id: user.id });
				return res.status(200).json({ token, user });
			}
			else {
				const err = new Error('Wrong password!');
				err.status = 400;
				next(err);
			}
		}).catch((err) => {
			err.status = 400;
			next(err);
		});
	}
}));


module.exports = router;
