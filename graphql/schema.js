const { buildSchema } = require("graphql");

const schema = buildSchema(`
type Booking{
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
}

type User {
    _id: ID!,
    firstName: String!
    lastName: String!
    email: String!
    password: String
    createdEvents: [Event!]
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input EventInput {
    title: String! 
    description: String!
    price: Float!
    date: String!
    creator: String!
}

input UserInput {
    firstName: String!
    lastName: String!
    email: String
    password: String
}

input BookingInput {
    user: String!
    event: String!
}

type RootQuery {
    events: [Event!]!
    users: [User!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createEvent(eventInput: EventInput!): Event
    createUser(userInput: UserInput): User
    bookEvent(bookingInput: BookingInput): Booking
    cancelBooking(bookingId: ID!): Event
}

schema{
    query: RootQuery
    mutation: RootMutation
}
`);

module.exports = schema;
