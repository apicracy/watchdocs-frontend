import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import AppLayout from 'containers/AppLayout';
import About from 'containers/About';
import NoMatch from 'containers/NoMatch';

/* import pages */
import Loading from 'containers/Loading/Loading';
import DocumentationViewer from 'containers/DocumentationViewer/DocumentationViewer';
import Projects from 'containers/Projects/Projects';
import Editor from 'containers/Editor/Editor';
import DocumentEditor from 'containers/DocumentEditor/DocumentEditor';
import GroupEditor from 'containers/GroupEditor/GroupEditor';
import EndpointEditor from 'containers/EndpointEditor/EndpointEditor';
import RequestEditor from 'containers/RequestEditor/RequestEditor';
import ResponseEditor from 'containers/ResponseEditor/ResponseEditor';
import JSONSEditor from 'containers/JSONSEditor/JSONSEditor';
import Settings from 'containers/Settings/Settings';
import Login from 'containers/Login/Login';

const requireAuth = (nextState, replace) => {
  const { pathname } = nextState.location;
  if (!localStorage.getItem('JWT')) {
    if (pathname && pathname !== '/') {
      replace({
        pathname: '/login',
        query: {
          redirect: pathname,
        },
      });
    } else {
      replace({
        pathname: '/login',
      });
    }
  }
};

const Routes = (
  <Route>
    <Route exact path="/" component={AppLayout} onEnter={requireAuth}>
      <IndexRoute component={Loading} />
    </Route>

    <Route path="/project-manager" component={Projects} onEnter={requireAuth} />
    <Route path="/login" component={Login} />

    <Route path=":project_name" component={AppLayout} onEnter={requireAuth}>
      <IndexRedirect to="editor" />

      <Route path="project-not-found" component={NoMatch} />

      <Route path="editor">
        <IndexRoute component={Editor} />

        <Route path="jsonseditor" component={JSONSEditor} />

        <Route component={Editor}>
          <Route path="document/:document_id" component={DocumentEditor} />
          <Route path=":group_id" component={GroupEditor} />
          <Route path=":group_id/endpoint/:endpoint_id" component={EndpointEditor} />
          <Route path=":group_id/endpoint/:endpoint_id/request" component={RequestEditor} />
          <Route path=":group_id/endpoint/:endpoint_id/response/:response_id" component={ResponseEditor} />
        </Route>
      </Route>

      <Route path="documentation" component={DocumentationViewer} />

      <Route path="about" component={About} />

      <Route path="settings" component={Settings} />
    </Route>

    <Route path="*" component={AppLayout} onEnter={requireAuth}>
      <IndexRoute component={NoMatch} />
    </Route>
  </Route>
);

export default Routes;
