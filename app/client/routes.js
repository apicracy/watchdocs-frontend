import React from 'react';
import { Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

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
import ForgotPassword from 'containers/ForgotPassword/ForgotPassword';
import ResetPassword from 'containers/ResetPassword/ResetPassword';
import NewProjectWizard from 'containers/Projects/NewProjectWizard';
import InitialSetupInstructions from 'containers/InitialSetupInstructions/InitialSetupInstructions';

import { loadProjects, openFirstEndpoint } from 'services/projects';
import { fetchEndpoints } from 'services/endpointsTree';
import { clearProjects } from 'actions/projects';

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

const fetchProjects = store => (
  (nextState, replace, callback) => {
    const currentProjectSlug = store.getState().projects.activeProject.slug;
    const newProjectSlug = nextState.params.project_name;
    if (currentProjectSlug && (currentProjectSlug === newProjectSlug)) {
      callback();
    } else {
      store.dispatch(loadProjects(newProjectSlug)).then(() => {
        if (newProjectSlug) {
          callback();
        } else {
          browserHistory.push(`/${store.getState().projects.activeProject.slug}`);
        }
      });
    }
  }
);


const fetchProjectTree = (store, nextState, callback) => {
  const endpoints = store.getState().endpoints;
  const activeProject = store.getState().projects.activeProject;
  const endpointId = nextState.params.endpoint_id;
  if (endpoints.length > 0) {
    if (!endpointId) {
      openFirstEndpoint(activeProject.slug, store.getState().endpoints);
    }
    callback();
  } else {
    store.dispatch(fetchEndpoints(activeProject.id)).then(() => {
      if (!endpointId) {
        openFirstEndpoint(activeProject.slug, store.getState().endpoints);
      }
      callback();
    });
  }
};

const prepareProjectTreeOnChange = store => (
  (_prevState, nextState, _replace, callback) => {
    fetchProjectTree(store, nextState, callback);
  }
);

const prepareProjectTreeOnEnter = store => (
  (nextState, _replace, callback) => {
    fetchProjectTree(store, nextState, callback);
  }
);

const resetProjects = store => (
  (_nextState, _replace, callback) => {
    store.dispatch(clearProjects());
    callback();
  }
);


const getRoutes = store => (
  <Route>
    <Route path="/login" component={Login} onEnter={resetProjects(store)} />
    <Route path="/signup" component={Signup} onEnter={resetProjects(store)} />
    <Route path="/forgot_password" component={ForgotPassword} />
    <Route path="/reset_password" component={ResetPassword} />

    <Route onEnter={requireAuth}>
      <Route exact path="/" component={AppLayout} onEnter={fetchProjects(store)}>
        <IndexRoute component={LoadingIndicator} />
      </Route>

      <Route path="new_project" component={NewProjectWizard} />

      <Route path=":project_name" component={AppLayout} onEnter={fetchProjects(store)}>
        <IndexRedirect to="editor" />

        <Route
          path="editor"
          component={Editor}
          onChange={prepareProjectTreeOnChange(store)}
          onEnter={prepareProjectTreeOnEnter(store)}
        >
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
