import React from 'react';

import styles from './AppLayout.css';

import AppBar from 'components/AppBar/AppBar';
import SideBar from 'containers/SideBar/SideBar';
import Content from 'components/Content/Content';

import Container from 'components/Container/Container';
import Brand from 'components/Brand/Brand';
import NavLink from 'components/NavigationLink/NavigationLink';
import UserMenu from 'components/UserMenu/UserMenu';
import Select from 'components/Select/Select';

class AppLayout extends React.Component {

  render() {
    return (
      <div className={styles.appLayout}>
        <AppBar>
          <Container center>
            <Brand />
            <div className={styles.right}>
              <div className={styles.navigation}>
                <NavLink url="/about" text="About" />
                <NavLink url="/docs" text="Documentation manager" />
                <NavLink url="/help" text="Help" />
              </div>
              <UserMenu username="WatchDocs User" />
            </div>
          </Container>
        </AppBar>
        { this.props.children }
      </div>
    );
  }
}

export default AppLayout;

AppLayout.propTypes = {
  children: React.PropTypes.object,
};