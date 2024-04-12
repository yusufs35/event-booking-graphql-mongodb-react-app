const { getEvents, createEvent, deleteEvent } = require("../../mongoose/actions/events");

const eventResolver = {
	events: async () => {
		try {
			const events = await getEvents();
			return events;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	createEvent: async (args, req) => {
		try {
			if(!req.isAuth) throw new Error("Unauthorized request")
			return await createEvent(args.eventInput);
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
    deleteEvent: async (args, req) => {
		try {
			if(!req.isAuth) throw new Error("Unauthorized request")
			return await deleteEvent(args.eventInput);
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};


module.exports = eventResolver;