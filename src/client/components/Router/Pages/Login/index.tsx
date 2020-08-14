import React from 'react';

import { useComponentLogic } from './hooks';

export const Login = () => {
	const {
		error,
		formState: { password, email },
		handleChange,
		handleFormSubmit,
		loading,
	} = useComponentLogic();
	console.error(error);
	return loading ? (
		<main>Loading...</main>
	) : (
		<main className='flex-row justify-center mb-4'>
			<div className='col-12 col-md-6'>
				<div className='card'>
					<h4 className='card-header'>Login</h4>
					<div className='card-body'>
						<form onSubmit={handleFormSubmit}>
							<input
								className='form-input'
								placeholder='Your email'
								name='email'
								type='email'
								id='email'
								value={email}
								onChange={handleChange}
							/>
							<input
								className='form-input'
								placeholder='******'
								name='password'
								type='password'
								id='password'
								value={password}
								onChange={handleChange}
							/>
							<button className='btn d-block w-100' type='submit'>
								Submit
							</button>
						</form>
						{error && <div>{error.message}</div>}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Login;
