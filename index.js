const {ApolloServer, gql, MockList } = require("apollo-server");

const typeDefs = gql`
	scalar Date

	"""
	An object that describes the  characteristics of a ski day
	"""
	type SkiDay {
		"A Ski Day's unique Identifier"
		id: ID!
		date: Date!
		mountain: String!
		conditions: Conditions
	}

	enum Conditions {
		POWDER
		HEAVY
		ICE
		THIN
	}

	type Query {
		totalDays: Int!
		allDays: [SkiDay!]!
	}

	input AddDayInput {
		date: Date!
		mountain: String!
		conditions: Conditions
	}

	type RemoveDayPayload {
		day: SkiDay!
		removed: Boolean
		totalBefore: Int
		totalAfter: Int
	}

	type Mutation {
		addDay(input: AddDayInput!): SkiDay
		removeDay(id: ID!): RemoveDayPayload!
	}
	type Subscription {
		newDay: SkiDay!
	}
`;

const mocks = {
	Date: () => "1/1/2025",
	String: () => "This is a sample String",
	Query: () => ({
		allDays: () => new MockList([8, 16])
	})
};

const server = new ApolloServer({
	typeDefs,
	mocks
});

server
	.listen()
	.then( ({url}) => console.log(`Server running at ${url}`)
);
