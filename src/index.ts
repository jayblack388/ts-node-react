import { config } from 'dotenv';
config();
import app from './app';
import { db, printLogo } from './lib';

const port = process.env.PORT || 5000;

if (db) {
	db.once('open', () => {
		printLogo();
		console.info('\n======================================');
		console.info('💫  Connected to MongoDB');
		app.listen(port, () => {
			console.log(`======================================`);
			console.log(`🚀  Server is running on port: ${port}`);
			console.log(`======================================`);
		});
	});
}
