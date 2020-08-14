import { gql } from '@apollo/client';

export const QUERY_ME = gql`
	{
		me {
			_id
			createdAt
			email
			name {
				name
			}
			picture
			updatedAt
		}
	}
`;

export const HELLO_WORLD = gql`
	{
		helloWorld
	}
`;
