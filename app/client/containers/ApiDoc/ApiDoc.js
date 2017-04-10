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
      router.push(`/${params.project_name}/editor/${endpoints[0].id}`);
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
