import React from 'react';
import { connect } from 'react-redux';

import styles from './Editor.css';
import Aside from 'containers/Aside/Aside';
import Content from 'components/Content/Content';

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
    const endpointToOpen = Editor.findFirstEndpoint(treeElements);
    if (!endpointToOpen) {
      return;
    }
    router.push(`/${projectName}/editor/undefined/endpoint/${endpointToOpen.id}`);
  }

  static findFirstEndpoint(items) {
    items.each((item) => {
      if (item.type === 'Endpoint') {
        return item;
      }

      if (item.items && item.items.length > 0) {
        const endpointInItems = Editor.findFirstEndpoint(item.items);
        if (endpointInItems) {
          return endpointInItems;
        }
      }

      return null;
    });
  }

  render() {
    const { children, params, endpoints } = this.props;

    return (
      <div className={styles.container}>
        { endpoints.length > 0 && <Aside params={params} />}
        <Content>
          { children }
        </Content>
      </div>
    );
  }
}

export default Editor;
