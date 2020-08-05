// import { IResolvers } from 'apollo-server-express';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { UserInterface } from '../../models';

interface CustomRequest extends Request {
	user: any;
}

const { TOKEN_EXPIRATION, TOKEN_SECRET } = process.env;

export const context = ({ req }: { req: CustomRequest }) => {
	// allows token to be sent via req.body, req.query, or headers
	let token = req.body.token || req.query.token || req.headers.authorization;

	// separate "Bearer" from "<tokenvalue>"
	if (req.headers.authorization) {
		token = token.split(' ').pop().trim();
	}

	// if no token, return request object as is
	if (!token) {
		return req;
	}

	try {
		// decode and attach user data to request object
		const result = jwt.verify(token, TOKEN_SECRET, {
			maxAge: TOKEN_EXPIRATION,
		});
		req.user = result;
	} catch {
		console.error('Invalid token');
	}

	// return updated request object
	return req;
};

export const signToken = ({
	_id,
	dateCreated,
	email,
	name,
	picture,
}: UserInterface) => {
	return jwt.sign(
		{ data: { _id, dateCreated, email, name, picture } },
		TOKEN_SECRET,
		{
			expiresIn: TOKEN_EXPIRATION,
		}
	);
};
