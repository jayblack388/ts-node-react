import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';

import { Auth, LOGIN_USER } from '../../../../Apollo';

export const useComponentLogic = () => {
	const [formState, setFormState] = useState({
		email: '',
		password: '',
	});
	const [login, { data, error, loading }] = useMutation(LOGIN_USER);
	console.log('loading:', loading);
	console.log('error:', error);
	console.log('data:', data);

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
			login({
				variables: { ...formState },
			});
			// clear form values
			setFormState({
				email: '',
				password: '',
			});
		},
		[formState, login, setFormState]
	);

	// Auth.login(data.login.token);

	return {
		error,
		formState,
		handleChange,
		handleFormSubmit,
	};
};
