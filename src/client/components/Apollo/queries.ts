import gql from 'graphql-tag';

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
