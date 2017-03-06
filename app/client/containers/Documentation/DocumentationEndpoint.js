
import React from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  title: state.app.title,
}))
export default class DocumentationEndpoint extends React.Component {

  static propTypes = {
    params: React.PropTypes.object // supplied by react-router
  }

  render() {
    return (
      <div>
        <h4>{`You're viewing documentation for endpoint ${this.props.params.endpoint_id}`}</h4>
      </div>
    );
  }
}
