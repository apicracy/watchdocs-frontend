import React from 'react';

import styles from '../AppLayout.css';

import Aside from 'containers/Aside/Aside';
import Content from 'components/Content/Content';
import Container from 'components/Container/Container';

import EndpointDoc from 'containers/EndpointDoc/EndpointDoc';
import GroupDoc from 'containers/GroupDoc/GroupDoc';

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
    const { group_id: groupId, endpoint_id: endpointId } = this.props.params;

    return (
      <Container>
        <Aside params={this.props.params} />
        <Content>
          <div className={styles.contentWrapper}>
            { children }
          </div>
        </Content>
      </Container>
    );
  }
}

export default ApiDoc;
