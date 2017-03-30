import React from 'react';
import { connect } from 'react-redux';
import styles from './AppLayout.css';

import { fetchProjects, setActiveProject } from 'services/projects';

import AppBar from 'components/AppBar/AppBar';
import Container from 'components/Container/Container';
import Brand from 'components/Brand/Brand';
import NavLink from 'components/NavigationLink/NavigationLink';
import UserMenu from 'components/UserMenu/UserMenu';
import Select from 'components/Form/Select/Select';
import Icon from 'components/Icon/Icon';
import CustomIcon from 'components/Icon/CustomIcon';

@connect(store => ({
  projects: store.projects.projectList,
  activeProject: store.projects.activeProject,
}))
class AppLayout extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchProjects(this.props.params.project_name));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.project_name !== this.props.params.project_name) {
      this.props.dispatch(fetchProjects(nextProps.params.project_name));
    }
  }

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    params: React.PropTypes.object, // supplied by react-router
    dispatch: React.PropTypes.func,
    projects: React.PropTypes.array,
    activeProject: React.PropTypes.object,
  }

  switchProject = (id) => {
    this.props.dispatch(setActiveProject(id));
  }

  render() {
    const { projects, activeProject } = this.props;

    return (
      <div className={styles.appLayout}>
        <AppBar>
          <Container center>
            <div className={styles.navigation}>
              <Brand />
              <Select
                variants={['appBar']}
                additionalInfo={'Saved 5 minutes ago'}
                options={projects}
                onSelect={this.switchProject}
                activeId={activeProject ? activeProject.id : null}
              />
              <NavLink url="/editor" text="Editor" icon={<Icon name="edit" />} />
              <NavLink url="/documentation" index={!this.props.params.group_id} text="Documentation" icon={<CustomIcon name="documentation" size="sm" />} />
              <NavLink url="/settings" text="Settings" icon={<CustomIcon name="settings" size="sm" />} />
            </div>
            <div className={styles.right}>
              <CustomIcon name="notifications" size="lg" />
              <CustomIcon name="help" size="lg" />
              <UserMenu username="WatchDocs User" />
            </div>
          </Container>
        </AppBar>
        { this.props.children }
        <AppBar footer>
          <Container />
        </AppBar>
      </div>
    );
  }
}

export default AppLayout;

AppLayout.propTypes = {
  children: React.PropTypes.object,
};
