import React from 'react';
import { Link } from 'react-router';

import Sidebar from 'components/Sidebar/Sidebar';
import Content from 'components/Content/Content';
import styles from './Settings.css';

class SettingsLayout extends React.Component {

  static propTypes = {
    children: React.PropTypes.object,
    params: React.PropTypes.object,
  }

  render() {
    const { project_name: projectSlug } = this.props.params;
    const linkProps = {
      className: styles.menuLink,
      activeClassName: styles.menuLinkActive,
    };

    return (
      <div className={styles.root}>
        <Sidebar>
          <div className={styles.menu}>
            <Link to={`/${projectSlug}/settings/basics`} {...linkProps}>
              Basics
            </Link>
            <Link to={`/${projectSlug}/settings/setup`} {...linkProps}>
              Setup
            </Link>
            <Link to={`/${projectSlug}/settings/collaborators`} {...linkProps}>
              Collaborators
            </Link>
            <Link to={`/${projectSlug}/settings/integrations`} {...linkProps}>
              Integrations
            </Link>
          </div>
        </Sidebar>
        <Content>
          { this.props.children }
        </Content>
      </div>
    );
  }
}

export default SettingsLayout;
