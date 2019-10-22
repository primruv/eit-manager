import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {createHashHistory} from 'history';

const history = createHashHistory();

// Components
import App from './App.jsx';
import Edit from './Edit.jsx';

const RenderRoute = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/edit/:id" component={Edit} />
     
    </Switch>
  </Router>
);

export default RenderRoute;