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

import { openFirstEndpoint } from 'services/projects';
import { fetchEndpoints } from 'services/endpointsTree';
import { clearProjects } from 'actions/projects';

const getRoutes = () => (
  <Route>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/forgot_password" component={ForgotPassword} />
    <Route path="/reset_password" component={ResetPassword} />

    <Route>
      <Route exact path="/" component={AppLayout}>
        <IndexRoute component={LoadingIndicator} />
      </Route>

      <Route path="new_project" component={NewProjectWizard} />

      <Route path=":project_name" component={AppLayout}>
        <IndexRedirect to="editor" />

        <Route path="editor" component={Editor} >
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
    </Route>


    <Route path="*" component={AppLayout}>
      <IndexRoute component={NoMatch} />
    </Route>
  </Route>
);

export default getRoutes;
