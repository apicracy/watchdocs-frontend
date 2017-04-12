import React from 'react';
import { connect } from 'react-redux';

import styles from './Settings.css';
import Setup from './Setup';

@connect(store => ({
  projectUrl: store.projects.activeProject.url,
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
        <aside className={styles.aside}>
          <div className={styles.menu}>
            <button
              onClick={() => { this.setPanel('setup'); }}
              className={this.state.activePanel === 'setup' ? styles.active : styles.button}
            >
              Setup
            </button>
          </div>
        </aside>
        <div className={styles.container}>
          {
            this.state.activePanel === 'setup' && <Setup params={this.props.params} />
          }
        </div>
      </div>
    );
  }
}

export default Settings;
