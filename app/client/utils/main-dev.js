import React from 'react';
import { Provider } from 'react-redux';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import routes from 'routes';
import Modals from 'modals/Modals';

import { Router } from 'react-router';

export const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>);

export class Main extends React.Component {
  static propTypes = {
    history: React.PropTypes.object,
    store: React.PropTypes.object,
  }

  static defaultProps = {
    history: null,
    store: null,
  }

  state = {
    showDebug: false,
  }


  componentWillMount() {
    try {
      /* eslint no-undef: 0*/
      const initialState = JSON.parse(sessionStorage.getItem('redux-devtools'));
      this.setState(initialState || {});
    } catch (e) {
      // console.error('There are probems setting up the initial state');
    }

    document.body.addEventListener('keyup', (e) => {
      if (
          e.ctrlKey ||
          e.altKey
      ) {
        switch (e.keyCode) {
          case 27: // esc
          case 32: // space
          case 68: // d
            this.setState({ showDebug: !this.state.showDebug });
            break;
          default:
        }
      }
    });
  }

  componentWillUpdate(nextProps, nextState) {
    sessionStorage.setItem('redux-devtools', JSON.stringify(nextState));
  }

  render() {
    const { showDebug } = this.state;
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
          {showDebug ? <DevTools /> : null}
          <Modals />
        </div>
      </Provider>
    );
  }
}
