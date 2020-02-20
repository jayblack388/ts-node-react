import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import Bundler from 'parcel-bundler';
import path from 'path';

import routes from './routes';

const app = express();
const bundler = new Bundler(
	path.join(__dirname, '../../src/client/index.html')
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(routes);
app.use(bundler.middleware());

// Logger if error is getting missed
/* app.use((err: any, req: any, res: any, next: any) => {
	if (err) {
		console.log('This is the error ->', err);
	}
	next(err);
}); */

export default app;
