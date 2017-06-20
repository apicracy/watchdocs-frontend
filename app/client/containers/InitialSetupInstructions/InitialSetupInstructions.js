import React from 'react';
import styles from './InitialSetupInstructions.css';
import { connect } from 'react-redux';
import TabPanel from 'components/TabPanel/TabPanel';
import logo from '../../assets/watchdocslogo_white_full.png';
import { Link } from 'react-router';

const SampleProjectLink = ({ projectList }) => {
  const sampleProject = projectList.find(project => project.sample);
  if (!sampleProject) {
    return <span>We are data-freaks.</span>;
  }
  return (
    <span>
      In the meantime you can relax and checkout the sample project
      <br />
      <Link to={`/${sampleProject.slug}`} className={styles.sampleLink}>Checkout Sample Project</Link>
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
        <div className={styles.color}>
          <h1 className={styles.welcome__header}>Integrate your application</h1>
          <p className={styles.welcome}>
              We're waiting for recordings from your app. Follow instructions below to start documenting your API.
          </p>
        </div>
        <div className={styles.inner}>
          <div className={styles.tab}>
            <TabPanel project={activeProject} />
          </div>
          <div className={styles.sampleLinkContainer}>
            <SampleProjectLink projectList={projectList} />
          </div>
        </div>
      </div>
    );
  }
}
