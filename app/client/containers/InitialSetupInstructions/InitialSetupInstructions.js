import React from 'react';
import styles from './InitialSetupInstructions.css';
import { connect } from 'react-redux';
import TabPanel from 'components/TabPanel/TabPanel';

@connect(state => ({
  activeProject: state.projects.activeProject,
}))
export default class InitialSetupInstructions extends React.Component {
  static propTypes = {
    activeProject: React.PropTypes.object, // supplied by react-router
  }

  render() {
    const { activeProject } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles.welcome}>
            <h1 className={styles.welcome__header}>You are only one step away from your Living Documentation.</h1>
            <p>
              Below you can find instructions on how to send data about API
              endpoints from your <strong>{activeProject.name}</strong> application.
              <br />
              We are looking forward to your data... We are data-freaks.
            </p>
          </div>
          <TabPanel project={activeProject} />
        </div>
      </div>
    );
  }
}
