import React from 'react';
import { hot } from 'react-hot-loader';

const App = () => {
	return <div>Woweezy we propped up an app super quick.</div>;
};

declare const module: any;
export default hot(module)(App);
