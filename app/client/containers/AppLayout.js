import React from 'react';

import styles from './AppLayout.css';

import AppBar from 'components/AppBar/AppBar';
import SideBar from 'components/SideBar/SideBar';
import Content from 'components/Content/Content';

import Container from 'components/Container/Container'
import SidebarContainer from 'components/Container/SidebarContainer'
import Brand from 'components/Brand/Brand';
import NavLink from 'components/NavigationLink/NavigationLink';
import UserMenu from 'components/UserMenu/UserMenu';
import Select from 'components/Select/Select';

class AppLayout extends React.Component {

  render() {
    return (
      <div className={styles.appLayout}>
        <AppBar>
          <SidebarContainer>
            <SideBar>
              <Brand />
            </SideBar>
          </SidebarContainer>
          <Container>
            <Content>
              <div className={styles.navigation}>
                <NavLink url="/" text="API documentation" />
                <NavLink url="/static" text="Static pages" />
                <NavLink url="/settings" text="Settings" />
              </div>
              <UserMenu username="WatchDocs User" />
            </Content>
          </Container>
        </AppBar>
        <AppBar secondary>
         test
        </AppBar>
        <div className={styles.inner}>
          <SidebarContainer>
            <SideBar>
              Test
            </SideBar>
          </SidebarContainer>
          <Container>
            <div className={styles.contentWrapper}>
              <Content>
                { this.props.children }
              </Content>
            </div>
          </Container>
        </div>
      </div>
    )
  }
}

export default AppLayout;
