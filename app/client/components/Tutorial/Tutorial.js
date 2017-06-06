import React from 'react';
import Joyride from 'react-joyride';

export const endpointEditorSteps = [
  {
    title: 'Editor',
    selector: '#nav-editor',
    text: "We're currently in 'Editor' mode, where you can modify your documentation",
  },
  {
    title: 'Documentation view',
    selector: '#nav-documentation',
    text: 'In documentation view you can see all your documentation in one place in easy-to-read format.',
  },
  {
    title: 'Project settings',
    selector: '#nav-settings',
    text: 'Add more users here, setup integrations or modify project.',
  },
  {
    title: 'Tree view',
    selector: '#endpoint-list',
    text: 'Here, in editor mode, are listed all endpoints discovered in your app. You can add new manually with button below',
    position: 'right',
    style: {
      width: '300px',
    },
  },
  {
    title: 'Endpoint editor',
    selector: '#endpoint-editor',
    text: 'Endpoint editor contains all recorder and user-provided informations about given endpoint',
    position: 'left',
    style: {
      width: '300px',
    },
  },
  {
    title: 'URL & Method',
    selector: '#endpoint-editor-method',
    text: 'URL and HTTP method name are basic information, required for every endpoint.',
  },
  {
    title: 'Title and description',
    selector: '#endpoint-editor-description',
    text: 'Sometimes it is hard to recognize what your endpoint is doing on the first glance. Here you can give it a name and short description that is going to be displayed on documentation.',
  },
  {
    title: 'URL Params',
    selector: '#endpoint-editor-params',
    text: 'Here you can define list of available URL params.',
  },
  {
    title: 'Request',
    selector: '#endpoint-editor-request',
    text: 'Here we hold recorded information about request that was made, for which server returned successfull response.',
  },
  {
    title: 'Responses',
    selector: '#endpoint-editor-responses',
    text: 'Here is a list of all responses recorded in your application.',
  },

];

const Tutorial = ({ start }) => (
  <div>
    <Joyride
      steps={endpointEditorSteps}
      type="continuous"
      run={start}
      autoStart
    />
  </div>
);

Tutorial.propTypes = {
  start: React.PropTypes.bool,
};

export default Tutorial;
