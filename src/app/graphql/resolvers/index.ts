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
			return undefined;
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
			try {
				const user = await User.create(args);
				if (!user) {
					throw new AuthenticationError(
						'Something went wrong, user is unavailable'
					);
				}
				const token = signToken(user);
				return { token, user };
			} catch (error) {
				console.error('src/app/graphql/resolvers/index.ts:35', error);
				if (error.code === 11000) {
					throw new AuthenticationError('User already exists');
				} else {
					throw new AuthenticationError(error.message);
				}
			}
		},
		login: async (__, { email, password }) => {
			try {
				const user = await User.findOne({ email });
				if (!user) {
					throw new AuthenticationError('Incorrect credentials');
				}
				const correctPw = await user.isCorrectPassword(password);
				if (!correctPw) {
					throw new AuthenticationError('Incorrect credentials');
				}
				const token = signToken(user);
				return { token, user };
			} catch (error) {
				console.error('src/app/graphql/resolvers/index.ts:53', error);
				throw new AuthenticationError('Incorrect credentials');
			}
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
