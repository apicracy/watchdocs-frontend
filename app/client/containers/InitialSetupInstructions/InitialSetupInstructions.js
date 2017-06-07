import React from 'react';
import styles from './InitialSetupInstructions.css';
import { connect } from 'react-redux';
import TabPanel from 'components/TabPanel/TabPanel';
import { Link } from 'react-router';

const SampleProjectLink = ({ projectList }) => {
  const sampleProject = projectList.find(project => project.sample);
  if (!sampleProject) {
    return <span>We are data-freaks.</span>;
  }
  return (
    <span>
      In the meantime you can relax and checkout <Link to={`/${sampleProject.slug}`}>Sample Project</Link>
    </span>
  );
};

@connect(state => ({
  activeProject: state.projects.activeProject,
  projectList: state.projects.projectList,
}))
export default class InitialSetupInstructions extends React.Component {
  static propTypes = {
    activeProject: React.PropTypes.object,
    projectList: React.PropTypes.array,
  }

  render() {
    const { activeProject, projectList } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles.welcome}>
            <h1 className={styles.welcome__header}>You are only one step away from your Living Documentation.</h1>
            <p>
              Below you can find instructions on how to send data about API
              endpoints from your <strong>{activeProject.name}</strong> application.
              <br />
              We are looking forward to your data... <SampleProjectLink projectList={projectList} />
            </p>
          </div>
          <TabPanel project={activeProject} />
        </div>
      </div>
    );
  }
}
