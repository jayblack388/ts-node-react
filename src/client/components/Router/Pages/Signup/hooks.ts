import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';

import { Auth, ADD_USER } from '../../../../Apollo';

export const useComponentLogic = () => {
	const [{ email, password }, setFormState] = useState({
		email: '',
		password: '',
	});
	const [addUser, { error }] = useMutation(ADD_USER);

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
		async (event) => {
			event.preventDefault();

			try {
				// execute addUser mutation and pass in variable data from form
				const { data } = await addUser({
					variables: { email, password },
				});
				Auth.login(data.addUser.token);
			} catch (e) {
				console.error(e);
			}
		},
		[addUser, email, password, setFormState]
	);

	return {
		email,
		error,
		handleChange,
		handleFormSubmit,
		password,
	};
};
