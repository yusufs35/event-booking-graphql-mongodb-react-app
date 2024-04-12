const bookingResolver = require("./bookings");
const eventResolver = require("./events");
const userResolver = require("./users");


const rootValue = {
	...userResolver,
	...eventResolver,
	...bookingResolver,
};

module.exports = rootValue;
