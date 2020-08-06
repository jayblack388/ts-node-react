import React, { FC } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	request: (operation) => {
		const token = localStorage.getItem('id_token');

		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : '',
			},
		});
	},
	uri: '/graphql',
});

const Provider: FC = ({ children }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
