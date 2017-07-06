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
      In the meantime you can relax and checkout the sample project
      <br />
      <Link to={`/${sampleProject.slug}`} className={styles.sampleLink} target="_blank">Checkout Sample Project</Link>
    </span>
  );
};

SampleProjectLink.propTypes = {
  projectList: React.PropTypes.string,
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

  openHelp = () => {
    window.drift.on('ready', (api) => {
      api.sidebar.open();
    });
  }

  render() {
    const { activeProject, projectList } = this.props;

    /* eslint-disable */
    return (
      <div className={styles.wrapper}>
        <div className={styles.color}>
          <h1 className={styles.welcome__header}>Integrate your application</h1>
          <p className={styles.welcome}>
            We&#39;re waiting for recordings from your app.
            <br />
            Follow instructions below to start documenting your API.
            <br />
            <SampleProjectLink projectList={projectList} />
          </p>
        </div>
        <div className={styles.inner}>
          <div className={styles.tab}>
            <TabPanel project={activeProject} />
          </div>
          <div className={styles.help}>
            Having problem with integration? Your framework is not listed?
            <br />
            {' '}
            <a onClick={this.openHelp} className={styles.helpLink}>Contact us</a>
            {' '}
            to get a help.
          </div>
        </div>
      </div>
    );
    /* eslint-enable */
  }
}
