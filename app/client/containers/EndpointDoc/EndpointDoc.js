import React from 'react';
import { connect } from 'react-redux';
import styles from './EndpointDoc.css';

import { loadEndpoint } from 'services/endpointView';

import MethodPicker from 'components/MethodPicker/MethodPicker';
import Content from 'components/Content/Content';

@connect(store => ({
  endpoint: store.endpointView,
}))
class EndpointDoc extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
  }

  componentWillMount() {
    this.loadEndpoint();
  }

  componentWillReceiveProps() {
    if(this.props.endpoint.id !== this.props.params.endpoint_id) {
      this.loadEndpoint();
    }
  }

  loadEndpoint() {
    this.props.dispatch(loadEndpoint(parseInt(this.props.params.endpoint_id)));
  }

  render() {
    return (
      <div className={styles.root}>
        <MethodPicker />
        { JSON.stringify(this.props.endpoint) }

      </div>
    );
  }
}

export default EndpointDoc;
