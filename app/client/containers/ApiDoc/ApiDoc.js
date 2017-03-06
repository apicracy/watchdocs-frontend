import React from 'react';

import styles from '../AppLayout.css';

import SideBar from 'containers/SideBar/SideBar';
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
    return (
      <Container>
        <SideBar params={this.props.params} />
        <Content>
          <div className={styles.contentWrapper}>
            { this.props.children }
          </div>
        </Content>
      </Container>
    );
  }
}

export default ApiDoc;
