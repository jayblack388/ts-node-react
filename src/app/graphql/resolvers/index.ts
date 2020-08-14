import { AuthenticationError, IResolvers } from 'apollo-server-express';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { User } from '../../models';
import { signToken } from '../context';

export const resolvers: IResolvers = {
	Date: new GraphQLScalarType({
		name: 'Date',
		description: 'Custom Date Scalar',
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return new Date(ast.value);
			}
			return null;
		},
		parseValue(value) {
			return new Date(value);
		},
		serialize(value) {
			return value.getTime();
		},
	}),
	Mutation: {
		addUser: async (__, args) => {
			const user = await User.create(args);
			const token = signToken(user);
			return { token, user };
		},
		login: async (__, { email, password }) => {
			const user = await User.findOne({ email });
			if (!user) {
				throw new AuthenticationError('Incorrect credentials');
			}
			const correctPw = await user.isCorrectPassword(password);
			if (!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}
			const token = signToken(user);
			console.log(user);
			console.log(token);
			return { token, user };
		},
	},
	Query: {
		helloWorld: () => {
			return 'Hello world!';
		},
		me: async (_, __, context) => {
			if (context.user) {
				const userData = await User.findOne({
					_id: context.user._id,
				});
				return userData;
			}
			throw new AuthenticationError('Not logged in');
		},
		user: async (__, { email }) => {
			return User.findOne({ email }).select('-__v -password');
		},
		users: async () => {
			return User.find().select('-__v -password');
		},
	},
};

export default resolvers;
