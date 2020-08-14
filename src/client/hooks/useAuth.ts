import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from '../Apollo';

export const useAuth = (token, { error, loading }, setFormState) => {
	const [authLoading, setAuthLoading] = useState(false);
	const history = useHistory();
	const redirectCallback = useCallback(() => {
		history.push('/');
		setAuthLoading(false);
	}, [history, setAuthLoading]);
	useEffect(() => {
		if (!loading) {
			if (token) {
				// clear form values
				setFormState({
					email: '',
					password: '',
				});
				Auth.login(token, redirectCallback);
			}
			if (error?.message) {
				setAuthLoading(false);
			}
		}
	}, [error, loading, setAuthLoading, setFormState, token]);
	return { authLoading, setAuthLoading };
};

export default useAuth;
