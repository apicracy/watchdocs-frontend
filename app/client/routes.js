import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import AppLayout from 'containers/AppLayout';
import About from 'containers/About';
import NoMatch from 'containers/NoMatch';

/* import pages */
import Wiki from 'containers/Wiki/Wiki';
import Loading from 'containers/Loading/Loading';
import DocumentationViewer from 'containers/DocumentationViewer/DocumentationViewer';
import Projects from 'containers/Projects/Projects';
import ApiDoc from 'containers/ApiDoc/ApiDoc';
import GroupDoc from 'containers/GroupDoc/GroupDoc';
import EndpointDoc from 'containers/EndpointDoc/EndpointDoc';
import RequestParam from 'containers/RequestParam/RequestParam';
import ResponseParam from 'containers/ResponseParam/ResponseParam';
import JSONSEditor from 'containers/JSONSEditor/JSONSEditor';
import Settings from 'containers/Settings/Settings';

const Routes = (
  <Route>
    <Route exact path="/" component={AppLayout} >
      <IndexRoute component={Loading} />
    </Route>

    <Route path="/project-manager" component={Projects} />

    <Route path=":project_name" component={AppLayout}>
      <IndexRedirect to="editor" />

      <Route path="project-not-found" component={NoMatch} />

      <Route path="editor">
        <IndexRoute component={ApiDoc} />

        <Route path="jsonseditor" component={JSONSEditor} />

        <Route component={ApiDoc}>
          <Route path="document/:document_id" component={Wiki} />
          <Route path=":group_id" component={GroupDoc} />
          <Route path=":group_id/endpoint/:endpoint_id" component={EndpointDoc} />
          <Route path=":group_id/endpoint/:endpoint_id/request" component={RequestParam} />
          <Route path=":group_id/endpoint/:endpoint_id/request/:request_id" component={RequestParam} />
          <Route path=":group_id/endpoint/:endpoint_id/response" component={ResponseParam} />
          <Route path=":group_id/endpoint/:endpoint_id/response/:response_id" component={ResponseParam} />
        </Route>
      </Route>

      <Route path="documentation" component={DocumentationViewer} />

      <Route path="about" component={About} />

      <Route path="settings" component={Settings} />
    </Route>

    <Route path="*" component={AppLayout}>
      <IndexRoute component={NoMatch} />
    </Route>
  </Route>
);

export default Routes;
