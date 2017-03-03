
import React from 'react';
import { connect } from 'react-redux';

@connect(s => s.app)
export default class NoMatch extends React.Component {
  render() {
    return (
      <div>
        <h1>404 Page not found</h1>
        <h3>{"The page you are looking for doesn't exist."}</h3>
      </div>
    );
  }
}
