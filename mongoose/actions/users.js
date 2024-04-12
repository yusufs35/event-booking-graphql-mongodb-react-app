const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { transformUser } = require("../../helpers/transformations");

const getUsers = async () => {
	const users = await User.find().populate("createdEvents");
	return users.map((user) => transformUser(user));
};

const getUser = async (id) => {
	const user = await User.findById(id);
	console.log("User", user)
	return transformUser(user);
};

const createUser = async (payload) => {
	const existingUser = await User.findOne({
		email: payload.email,
	});

	if (existingUser) throw new Error("User is already exists");

	const hashedPassword = await bcrypt.hash(payload.password, 12);
	const user = new User({ ...payload, password: hashedPassword });

	const res = await user.save();
	return transformUser(res);
};

module.exports = { getUsers, createUser, getUser };
