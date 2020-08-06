import { Request, Response } from 'express';
// import { userController } from "../userController";
import { googleLoginUrl, decodeToken } from './utils';

export const googleController = {
	authenticate: (__: Request, res: Response) => {
		console.info('Authenticating with Google');
		res.redirect(googleLoginUrl);
	},
	redirect: async (req: Request, res: Response) => {
		const urlParams = req.query;
		console.info('redirecting');
		if (urlParams.error) {
			console.error(`An error occurred: ${urlParams.error}`);
			res.status(403).json({ error: urlParams.error });
		} else {
			const code = urlParams.code;
			if (typeof code === 'string') {
				const newUser = await decodeToken(code);
				console.log('newUser:', newUser);
				// userController.addOrUpdate(newUser, res);
			} else {
				res.status(403).json({ error: 'No code provided' });
			}
		}
	},
};
