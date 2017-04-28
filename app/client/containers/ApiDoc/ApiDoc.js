import React from 'react';
import { connect } from 'react-redux';

import Aside from 'containers/Aside/Aside';
import Content from 'components/Content/Content';
import Container from 'components/Container/Container';

@connect(store => ({
  endpoints: store.endpoints,
}))
class ApiDoc extends React.Component {

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    params: React.PropTypes.object, // supplied by react-router
  }

  componentWillMount() {
    // Initial check
    ApiDoc.redirect(this.props);
  }

  componentWillReceiveProps(nextProps) {
    ApiDoc.redirect(nextProps);
  }

  static redirect(props) {
    const { children, endpoints, router, params } = props;

    if (!children && endpoints && endpoints.length > 0) {
      switch (endpoints[0].type) {
        case 'Endpoint':
          router.push(`/${params.project_name}/editor/undefined/endpoint/${endpoints[0].id}`);
          break;

        default:
          router.push(`/${params.project_name}/editor/${endpoints[0].id}`);
          break;
      }
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

export default ApiDoc;
