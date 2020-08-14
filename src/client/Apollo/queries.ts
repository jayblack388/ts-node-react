import { gql } from '@apollo/client';

export const QUERY_ME = gql`
	{
		me {
			_id
			dateCreated
			email
			name {
				name
			}
			picture
		}
	}
`;

export const HELLO_WORLD = gql`
	{
		helloWorld
	}
`;
