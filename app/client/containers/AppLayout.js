import React from 'react';
import { connect } from 'react-redux';
import styles from './AppLayout.css';

import { logout, getCurrentUser } from 'services/session';
import { browserHistory } from 'react-router';

import AppBar from 'components/AppBar/AppBar';
import Container from 'components/Container/Container';
import Brand from 'components/Brand/Brand';
import NavLink from 'components/NavigationLink/NavigationLink';
import UserMenu from 'components/UserMenu/UserMenu';
import Select from 'components/Form/Select/Select';
import Icon from 'components/Icon/Icon';
import CustomIcon from 'components/Icon/CustomIcon';
import Tutorial from 'components/Tutorial/Tutorial';
import Modals from 'modals/Modals';

@connect(store => ({
  projects: store.projects.projectList,
  activeProject: store.projects.activeProject,
  username: store.session.user && store.session.user.email,
  endpointsCount: store.endpoints.length,
}))

class AppLayout extends React.Component {

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    params: React.PropTypes.object, // supplied by react-router
    dispatch: React.PropTypes.func,
    projects: React.PropTypes.array,
    activeProject: React.PropTypes.object,
    username: React.PropTypes.string,
    endpointsCount: React.PropTypes.number,
  }

  componentWillMount() {
    this.props.dispatch(getCurrentUser());
    this.openDrift();
  }

  switchProject = (id) => {
    const { projects } = this.props;
    const selectedProject = projects.find(project => project.id === id);
    if (!selectedProject) { return false; }
    browserHistory.push(`/${selectedProject.slug}/editor`);
    return true;
  }

  onLogout = () => {
    this.props.dispatch(logout());
  }

  openHelp = () => {
    window.drift.on('ready', (api) => {
      api.sidebar.open();
    });
  }

  openDrift = () => {
    window.drift.on('ready', (api) => {
      if (typeof (Storage) !== 'undefined') {
        if (localStorage.getItem('drift-welcomed')) {
          api.hideWelcomeMessage();
        } else {
          localStorage.setItem('drift-welcomed', true);
          api.showWelcomeOrAwayMessage();
        }
      }
    });
  }

  render() {
    const { projects, activeProject, username, children, endpointsCount } = this.props;

    return (
      <div className={styles.appLayout}>
        <Tutorial />
        <AppBar>
          <Container center>
            <div className={styles.navigation}>
              <Brand />
              { projects.length > 1 && (
                <Select
                  variants={['appBar']}
                  options={projects}
                  onSelect={this.switchProject}
                  activeId={activeProject ? activeProject.id : null}
                />
              )}
              <NavLink url="/editor" text="Editor" icon={<Icon name="edit" />} id="nav-editor" />
              <NavLink url="/documentation" index={!this.props.params.group_id} text="Documentation" icon={<CustomIcon name="documentation" size="sm" />} id="nav-documentation" disabled={endpointsCount === 0} />
              <NavLink url="/settings" text="Settings" icon={<CustomIcon name="settings" size="sm" />} id="nav-settings" />
            </div>
            <div className={styles.right}>
              <a className={styles.helpLink} onClick={this.openHelp}>
                <CustomIcon name="help" size="lg" />
              </a>
              <UserMenu
                username={username}
                onLogout={this.onLogout}
              />
            </div>
          </Container>
        </AppBar>
        { children }
        <AppBar footer>
          <Container />
        </AppBar>
        <Modals params={this.props.params} />
      </div>
    );
  }
}

export default AppLayout;
