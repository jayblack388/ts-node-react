import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home, Login, NoMatch, Signup } from './Pages';

const Router = () => (
	<BrowserRouter>
		<div className='container'>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/signup' component={Signup} />
				<Route component={NoMatch} />
			</Switch>
		</div>
	</BrowserRouter>
);

export default Router;
