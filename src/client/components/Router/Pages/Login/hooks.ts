import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';

import { Auth, LOGIN_USER } from '../../../Apollo';

export const useComponentLogic = () => {
	const [{ email, password }, setFormState] = useState({
		email: '',
		password: '',
	});
	const [login, { error }] = useMutation(LOGIN_USER);

	// update state based on form input changes
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// submit form
	const handleFormSubmit = async (event) => {
		console.log('event:', event);
		event.preventDefault();

		try {
			const { data } = await login({
				variables: { email, password },
			});
			console.log('data:', data);

			// clear form values
			setFormState({
				email: '',
				password: '',
			});

			Auth.login(data.login.token);
		} catch (e) {
			console.error(e);
		}
	};

	return {
		email,
		error,
		handleChange,
		handleFormSubmit,
		password,
	};
};
