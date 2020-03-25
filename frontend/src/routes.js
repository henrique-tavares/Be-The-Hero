import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Home from './pages/Home';
import NewIncident from './pages/NewIncident';
import UpdateIncident from './pages/UpdateIncident';

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Logon} />
				<Route path='/register' component={Register} />

				<Route path='/:ongId/incidents' exact component={Home} />
				<Route path='/:ongId/incidents/new' exact component={NewIncident} />
				<Route path='/:ongId/incidents/update' exact component={UpdateIncident} />
			</Switch>
		</BrowserRouter>
	);
}