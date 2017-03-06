import React from 'react';

import styles from '../AppLayout.css';

import AppBar from 'components/AppBar/AppBar';
import SideBar from 'containers/SideBar/SideBar';
import Content from 'components/Content/Content';

import Container from 'components/Container/Container'
import Brand from 'components/Brand/Brand';
import NavLink from 'components/NavigationLink/NavigationLink';
import UserMenu from 'components/UserMenu/UserMenu';
import Select from 'components/Select/Select';

class ApiDoc extends React.Component {

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    params: React.PropTypes.object // supplied by react-router
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
    )
  }
}

export default ApiDoc;
