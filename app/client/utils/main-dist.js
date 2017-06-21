import React from 'react';

import { Provider } from 'react-redux';

import { Router } from 'react-router';
import Modals from 'modals/Modals';
import getRoutes from 'routes';

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
        <div>
          <Router history={history} routes={getRoutes(store)} />
        </div>
      </Provider>
    );
  }
}
