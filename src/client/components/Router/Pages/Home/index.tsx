import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
	return (
		<main>
			<Link to='/signup'>Signup</Link>
			<Link to='/login'>Login</Link>
		</main>
	);
};

export default Home;
