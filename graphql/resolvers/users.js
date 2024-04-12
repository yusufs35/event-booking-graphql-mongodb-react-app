const jwt = require("jsonwebtoken");
const {
	getUsers,
	createUser,
	getUserByEmailWithPassword,
} = require("../../mongoose/actions/users");
const bcrypt = require("bcryptjs");

const userResolver = {
	users: async (_, req) => {
		try {
			if (!req.isAuth) throw new Error("Unauthorized request");
			const users = await getUsers();
			return users;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},

	createUser: async (args, req) => {
		try {
			if (!req.isAuth) throw new Error("Unauthorized request");
			const payload = {
				...args.userInput,
				password: await bcrypt.hash(args.userInput.password, 12),
			};
			return await createUser(payload);
		} catch (err) {
			console.log(err);
			throw err;
		}
	},

	login: async (args) => {
		try {
			const user = await getUserByEmailWithPassword(args.email);
			if (!user) throw new Error("Invalid credentials");

			const isEqual = await bcrypt.compare(args.password, user.password);
			if (!isEqual) throw new Error("Invalid credentials");

			const SECRET_KEY = process.env.SECRET_AUTH_KEY;
			console.log("SECRET_KEY", SECRET_KEY);

			const token = jwt.sign(
				{ userId: user.id, email: user.email },
				SECRET_KEY,
				{ expiresIn: "1h" }
			);

			return {
				userId: user.id,
				token,
				tokenExpiration: 1,
			};
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};

module.exports = userResolver;
