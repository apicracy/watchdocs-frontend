import React from 'react';
import { connect } from 'react-redux';

import styles from './Projects.css';
import NewProjectForm from 'components/ProjectForm/NewProjectForm';
import icon from './project_icon.png';

import { logout } from 'services/session';
import { createProject } from 'services/projects';

@connect(store => ({
  projects: store.projects.projectList,
}))

class Projects extends React.Component {
  static propTypes = {
    projects: React.PropTypes.array,
    dispatch: React.PropTypes.func,
  }

  onSave = values => (this.props.dispatch(createProject(values)))

  onLogout = () => {
    this.props.dispatch(logout());
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.cardContainer}>
          <img src={icon} className={styles.icon} alt="Create an awesome project right now" />
          <div className={styles.description}>
            <h1 className={styles.header}>Create a project</h1>
            <p className={styles.description}>
              Let&#39;s create a first project that you&#39;re going to document.
              It won&#39;t take long.
            </p>
          </div>
          <NewProjectForm onSubmit={this.onSave} className={styles.form} />
        </div>
        <div className={styles.signedIn}>
          You are currently signed in.
          <a className={styles.logout} onClick={this.onLogout}> Log out </a>
        </div>
      </div>
    );
  }
}

export default Projects;
