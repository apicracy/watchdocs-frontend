import React from 'react';
import styles from './TabPanel.css';

import RubyonrailsPanel from './rubyonrailsPanel';
import RubyPanel from './rubyPanel';
import JavascriptPanel from './javascriptPanel';
import PhpPanel from './phpPanel';
import PhoenixPanel from './phoenixPanel';

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
    return (
      <div className={styles.container}>
        <div className={styles.tabs}>
          <button
            onClick={() => { this.setActivePanel('rubyonrails'); }}
            className={this.state.activePanel === 'rubyonrails' ? styles.activeButton : styles.button}
          >
            Ruby on rails
          </button>
          <button
            onClick={() => { this.setActivePanel('ruby'); }}
            className={this.state.activePanel === 'ruby' ? styles.activeButton : styles.button}
          >
            Ruby
          </button>
          <button
            onClick={() => { this.setActivePanel('javascript'); }}
            className={this.state.activePanel === 'javascript' ? styles.activeButton : styles.button}
          >
            JavaScript
          </button>
          <button
            onClick={() => { this.setActivePanel('php'); }}
            className={this.state.activePanel === 'php' ? styles.activeButton : styles.button}
          >
            PHP
          </button>
          <button
            onClick={() => { this.setActivePanel('phoenix'); }}
            className={this.state.activePanel === 'phoenix' ? styles.activeButton : styles.button}
          >
            Phoenix
          </button>
        </div>
        <div className={styles.tabContainer}>
          {
            this.state.activePanel === 'rubyonrails' && <RubyonrailsPanel />
          }
          {
            this.state.activePanel === 'ruby' && <RubyPanel />
          }
          {
            this.state.activePanel === 'javascript' && <JavascriptPanel />
          }
          {
            this.state.activePanel === 'php' && <PhpPanel />
          }
          {
            this.state.activePanel === 'phoenix' && <PhoenixPanel />
          }
        </div>
      </div>
    );
  }
}

export default TabPanel;
