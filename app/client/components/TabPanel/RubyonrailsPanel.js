import React from 'react';
import styles from './TabPanel.css';

class RubyonrailsPanel extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
  };

  render() {
    const { project } = this.props;

    return (
      <div>
        <h2 className={styles.title}>Installation</h2>
        <br />

        <div className={styles.step}>
          <p className={styles.instruction}>Add our gem to your Gemfile. It is recommended to add to <span className={styles.inlineCode}>:test, :development</span> group.</p>
          <div className={styles.code}>
            gem&nbsp;
            <span className={styles.codeColor}>
              'watchdocs-rails'
            </span>
          </div>
        </div>

        <div className={styles.step}>
          <p className={styles.instruction}>Install the gem by running:</p>
          <div className={styles.code}>
            bundle install
          </div>
        </div>

        <div className={styles.step}>
          <p className={styles.instruction}>and then fire the installation script:</p>
          <div className={styles.code}>
            rails g <span className={styles.codeColor}>watchdocs:install</span> --app_id <span className={styles.codeColor}>{project.app_id}</span> --app_secret <span className={styles.codeColor}>{project.app_secret}</span>
          </div>
        </div>

        <div className={styles.step}>
          <p className={styles.instruction}>For more configuration options <a target="_blank" rel="noopener noreferrer" href="https://github.com/apicracy/watchdocs-rails#configuration"> click here.</a></p>
        </div>
     </div>
    );
  }
}

export default RubyonrailsPanel;
