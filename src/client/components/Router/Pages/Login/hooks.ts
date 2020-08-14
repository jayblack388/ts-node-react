import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN_USER } from '../../../../Apollo';
import { useAuth } from '../../../../hooks';

export const useComponentLogic = () => {
	const [formState, setFormState] = useState({
		email: '',
		password: '',
	});
	const [login, { data, error, loading }] = useMutation(LOGIN_USER);
	const { authLoading, setAuthLoading } = useAuth(
		data?.login.token,
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
			login({
				variables: { ...formState },
			});
		},
		[formState, login, setFormState]
	);

	return {
		error,
		formState,
		handleChange,
		handleFormSubmit,
		loading: loading && authLoading,
	};
};
