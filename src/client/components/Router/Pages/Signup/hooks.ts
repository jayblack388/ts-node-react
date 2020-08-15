import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_USER } from '../../../../Apollo';
import { useAuth } from '../../../../hooks';

export const useComponentLogic = () => {
	const [formState, setFormState] = useState({
		email: '',
		password: '',
	});
	const [addUser, { data, error, loading }] = useMutation(ADD_USER);
	const { authLoading, setAuthLoading } = useAuth(
		data?.addUser.token,
		{
			error,
			loading,
		},
		setFormState
	);
	// update state based on form input changes
	const handleChange = useCallback(
		(event) => {
			const { name, value } = event.target;

			setFormState((prev) => ({
				...prev,
				[name]: value,
			}));
		},
		[setFormState]
	);

	// submit form
	const handleFormSubmit = useCallback(
		(event) => {
			event.preventDefault();
			setAuthLoading(true);
			try {
				addUser({
					variables: { ...formState },
				});
			} catch (error) {
				console.error(error);
			}
		},
		[addUser, formState, setAuthLoading, setFormState]
	);

	return {
		error,
		formState,
		handleChange,
		handleFormSubmit,
		loading: loading && authLoading,
	};
};
