import React from 'react';
import { connect } from 'react-redux';

import Container from 'components/Container/Container';
import styles from './Settings.css';
import Setup from './Setup';
import Delete from './Delete';

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
      <Container>
        <div className={styles.root}>
          <aside className={styles.aside}>
            <div className={styles.menu}>
              <button
                onClick={() => { this.setPanel('setup'); }}
                className={this.state.activePanel === 'setup' ? styles.active : styles.button}
              >
                Setup
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
              this.state.activePanel === 'delete' && <Delete />
            }
          </div>
        </div>
      </Container>
    );
  }
}

export default Settings;
