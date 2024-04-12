const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require("./graphql/schema");
const rootValue = require("./graphql/resolvers");
const isAuth = require("./middleware/is-auth");
require('dotenv').config()


const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
	"/graphql",
	graphqlHTTP({
		schema: graphqlSchema,
		rootValue,
		graphiql: true,
	})
);

(async () => {
	try {
		await mongoose.connect(process.env.CONNECTION_STRING);
		app.listen(3000, () => {
			console.log("App is started and listening on port 3000...");
		});
	} catch (err) {
		console.log(err);
	}
})();
