import React from 'react';
import styles from './TabPanel.css';

class RubyonrailsPanel extends React.Component {
  render() {
    return (
      <div>
        <h1>Ruby on Rails installation</h1>
        <p>Add watchdocs-ruby gem to your gemfile:</p>
        <div className={styles.code}>
          gem &apos;watchdogs-ruby&apos;, &apos;~&gt; 0.1&apos;
        </div>
        <p>Install the gem:</p>
        <div className={styles.code}>
          bundle install
        </div>
        <p>Generate config files and test documentation</p>
        <div className={styles.code}>
          bundle exec watchdocs install --api-id 112jhjkhsdfhj3 --api-key 125ggsdfggg
        </div>
      </div>
    );
  }
}

export default RubyonrailsPanel;
