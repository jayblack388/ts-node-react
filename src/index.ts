import { config } from 'dotenv';
config();
import app, { apolloSeverURL } from './app';
import { db, printLogo } from './lib';

const { PORT } = process.env;

if (db) {
	db.once('open', () => {
		printLogo();
		console.info('============================================================================================');
		console.info('💫  Connected to MongoDB');
		app.listen(PORT, () => {
			console.info(`============================================================================================`);
			console.info(`🚀  Server is running on port: ${PORT}`);
			console.info(`============================================================================================`);
			console.info(`🔮  GraphQL server located at ${apolloSeverURL}`);
			console.info(`============================================================================================`);
		});
	});
}
