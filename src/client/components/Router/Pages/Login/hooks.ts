import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { Auth, LOGIN_USER } from '../../../../Apollo';

export const useComponentLogic = () => {
	const [authLoading, setAuthLoading] = useState(false);
	const [formState, setFormState] = useState({
		email: '',
		password: '',
	});
	const [login, { data, error, loading }] = useMutation(LOGIN_USER);
	let history = useHistory();

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
			// clear form values
			setFormState({
				email: '',
				password: '',
			});
		},
		[formState, login, setFormState]
	);

	const redirectCallback = useCallback(() => {
		history.push('/');
		setAuthLoading(false);
	}, [history, setAuthLoading]);

	useEffect(() => {
		if (!loading) {
			if (data?.login.token) {
				Auth.login(data.login.token, redirectCallback);
			}
			if (error?.message) {
				setAuthLoading(false);
			}
		}
	}, [data, error, loading, setAuthLoading]);

	return {
		error,
		formState,
		handleChange,
		handleFormSubmit,
		loading: loading && authLoading,
	};
};
