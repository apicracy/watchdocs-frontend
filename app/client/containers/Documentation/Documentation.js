
import React from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  title: state.app.title,
}))
export default class Dashboard extends React.Component {
  static propTypes = {
  }

  render() {
    return (
      <div>
        <h1>WatchDocs Documentation</h1>
      </div>
    );
  }
}
