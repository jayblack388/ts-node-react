import React from 'react';
import { hot } from 'react-hot-loader';

import { ApolloProvider } from '../Apollo';
import Router from '../Router';

const App = () => {
	return (
		<ApolloProvider>
			<Router />
		</ApolloProvider>
	);
};

declare const module: any;
export default hot(module)(App);
