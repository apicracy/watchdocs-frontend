import React from 'react';
import { Route, IndexRoute, IndexRedirect, next } from 'react-router';

import AppLayout from 'containers/AppLayout';
import About from 'containers/About';
import NoMatch from 'containers/NoMatch';

/* import pages */
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import DocumentationViewer from 'containers/DocumentationViewer/DocumentationViewer';
import Projects from 'containers/Projects/Projects';
import Editor from 'containers/Editor/Editor';
import DocumentEditor from 'containers/DocumentEditor/DocumentEditor';
import GroupEditor from 'containers/GroupEditor/GroupEditor';
import EndpointEditor from 'containers/EndpointEditor/EndpointEditor';
import RequestEditor from 'containers/RequestEditor/RequestEditor';
import ResponseEditor from 'containers/ResponseEditor/ResponseEditor';
import Settings from 'containers/Settings/Settings';
import Login from 'containers/Login/Login';
import Signup from 'containers/Signup/Signup';
import NewProjectWizard from 'containers/Projects/NewProjectWizard';
import InitialSetupInstructions from 'containers/InitialSetupInstructions/InitialSetupInstructions';

import { loadProjects } from 'services/projects';

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

const requireProjects = store => (
  (nextState, _replace, callback) => {
    const projectSlug = nextState.params.project_name;
    store.dispatch(loadProjects(projectSlug)).then(() => {
      callback();
    });
  }
);

const getRoutes = store => (
  <Route>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />

    <Route onEnter={requireAuth}>
      <Route exact path="/" component={AppLayout} onEnter={requireProjects(store)}>
        <IndexRoute component={LoadingIndicator} />
      </Route>

      <Route path="new_project" component={NewProjectWizard} />

      <Route path=":project_name" component={AppLayout} onEnter={requireProjects(store)}>
        <IndexRoute component={Editor} />

        <Route path="editor" component={Editor} onEnter={requireProjects(store)}>
          <Route path="document/:document_id" component={DocumentEditor} />
          <Route path="group/:group_id" component={GroupEditor} />
          <Route path="endpoint/:endpoint_id" component={EndpointEditor} />
          <Route path="endpoint/:endpoint_id/request" component={RequestEditor} />
          <Route path="endpoint/:endpoint_id/response/:response_id" component={ResponseEditor} />
        </Route>

        <Route path="setup-instructions" component={InitialSetupInstructions} />
        <Route path="documentation" component={DocumentationViewer} />
        <Route path="about" component={About} />
        <Route path="settings" component={Settings} />
      </Route>

      <Route path="/project-manager" component={Projects} />
      <Route path="*" component={AppLayout}>
        <IndexRoute component={NoMatch} />
      </Route>
    </Route>
  </Route>
);

export default getRoutes;
