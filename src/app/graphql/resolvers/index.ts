import { AuthenticationError, IResolvers } from 'apollo-server-express';
import { User } from '../../models';
import { signToken } from '../context';

export const resolvers: IResolvers = {
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
