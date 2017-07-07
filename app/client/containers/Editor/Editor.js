import React from 'react';
import { connect } from 'react-redux';

import styles from './Editor.css';
import Aside from 'containers/Aside/Aside';
import Content from 'components/Content/Content';

import { openFirstEndpoint } from 'services/projects';

function openFirstEndpointIfNeeded(props) {
  if (props.endpointsFetched && !props.children) {
    openFirstEndpoint(props.params.project_name, props.endpoints);
  }
}

@connect(store => ({
  endpoints: store.endpoints.tree,
  endpointsFetched: store.endpoints.isFetched,
}))

class Editor extends React.Component {
  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    endpoints: React.PropTypes.array,
    endpointsFetched: React.PropTypes.bool,
    params: React.PropTypes.object, // supplied by react-router
  }

  componentDidMount() {
    this.container.scrollIntoView();
    openFirstEndpointIfNeeded(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { endpoint_id } = this.props.params;

    if (nextProps.params.endpoint_id !== endpoint_id) {
      this.container.scrollIntoView();
    }

    openFirstEndpointIfNeeded(nextProps);
  }

  render() {
    const { children, params } = this.props;

    return (
      <div className={styles.container} ref={(container) => { this.container = container; }}>
        <Aside params={params} />
        <Content>
          { children }
        </Content>
      </div>
    );
  }
}

export default Editor;
