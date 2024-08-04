const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate } = require('../helpers/token');
const ROLES = require('../constants/roles');

// signUp user
async function register(name, password, email) {
	if (!password) {
		throw new Error('Password is empty');
	}

	if (!email) {
		throw new Error('Email is empty');
	}

	const passwordHash = await bcrypt.hash(password, 10);

	const user = await User.create({ login, password: passwordHash });

	const token = generate({ id: user.id });

	return {
		token,
		user,
	};
}

// signIn login
async function login(login, password) {
	const user = await User.findOne({ login });

	if (!user) {
		throw new Error('User not found!');
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		throw new Error('Wrong password!');
	}

	const token = generate({ id: user.id });

	return {
		token,
		user,
	};
}

// get list users
async function getUsers() {
	return await User.find();
}

// get list roles
function getRoles() {
	return [
		{
			id: ROLES.ADMIN,
			name: 'Admin',
		},
		{
			id: ROLES.MODERATOR,
			name: 'Moderator',
		},
		{
			id: ROLES.USER,
			name: 'User',
		},
	];
}

// edit (roles)
async function updateUser(id, userData) {
	return await User.findByIdAndUpdate({ _id: id }, userData, {
		returnDocument: 'after',
	});
}

// delete user
async function deleteUser(id) {
	return await User.deleteOne({ _id: id });
}

module.exports = {
	register,
	login,
	getUsers,
	getRoles,
	updateUser,
	deleteUser,
};
