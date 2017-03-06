import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppLayout from 'containers/AppLayout';
import About from 'containers/About';
import NoMatch from 'containers/NoMatch';

/* import pages */
import Documentation from 'containers/Documentation/Documentation';

const Routes = (
  <Route path="/" component={AppLayout}>
    <IndexRoute component={Documentation} />
    <Route path="about" component={About} />
    <Route path="*" component={NoMatch} />
  </Route>
);

export default Routes;
