
import React from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  title: state.app.title,
}))
export default class DocumentationGroup extends React.Component {

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    params: React.PropTypes.object, // supplied by react-router
  }

  render() {
    return (
      <div>
        <h1>WatchDocs Documentation</h1>
        <h3>{`You're viewing documentation for group ${this.props.params.group_id}`}</h3>
        { this.props.children }
      </div>
    );
  }
}
