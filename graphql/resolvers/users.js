const { getUsers, createUser } = require("../../mongoose/actions/users");


const userResolver = {
	users: async () => {
		try {
			const users = await getUsers();
			return users;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},

	createUser: async (args) => {
		try {
			return await createUser(args.userInput);
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};

module.exports = userResolver;
