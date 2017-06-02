import React from 'react';
import styles from './TabPanel.css';

import RubyonrailsPanel from './RubyonrailsPanel';
import ExpressPanel from './ExpressPanel';
import SymfonyPanel from './SymfonyPanel';


class TabPanel extends React.Component {
  componentWillMount = () => {
    this.setState({
      activePanel: 'rubyonrails',
    });
  };

  setActivePanel = (panel) => {
    this.setState({
      activePanel: panel,
    });
  };

  render() {
    const { project } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.tabs}>
          <button
            onClick={() => { this.setActivePanel('rubyonrails'); }}
            className={this.state.activePanel === 'rubyonrails' ? styles.activeButton : styles.button}
          >
            Ruby on Rails
          </button>
          <button
            onClick={() => { this.setActivePanel('express'); }}
            className={this.state.activePanel === 'express' ? styles.activeButton : styles.button}
          >
            Express.js
          </button>
          <button
            onClick={() => { this.setActivePanel('symfony'); }}
            className={this.state.activePanel === 'symfony' ? styles.activeButton : styles.button}
          >
            Symfony 2
          </button>
        </div>
        <div className={styles.tabContainer}>
          {
            this.state.activePanel === 'rubyonrails' && <RubyonrailsPanel project={project} />
          }
          {
            this.state.activePanel === 'express' && <ExpressPanel />
          }
          {
            this.state.activePanel === 'symfony' && <SymfonyPanel />
          }
        </div>
      </div>
    );
  }
}

export default TabPanel;
