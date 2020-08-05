import { config } from 'dotenv';
config();
import app, { apolloSeverURL } from './app';
import { db, printLogo } from './lib';

const { PORT } = process.env;

if (db) {
	db.once('open', () => {
		printLogo();
		console.info('\n======================================');
		console.info('💫  Connected to MongoDB');
		app.listen(PORT, () => {
			console.log(`======================================`);
			console.log(`🔮  GraphQL server located at ${apolloSeverURL}`);
			console.log(`======================================`);
			console.log(`🚀  Server is running on port: ${PORT}`);
			console.log(`======================================`);
		});
	});
}
