/* const { getEvent } = require("../mongoose/actions/events");
const { getUser } = require("../mongoose/actions/users");
 */ const { dateToString } = require("./date");

const transformEvent = (event) => {
	return {
		...event._doc,
		date: dateToString(event._doc.date),
	};
};

const transformBooking = (booking) => ({
	...booking._doc,
	createAt: dateToString(booking._doc.createdAt),
	updateAt: dateToString(booking._doc.updatedAt),
});

const transformUser = (user) => ({ ...user._doc, password: null });

module.exports = { transformEvent, transformBooking, transformUser };
