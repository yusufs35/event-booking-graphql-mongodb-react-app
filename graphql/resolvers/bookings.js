const {
	getBookings,
	createBooking,
	deleteBooking,
} = require("../../mongoose/actions/bookings");

const bookingResolver = {
	bookings: async () => {
		try {
			const bookings = await getBookings();
			return bookings;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},

	bookEvent: async (args) => {
		try {
			return await createBooking(args.bookingInput);
		} catch (err) {
			console.log(err);
			throw err;
		}
	},

	cancelBooking: async (args) => {
		try {
			return await deleteBooking(args.bookingId);
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};

module.exports = bookingResolver;
