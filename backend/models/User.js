const mongoose = require('mongoose');
const roles = require('../constants/roles');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: Number,
			default: roles.USER,
		},
	},
	{ timestamps: true },
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
