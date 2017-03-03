import React from 'react';
import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router';

import AppLayout from 'containers/AppLayout';
import About from 'containers/About';
import NoMatch from 'containers/NoMatch';

/* import pages */
import Documentation from 'containers/Documentation/Documentation';
import GroupDoc from 'containers/Documentation/DocumentationGroup';
import EndpointDoc from 'containers/Documentation/DocumentationEndpoint';

const routes = (
  <div>
    <Route path="/" component={AppLayout}>
      <IndexRedirect to="/docs" />
      <Route path="about" component={About} />
    </Route>
    <Route path="/docs" component={AppLayout}>
      <IndexRoute component={Documentation} />
      <Route path=":group_id" component={GroupDoc}>
        <Route path="endpoint/:endpoint_id" component={EndpointDoc} />
      </Route>
    </Route>
    <Route path="*" component={AppLayout}>
      <IndexRoute component={NoMatch} />
    </Route>
  </div>
);

export default routes;
