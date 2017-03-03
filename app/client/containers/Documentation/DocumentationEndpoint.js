
import React from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  title: state.app.title,
}))
export default class DocumentationEndpoint extends React.Component {
  static propTypes = {
  }

  render() {
    return (
      <div>
        <h1>WatchDocs Documentation</h1>
        <h3>{`You're viewing documentation for endpoint ${this.props.location.query.id}`}</h3>
      </div>
    );
  }
}
