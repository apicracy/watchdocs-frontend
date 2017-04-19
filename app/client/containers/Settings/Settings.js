import React from 'react';
import { connect } from 'react-redux';

import Container from 'components/Container/Container';
import styles from './Settings.css';
import Setup from './Setup';
import Users from './Users';
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
      <Container className={styles.root}>
        <aside className={styles.aside}>
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
              onClick={() => { this.setPanel('delete'); }}
              className={this.state.activePanel === 'delete' ? styles.active : styles.button}
            >
              Delete
            </button>
          </div>
        </aside>
        <div className={styles.container}>
          {
            this.state.activePanel === 'setup' && <Setup params={this.props.params} />
          }
          {
            this.state.activePanel === 'users' && <Users params={this.props.params} />
          }
          {
            this.state.activePanel === 'delete' && <Delete />
          }
        </div>
      </Container>
    );
  }
}

export default Settings;
