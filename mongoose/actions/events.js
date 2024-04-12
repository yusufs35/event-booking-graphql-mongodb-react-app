const { transformEvent } = require("../../helpers/transformations");
const Event = require("../models/event");
const User = require("../models/user");

const getEvents = async () => {
	const events = await Event.find().populate("creator");
	return events.map((event) => transformEvent(event));
};

const getEvent = async (id) => {
	const event = await Event.findById(id);
	if (!event) throw new Error("Event not found");
	console.log("#############", typeof transformEvent)
	return transformEvent(event);
};

const createEvent = async (payload) => {
	const user = await User.findById(payload.creator);
	if (!user) throw new Error("User not found");

	const event = new Event(payload);
	const res = await event.save();
	user.createdEvents.push(event);
	await user.save();

	return { ...res._doc };
};

const deleteEvent = async (id) => {
	const event = await Event.findById(id);
	if (!event) throw new Error("Event not found");

	const res = await event.deleteOne({ _id: id });
	
	return { ...res._doc };
};

module.exports = { getEvents, createEvent, getEvent, deleteEvent };
