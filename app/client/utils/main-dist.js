import React from 'react';

import { Provider } from 'react-redux';

import routes from 'routes';
import { Router } from 'react-router';
import Modals from 'modals/Modals';

export class Main extends React.Component {
  static propTypes = {
    store: React.PropTypes.object,
    history: React.PropTypes.object,
  }

  static defaultProps = {
    store: null,
    history: null,
  }

  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
        <Modals />
      </Provider>
    );
  }
}
