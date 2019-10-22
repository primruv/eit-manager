import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
//import App from '/imports/ui/App'
import App from '../imports/ui/App.jsx';
import RenderRoute from  '../imports/ui/route.jsx';
import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  render(<RenderRoute />, document.getElementById('react-target'));
});
