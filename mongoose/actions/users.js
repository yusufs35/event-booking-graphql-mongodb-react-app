const User = require("../models/user");
const { transformUser } = require("../../helpers/transformations");

const getUsers = async () => {
	const users = await User.find().populate("createdEvents");
	return users.map((user) => transformUser(user));
};

const getUserById = async (id) => {
	const user = await User.findById(id);
	return transformUser(user);
};

const getUserByEmailWithPassword = async (email) => {
	const user = await User.findOne({ email });
	return user;
};

const createUser = async (payload) => {
	const existingUser = await User.findOne({
		email: payload.email,
	});

	if (existingUser) throw new Error("User is already exists");

	const user = new User({ ...payload });

	const res = await user.save();
	return transformUser(res);
};

module.exports = {
	getUsers,
	createUser,
	getUserById,
	getUserByEmailWithPassword,
};
