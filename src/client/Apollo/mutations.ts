import { gql } from '@apollo/client';

export const ADD_USER = gql`
	mutation addUser($email: String!, $password: String!) {
		addUser(email: $email, password: $password) {
			token
			user {
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
	}
`;

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
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
	}
`;
