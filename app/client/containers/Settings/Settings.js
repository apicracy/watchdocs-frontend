import React from 'react';
import { connect } from 'react-redux';

import Sidebar from 'components/Sidebar/Sidebar';
import Content from 'components/Content/Content';
import styles from './Settings.css';
import Setup from './Setup';
import Collaborators from './Collaborators';
import Integrations from './Integrations';
import Basics from './Basics';

import { removeProject } from 'services/projects';

@connect(store => ({
  projectUrl: store.projects.activeProject.base_url,
  projectId: store.projects.activeProject.id,
}))
class Settings extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
    dispatch: React.PropTypes.func,
    projectId: React.PropTypes.number,
  }

  componentWillMount() {
    this.setState({
      activePanel: 'basics',
    });
  }

  setPanel(panel) {
    this.setState({
      activePanel: panel,
    });
  }
  onRemoveProject = () => {
    const { projectId, dispatch } = this.props;

    if (confirm('Are you sure you want to remove this project and its data? This action can not be undone.')) {
      dispatch(removeProject(projectId));
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <Sidebar>
          <div className={styles.menu}>
            <button
              onClick={() => { this.setPanel('basics'); }}
              className={this.state.activePanel === 'basics' ? styles.active : styles.button}
            >
              Basics
            </button>
            <button
              onClick={() => { this.setPanel('setup'); }}
              className={this.state.activePanel === 'setup' ? styles.active : styles.button}
            >
              Setup
            </button>
            <button
              onClick={() => { this.setPanel('collaborators'); }}
              className={this.state.activePanel === 'collaborators' ? styles.active : styles.button}
            >
              Collaborators
            </button>
            <button
              onClick={() => { this.setPanel('integrations'); }}
              className={this.state.activePanel === 'integrations' ? styles.active : styles.button}
            >
              Integrations
            </button>
          </div>
        </Sidebar>
        <Content>
          {
            this.state.activePanel === 'basics' && <Basics handleRemoveProject={this.onRemoveProject} />
          }
          {
            this.state.activePanel === 'setup' && <Setup params={this.props.params} />
          }
          {
            this.state.activePanel === 'collaborators' && <Collaborators params={this.props.params} />
          }
          {
            this.state.activePanel === 'integrations' && <Integrations />
          }
        </Content>
      </div>
    );
  }
}

export default Settings;
