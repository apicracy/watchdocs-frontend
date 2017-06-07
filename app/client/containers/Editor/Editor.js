import React from 'react';
import { connect } from 'react-redux';

import styles from './Editor.css';
import Aside from 'containers/Aside/Aside';
import Content from 'components/Content/Content';

import { flattenTree } from 'services/endpoints';

@connect(store => ({
  endpoints: store.endpoints,
}))

class Editor extends React.Component {
  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    params: React.PropTypes.object, // supplied by react-router
    endpoints: React.PropTypes.array,
  }

  componentWillMount() {
    // Initial check
    Editor.redirect(this.props);
  }

  componentWillReceiveProps(nextProps) {
    Editor.redirect(nextProps);
  }

  static redirect(props) {
    const { children, endpoints, router, params } = props;
    if (children || !endpoints) {
      return;
    }
    if (endpoints.length === 0) {
      Editor.showInstructions(params, router);
    }
    if (endpoints.length > 0) {
      Editor.openFirstEndpoint(endpoints, params.project_name, router);
    }
  }

  static showInstructions(params, router) {
    router.push(`/${params.project_name}/editor/setup-instructions`);
  }

  static openFirstEndpoint(treeElements, projectName, router) {
    const endpointToOpen = flattenTree(treeElements).find(x => x.type === 'Endpoint');
    if (endpointToOpen) {
      router.push(`/${projectName}/editor/undefined/endpoint/${endpointToOpen.id}`);
    }
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
