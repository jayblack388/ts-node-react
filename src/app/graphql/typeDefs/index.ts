import { gql } from 'apollo-server-express';

export const typeDefs = gql`
	type Auth {
		token: ID!
		user: User
	}
	type User {
		_id: ID
		username: String
		email: String
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
