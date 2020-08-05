// import { AuthenticationError } from 'apollo-server-express';
// import { User } from '../models';
// import { signToken } from '../context';

export const resolvers = {
	// Mutation: {
	// 	// addUser: async (parent, args) => {
	// 	// 	const user = await User.create(args);
	// 	// 	const token = signToken(user);
	// 	// 	return { token, user };
	// 	// },
	// 	// login: async (parent, { email, password }) => {
	// 	// 	const user = await User.findOne({ email });
	// 	// 	if (!user) {
	// 	// 		throw new AuthenticationError('Incorrect credentials');
	// 	// 	}
	// 	// 	const correctPw = await user.isCorrectPassword(password);
	// 	// 	if (!correctPw) {
	// 	// 		throw new AuthenticationError('Incorrect credentials');
	// 	// 	}
	// 	// 	const token = signToken(user);
	// 	// 	return { token, user };
	// 	// },
	// },
	Query: {
		helloWorld: () => {
			return 'Hello world!';
		},
		// me: async (parent, args, context) => {
		// 	if (context.user) {
		// 		const userData = await User.findOne({
		// 			_id: context.user._id,
		// 		});
		// 		return userData;
		// 	}
		// 	throw new AuthenticationError('Not logged in');
		// },
		// user: async (parent, { username }) => {
		// 	return User.findOne({ username })
		// 		.select('-__v -password')
		// 		.populate('friends')
		// 		.populate('thoughts');
		// },
		// users: async () => {
		// 	return User.find()
		// 		.select('-__v -password')
		// 		.populate('friends')
		// 		.populate('thoughts');
		// },
	},
};

export default resolvers;
