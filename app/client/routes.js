import React from 'react';
import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router';

import AppLayout from 'containers/AppLayout';
import About from 'containers/About';
import NoMatch from 'containers/NoMatch';

/* import pages */
import DocManager from 'containers/DocManager/DocManager';
import Documentation from 'containers/Documentation/Documentation';
import ApiDoc from 'containers/ApiDoc/ApiDoc';
import GroupDoc from 'containers/Documentation/DocumentationGroup';
import EndpointDoc from 'containers/Documentation/DocumentationEndpoint';

const Routes = (
  <Route>
    <Route path="/" component={AppLayout}>
      <IndexRedirect to="/docs" />

      <Route path="docs" component={DocManager}>
        <Route path="wiki" component={Documentation} />

        <Route component={ApiDoc}>
          <IndexRoute component={Documentation} />
          <Route path=":group_id" component={GroupDoc}>
            <Route path="endpoint/:endpoint_id" component={EndpointDoc} />
          </Route>
        </Route>
      </Route>

      <Route path="about" component={About} />
    </Route>

    <Route path="*" component={AppLayout}>
      <IndexRoute component={NoMatch} />
    </Route>
  </Route>
);

export default Routes;
