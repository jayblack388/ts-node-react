import React from 'react';
import { Link } from 'react-router-dom';

import { useComponentLogic } from './hooks';

export const Home = () => {
	useComponentLogic();
	return (
		<main>
			<Link to='/signup'>Signup</Link>
			<Link to='/login'>Login</Link>
		</main>
	);
};

export default Home;
