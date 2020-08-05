import { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface UserInterfaceBase extends Document {
	email: string;
	password: string;
}
export interface UserInterface extends UserInterfaceBase {
	isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema: Schema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, 'Must match an email address!'],
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// set up pre-save middleware to create password
userSchema.pre<UserInterface>('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password: string) {
	return bcrypt.compare(password, this.password);
};

export const User = model<UserInterface>('User', userSchema);

export default User;
