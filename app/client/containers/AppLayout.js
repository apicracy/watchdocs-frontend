import React from 'react';
import { connect } from 'react-redux';
import styles from './AppLayout.css';

import { logout, getCurrentUser } from 'services/session';
import { loadProjects, setActiveProject } from 'services/projects';
import { Link, browserHistory } from 'react-router';

import ReduxToastr from 'react-redux-toastr';

import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import AppBar from 'components/AppBar/AppBar';
import Container from 'components/Container/Container';
import Brand from 'components/Brand/Brand';
import NavLink from 'components/NavigationLink/NavigationLink';
import UserMenu from 'components/UserMenu/UserMenu';
import ProjectSelector from 'components/ProjectSelector/ProjectSelector';
import Icon from 'components/Icon/Icon';
import CustomIcon from 'components/Icon/CustomIcon';
import Tutorial from 'components/Tutorial/Tutorial';
import Modals from 'modals/Modals';

import { openModal } from 'actions/modals';
import { MODAL_NAME as ADD_PROJECT_MODAL } from 'modals/AddProjectModal/AddProjectModal';

@connect(store => ({
  projects: store.projects.projectList,
  activeProject: store.projects.activeProject,
  username: store.session.user && store.session.user.email,
  endpointsCount: store.endpoints.tree.length,
  isModalOpened: !!store.modals.opened,
  currentUser: store.session.user,
  title: store.appLayout.title,
  subtitle: store.appLayout.subtitle,
  isFetching: store.appLayout.isFetching,
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
    endpointsCount: React.PropTypes.number,
    isModalOpened: React.PropTypes.bool,
    currentUser: React.PropTypes.object,
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    isFetching: React.PropTypes.bool,
  }

  componentDidMount() {
    const { dispatch, params, location } = this.props;

    dispatch(getCurrentUser())
      .then(() => {
        return dispatch(loadProjects(params.project_name))
      })
      .then((projects) => {
        if (!location.pathname) {
          browserHistory.push(`/${projects[0].slug}/editor`);
        }
      })
      .catch(() => {
        if (location.pathname === '/') {
          browserHistory.push('/login');
        }
      });
    this.openDrift();
  }

  switchProject = (slug) => {
    const { dispatch } = this.props;
    dispatch(setActiveProject(slug)).then(browserHistory.push(`/${slug}/editor`));
  }

  addProject = () => {
    const { dispatch } = this.props;
    dispatch(openModal(ADD_PROJECT_MODAL));
  }

  onLogout = () => {
    this.props.dispatch(logout());
  }

  openHelp = () => {
    window.drift && window.drift.on('ready', (api) => {
      api.sidebar.open();
    });
  }

  openDrift = () => {
    window.drift && window.drift.on('ready', (api) => {
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

  userMenu = () => {
    const { projects, activeProject, currentUser, endpointsCount, isFetching } = this.props;
    return (
      <Container center>
        { isFetching && <LoadingIndicator fixed /> }
        <div className={styles.navigation}>
          <Link href="/">
            <Brand />
          </Link>
          <ProjectSelector
            projects={projects}
            onSelect={this.switchProject}
            onAddNew={this.addProject}
            activeProject={activeProject}
          />
          <NavLink url="/editor" text="Editor" icon={<Icon name="edit" />} id="nav-editor" />
          <NavLink url="/documentation" text="Documentation" icon={<CustomIcon name="documentation" size="sm" />} id="nav-documentation" disabled={endpointsCount === 0} />
          <NavLink url="/settings" text="Settings" icon={<CustomIcon name="settings" size="sm" />} id="nav-settings" />
        </div>
        <div className={styles.right}>
          <a className={styles.helpLink} onClick={this.openHelp}>
            <CustomIcon name="help" size="lg" />
          </a>
          <UserMenu
            username={currentUser.email}
            onLogout={this.onLogout}
          />
        </div>
      </Container>
    );
  }

  guestMenu = () => {
    return (
      <Container center>
        <div className={styles.navigation}>
          <a href="/">
            <Brand />
          </a>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{this.props.title}</h1>
            <h2 className={styles.subtitle}>{this.props.subtitle}</h2>
          </div>
        </div>
        <div className={styles.right}>
          <Link to="/login" className={styles.navigationLink}>Login</Link>
          <Link to="/signup" className={styles.navigationLink}>Signup</Link>
        </div>
      </Container>
    );
  }

  render() {
    const {
      currentUser,
      children,
      isModalOpened,
    } = this.props;

    return (
      <div className={styles.container}>
        <Tutorial />
        <div className={styles.header}>
          <AppBar>
            { currentUser ? this.userMenu() : this.guestMenu() }
          </AppBar>
        </div>
        <div className={`${styles.content} ${isModalOpened ? styles.modalOpened : ''}`}>
          { children }
        </div>
        <Modals params={this.props.params} />
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
        />
      </div>
    );
  }
}

export default AppLayout;
