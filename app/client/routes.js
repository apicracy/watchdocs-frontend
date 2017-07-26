import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import MainLayout from 'containers/MainLayout';
import AppLayout from 'containers/AppLayout';
import About from 'containers/About';

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
import SettingsLayout from 'containers/Settings/SettingsLayout';
import Basics from 'containers/Settings/Basics';
import Setup from 'containers/Settings/Setup';
import Collaborators from 'containers/Settings/Collaborators';
import Integrations from 'containers/Settings/Integrations';
import Login from 'containers/Login/Login';
import Signup from 'containers/Signup/Signup';
import ForgotPassword from 'containers/ForgotPassword/ForgotPassword';
import ResetPassword from 'containers/ResetPassword/ResetPassword';
import NewProjectWizard from 'containers/Projects/NewProjectWizard';
import InitialSetupInstructions from 'containers/InitialSetupInstructions/InitialSetupInstructions';

import connectWithSlack from 'services/integrations/slackConnect';

const getRoutes = () => (
  <Route component={MainLayout}>
    <Route path="/login" component={Login} />
    { /* Add hidden route so no one can signup */ }
    <Route path="/signupF3EoAGaHSa" component={Signup} />
    <Route path="/forgot_password" component={ForgotPassword} />
    <Route path="/reset_password" component={ResetPassword} />

    <Route>
      <Route exact path="/" component={AppLayout} >
        <IndexRoute component={LoadingIndicator} />
      </Route>

      <Route path="new_project" component={NewProjectWizard} />

      <Route path=":project_name" component={AppLayout} >
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
        <Route path="settings" component={SettingsLayout}>
          <IndexRedirect to="basics" />
          <Route path="basics" component={Basics} />
          <Route path="setup" component={Setup} />
          <Route path="collaborators" component={Collaborators} />
          <Route path="integrations" component={Integrations} />
        </Route>
      </Route>

      <Route path="/project-manager" component={Projects} />
    </Route>
    <Route path="callbacks">
      <Route
        path="slack_connect"
        onEnter={nextState => (connectWithSlack({ code: nextState.location.query.code }))}
      />
    </Route>
  </Route>
);

export default getRoutes;
