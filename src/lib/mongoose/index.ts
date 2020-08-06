import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

export const connectDB = async () => {
	try {
		if (mongoose.connections[0].readyState !== 1) {
			await mongoose.connect(MONGODB_URI, {
				useCreateIndex: true,
				useFindAndModify: false,
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
		}
	} catch (error) {
		console.error('error:', error);
	}
};

export const db = mongoose.connection;

export default connectDB;
