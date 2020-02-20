import { Request, Response } from 'express';
export const dataController = {
	addData: (req: Request, res: Response) => {
		console.log('Adding some data => ', req.body);
	},
	deleteData: (req: Request, res: Response) => {
		console.log('Deleting some data => ', req.body);
	},
	getAllData: (req: Request, res: Response) => {
		console.log('Get All Data');
	},
	getData: (req: Request, res: Response) => {
		console.log(`Getting ${req.params.id} data`);
	},
	updateData: (req: Request, res: Response) => {
		console.log('Updating some data => ', req.body);
	},
};
