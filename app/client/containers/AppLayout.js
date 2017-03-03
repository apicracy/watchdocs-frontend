import React from 'react';

import styles from './AppLayout.css';

import AppBar from 'components/AppBar/AppBar';
import SideBar from 'containers/SideBar/SideBar';
import Content from 'components/Content/Content';

import Container from 'components/Container/Container'
import Brand from 'components/Brand/Brand';
import NavLink from 'components/NavigationLink/NavigationLink';
import UserMenu from 'components/UserMenu/UserMenu';
import Select from 'components/Select/Select';

class AppLayout extends React.Component {

  render() {
    return (
      <div className={styles.appLayout}>
        <AppBar>
          <Container>
            <Brand />
            <div className={styles.right}>
              <div className={styles.navigation}>
                <NavLink url="/docs" text="API documentation" />
                <NavLink url="/static" text="Static pages" />
                <NavLink url="/settings" text="Settings" />
              </div>
              <UserMenu username="WatchDocs User" />
            </div>
          </Container>
        </AppBar>
        <AppBar secondary>
          <Container>
            <div>
              <Select options={['Project']} />
              <Select options={['v1']} />
            </div>
          </Container>
        </AppBar>
        <div className={styles.inner}>
          <Container>
            <SideBar />
            <Content>
              <div className={styles.contentWrapper}>
                { this.props.children }
              </div>
            </Content>
          </Container>
        </div>
      </div>
    )
  }
}

export default AppLayout;
