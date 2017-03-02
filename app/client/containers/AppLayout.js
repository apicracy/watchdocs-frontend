import React from 'react';

import styles from './AppLayout.css';

import AppBar from 'containers/AppLayout/AppBar';
import SideBar from 'containers/AppLayout/SideBar';
import Content from 'containers/AppLayout/Content';

class AppLayout extends React.Component {

  render() {
    return (
      <div className={styles.appLayout}>
        <AppBar />
        <div className={styles.contentWrapper}>
          <SideBar />
          <Content>
            { this.props.children }
          </Content>
        </div>
      </div>
    )
  }
}

export default AppLayout;
