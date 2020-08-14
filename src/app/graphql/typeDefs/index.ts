import { gql } from 'apollo-server-express';

export const typeDefs = gql`
	scalar Date
	type Auth {
		token: ID!
		user: User
	}
	type Name {
		familyName: String
		givenName: String
		name: String
	}
	type User {
		_id: ID
		createdAt: Date
		email: String
		name: Name
		picture: String
		updatedAt: Date
	}
	type Mutation {
		addUser(email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
	}
	type Query {
		helloWorld: String
		me: User
		user(email: String!): User
		users: [User]
	}
`;

export default typeDefs;
