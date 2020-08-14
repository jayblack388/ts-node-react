import { useQuery } from '@apollo/client';

import { HELLO_WORLD } from '../../../../Apollo';

export const useComponentLogic = () => {
	const { loading, error, data } = useQuery(HELLO_WORLD);
	console.log('data:', data);
	console.log('error:', error);
	console.log('loading:', loading);

	return {
		data,
		error,
		loading,
	};
};
