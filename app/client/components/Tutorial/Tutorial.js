import React from 'react';
import { connect } from 'react-redux';
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
    title: 'Endpoints tree',
    selector: '#endpoint-list',
    text: 'Here, in editor mode, are listed all endpoints discovered in your app.',
    position: 'right',
    style: {
      width: '300px',
    },
  },
  {
    title: 'Endpoint editor',
    selector: '#endpoint-editor',
    text: 'Endpoint editor contains all <strong>recorded</strong> and user-provided informations about given endpoint',
    position: 'left',
    style: {
      width: '200px',
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
    text: 'Here we hold <strong>recorded</strong> information about request that was made, for which server returned successfull response.',
  },
  {
    title: 'Responses',
    selector: '#endpoint-editor-responses',
    text: 'Here is a list of all responses <strong>recorded</strong> in your application.',
  },
];

@connect(store => ({
  endpointEditorVisible: store.endpointEditor.isOpen,
}))

class Tutorial extends React.Component {
  static propTypes = {
    endpointEditorVisible: React.PropTypes.bool,
  }

  joyrideCallback = ({ action, index, type }) => {
    if (action === 'next' || action === 'back') {
      localStorage.setItem('tutorial-step', index);
    } else if (type === 'finished') {
      localStorage.setItem('tutorial-finished', true);
    }
  }

  render() {
    const { endpointEditorVisible } = this.props;
    const cachedTutorialStep = localStorage.getItem('tutorial-step');
    const startIndex = cachedTutorialStep ? parseInt(cachedTutorialStep, 10) : 0;
    const tutorialFinished = localStorage.getItem('tutorial-finished');

    return (
      <div>
        <Joyride
          ref={c => (this.joyride = c)}
          steps={endpointEditorSteps}
          type="continuous"
          // Change stepIndex at the same time as shouldStart
          // otherwise it won't work start from given stepIndex :(
          stepIndex={endpointEditorVisible && startIndex}
          callback={this.joyrideCallback}
          run={!tutorialFinished && endpointEditorVisible}
        />
      </div>
    );
  }
}

export default Tutorial;
