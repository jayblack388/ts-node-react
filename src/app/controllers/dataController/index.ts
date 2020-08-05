import { Request, Response } from 'express';
export const dataController = {
	addData: (req: Request, res: Response) => {
		console.info('Adding some data => ', req.body);
	},
	deleteData: (req: Request, res: Response) => {
		console.info('Deleting some data => ', req.body);
	},
	getAllData: (req: Request, res: Response) => {
		console.info('Get All Data');
	},
	getData: (req: Request, res: Response) => {
		console.info(`Getting ${req.params.id} data`);
	},
	updateData: (req: Request, res: Response) => {
		console.info('Updating some data => ', req.body);
	},
};
