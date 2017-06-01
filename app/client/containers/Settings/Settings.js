import React from 'react';
import { connect } from 'react-redux';

import Sidebar from 'components/Sidebar/Sidebar';
import Content from 'components/Content/Content';
import styles from './Settings.css';
import Setup from './Setup';
import Users from './Users';
import Integrations from './Integrations';
import Delete from './Delete';

@connect(store => ({
  projectUrl: store.projects.activeProject.base_url,
}))
class Settings extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
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
            this.state.activePanel === 'delete' && <Delete />
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
