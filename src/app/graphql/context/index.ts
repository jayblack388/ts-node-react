import jwt from 'jsonwebtoken';

const { TOKEN_EXPIRATION, TOKEN_SECRET } = process.env;

export const context = ({ req }) => {
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
		const { data } = jwt.verify(token, TOKEN_SECRET, {
			maxAge: TOKEN_EXPIRATION,
		});
		req.user = data;
	} catch {
		console.log('Invalid token');
	}

	// return updated request object
	return req;
};

export const signToken = (data) =>
	jwt.sign({ data }, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION });
