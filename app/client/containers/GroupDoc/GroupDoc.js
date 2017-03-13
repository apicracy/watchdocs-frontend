import React from 'react';

class EndpointDoc extends React.Component {

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    params: React.PropTypes.object, // supplied by react-router
  }

  render() {
    return (
      <div>Group Documentation Page</div>
    );
  }
}

export default EndpointDoc;
