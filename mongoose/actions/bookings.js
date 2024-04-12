const { dateToString } = require("../../helpers/date");
const {
	transformEvent,
	transformBooking,
} = require("../../helpers/transformations");
const Booking = require("../models/booking");
const { getEvent } = require("./events");
const { getUserById } = require("./users");

const getBookings = async () => {
	const bookings = await Booking.find().populate("user").populate("event");
	return bookings.map((booking) => transformBooking(booking));
};

const createBooking = async (payload) => {
	const event = await getEvent(payload.event);
	if (!event) throw new Error("Event was not found");

	const user = await getUserById(payload.user);
	if (!user) throw new Error("User was not found");

	const existingBooking = await Booking.findOne({
		user: user._id,
		event: event._id,
	});

	if (existingBooking)
		throw new Error("The user has already booked this event");

	const booking = new Booking({ ...payload });

	const res = await booking.save();
	console.log("Hello", res);
	return transformBooking(res);
};

const deleteBooking = async (bookingId) => {
	const booking = await Booking.findById(bookingId).populate("event");
	if (!booking) throw new Error("Booking was not found");

	const event = transformEvent(booking.event);

	await Booking.deleteOne({ _id: bookingId });
	return event;
};

module.exports = { getBookings, createBooking, deleteBooking };
