import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import Bundler from 'parcel-bundler';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import path from 'path';

import { connectDB } from '../lib';
import { context, resolvers, typeDefs } from './graphql';
import routes from './routes';

const { BASE_URL, NODE_ENV, PORT } = process.env;

const app = express();

const engine = {
	reportSchema: true,
	variant: 'current',
};

const apolloSever = new ApolloServer({
	context,
	engine,
	resolvers,
	typeDefs,
});

const bundleURL =
	NODE_ENV === 'development' ? `${BASE_URL}:${PORT}` : `${BASE_URL}`;
const bundler = new Bundler(
	path.join(__dirname, '../../src/client/public/index.html'),
	{ logLevel: 1 }
);

const gqlPath = '/__graphql';

apolloSever.applyMiddleware({ app, path: gqlPath });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(routes);
app.use(bundler.middleware());

bundler.on('bundled', () => {
	console.info(`🌎  React App bundled and served at ${bundleURL}`);
	console.info(`============================================================================================`);
});

connectDB();

export const apolloSeverURL = `${bundleURL}${apolloSever.graphqlPath}`;

export default app;
