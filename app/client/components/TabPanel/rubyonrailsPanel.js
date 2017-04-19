import React from 'react';
import styles from './TabPanel.css';

class RubyonrailsPanel extends React.Component {
  render() {
    return (
      <div>
        <h2 className={styles.title}>Ruby on Rails installation</h2>
        <br />
        <div className={styles.step}>
          <p className={styles.instruction}>Add watchdocs-ruby gem to your gemfile:</p>
          <div className={styles.code}>
            gem
            <span className={styles.codeColor}>
              &apos;watchdogs-ruby&apos;, &apos;~&gt; 0.1&apos;
            </span>
          </div>
        </div>
        <div className={styles.step}>
          <p className={styles.instruction}>Install the gem:</p>
          <div className={styles.code}>
            bundle install
          </div>
        </div>
        <div className={styles.step}>
          <p className={styles.instruction}>Generate config files and test documentation</p>
          <div className={styles.code}>
            bundle exec watchdocs install --api-id 112jhjkhsdfhj3 --api-key 125ggsdfggg
          </div>
        </div>
      </div>
    );
  }
}

export default RubyonrailsPanel;
