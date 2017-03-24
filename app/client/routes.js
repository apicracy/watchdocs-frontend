import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import AppLayout from 'containers/AppLayout';
import About from 'containers/About';
import NoMatch from 'containers/NoMatch';

/* import pages */
import Wiki from 'containers/Wiki/Wiki';
import ApiDoc from 'containers/ApiDoc/ApiDoc';
import GroupDoc from 'containers/GroupDoc/GroupDoc';
import EndpointDoc from 'containers/EndpointDoc/EndpointDoc';
import JSONSEditor from 'containers/JSONSEditor/JSONSEditor';

const Routes = (
  <Route>
    <Route path="/" component={AppLayout}>
      <IndexRedirect to="/docs" />

      <Route path="docs">
        <IndexRoute component={ApiDoc} />

        <Route path="jsonseditor" component={JSONSEditor} />

        <Route component={ApiDoc}>
          <Route path="wiki" component={Wiki} />
          <Route path=":group_id" component={GroupDoc} />
          <Route path=":group_id/endpoint/:endpoint_id" component={EndpointDoc} />
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
