import React from 'react';
import { connect } from 'react-redux';

import Aside from 'containers/Aside/Aside';
import Content from 'components/Content/Content';
import Container from 'components/Container/Container';

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
      Editor.openFirstTreeElement(endpoints[0], params.project_name, router);
    }
  }

  static showInstructions(params, router) {
    router.push(`/${params.project_name}/editor/setup-instructions`);
  }

  static openFirstTreeElement(element, projectName, router) {
    switch (element.type) {
      case 'Endpoint':
        router.push(`/${projectName}/editor/undefined/endpoint/${element.id}`);
        break;

      default:
        router.push(`/${projectName}/editor/${element.id}`);
        break;
    }
  }

  render() {
    const { children, params } = this.props;

    return (
      <Container>
        <Aside params={params} />
        <Content>
          { children }
        </Content>
      </Container>
    );
  }
}

export default Editor;
