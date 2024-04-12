const {
	getBookings,
	createBooking,
	deleteBooking,
} = require("../../mongoose/actions/bookings");

const bookingResolver = {
	bookings: async (_, req) => {
		try {
			if (!req.isAuth) throw new Error("Unauthorized request");
			const bookings = await getBookings();
			return bookings;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},

	bookEvent: async (args, req) => {
		try {
			if (!req.isAuth) throw new Error("Unauthorized request");
			return await createBooking(args.bookingInput);
		} catch (err) {
			console.log(err);
			throw err;
		}
	},

	cancelBooking: async (args, req) => {
		try {
			if (!req.isAuth) throw new Error("Unauthorized request");
			return await deleteBooking(args.bookingId);
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};

module.exports = bookingResolver;
