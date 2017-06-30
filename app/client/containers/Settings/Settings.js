import React from 'react';
import { connect } from 'react-redux';

import Sidebar from 'components/Sidebar/Sidebar';
import Content from 'components/Content/Content';
import styles from './Settings.css';
import Setup from './Setup';
import Users from './Users';
import Integrations from './Integrations';
import Delete from './Delete';

import { removeProject } from 'services/projects';

@connect(store => ({
  projectUrl: store.projects.activeProject.base_url,
  projectId: store.projects.activeProject.id,
}))
class Settings extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
    dispatch: React.PropTypes.func,
    projectId: React.PropTypes.number
  }

  componentWillMount() {
    this.setState({
      activePanel: 'setup',
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
              onClick={() => { this.setPanel('setup'); }}
              className={this.state.activePanel === 'setup' ? styles.active : styles.button}
            >
              Setup
            </button>
            <button
              onClick={() => { this.setPanel('users'); }}
              className={this.state.activePanel === 'users' ? styles.active : styles.button}
            >
              Users
            </button>
            <button
              onClick={() => { this.setPanel('integrations'); }}
              className={this.state.activePanel === 'integrations' ? styles.active : styles.button}
            >
              Integrations
            </button>
            <button
              onClick={() => { this.setPanel('delete'); }}
              className={this.state.activePanel === 'delete' ? styles.active : styles.button}
            >
              Delete
            </button>
          </div>
        </Sidebar>
        <Content>
          {
            this.state.activePanel === 'setup' && <Setup params={this.props.params} />
          }
          {
            this.state.activePanel === 'users' && <Users params={this.props.params} />
          }
          {
            this.state.activePanel === 'delete' && <Delete handleRemoveProject={this.onRemoveProject} />
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
