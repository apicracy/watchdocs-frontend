import React from 'react';

import styles from '../AppLayout.css';

import Aside from 'containers/Aside/Aside';
import Content from 'components/Content/Content';
import Container from 'components/Container/Container';

class ApiDoc extends React.Component {

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    params: React.PropTypes.object, // supplied by react-router
  }

  render() {
    const { children } = this.props;

    return (
      <Container>
        <Aside params={this.props.params} />
        <Content>
          { children }
        </Content>
      </Container>
    );
  }
}

export default ApiDoc;
