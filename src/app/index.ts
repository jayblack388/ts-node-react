import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import Bundler from 'parcel-bundler';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import path from 'path';

import { connectDB } from '../lib';
import { resolvers, typeDefs } from './graphql';
import routes from './routes';

const { BASE_URL, NODE_ENV, PORT } = process.env;

const app = express();

const apolloSever = new ApolloServer({ resolvers, typeDefs });

const bundleURL =
	NODE_ENV === 'development' ? `${BASE_URL}:${PORT}` : `${BASE_URL}`;
const bundler = new Bundler(
	path.join(__dirname, '../../src/client/index.html')
);

apolloSever.applyMiddleware({ app });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(routes);
app.use(bundler.middleware());

bundler.on('bundled', () => {
	console.info(`======================================`);
	console.info(`🌎  React App bundled and served at ${bundleURL}`);
});

connectDB();

export const apolloSeverURL = `${bundleURL}${apolloSever.graphqlPath}`;

export default app;
