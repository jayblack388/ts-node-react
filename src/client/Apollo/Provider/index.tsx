import React, { FC } from 'react';
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const uri = `/__graphql`;

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});
const httpLink = createHttpLink({
	uri,
});
const link = authLink.concat(httpLink);

const client = new ApolloClient({
	cache,
	link,
});

const Provider: FC = ({ children }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
