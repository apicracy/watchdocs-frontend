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
    params: React.PropTypes.object, // supplied by react-router
  }

  componentDidMount() {
    openFirstEndpointIfNeeded(this.props);
  }

  componentWillReceiveProps(nextProps) {
    openFirstEndpointIfNeeded(nextProps);
  }

  render() {
    const { children, params } = this.props;

    return (
      <div className={styles.container}>
        <Aside params={params} />
        <Content>
          { children }
        </Content>
      </div>
    );
  }
}

export default Editor;
