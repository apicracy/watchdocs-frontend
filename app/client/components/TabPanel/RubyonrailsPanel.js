import React from 'react';
import styles from './TabPanel.css';
import CopyableCodeBlock from '../CopyableCodeBlock/CopyableCodeBlock';

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
          <p className={styles.instruction}>
            Add our gem to your Gemfile. It is recommended to add to
            <span className={styles.inlineCode}>:test, :development</span> group.
          </p>
          <CopyableCodeBlock textToCopy="gem 'watchdocs-rails'">
            <span>
              gem&nbsp;<span className={styles.codeColor}>&#39;watchdocs-rails&#39;</span>
            </span>
          </CopyableCodeBlock>
        </div>

        <div className={styles.step}>
          <p className={styles.instruction}>Install the gem by running:</p>
          <CopyableCodeBlock textToCopy="bundle install">
            bundle install
          </CopyableCodeBlock>
        </div>

        <div className={styles.step}>
          <p className={styles.instruction}>
            Fire the installation script and follow the instructions:
          </p>
          <CopyableCodeBlock textToCopy={`rails g watchdocs:install --app_id ${project.app_id} --app_secret ${project.app_secret}`}>
            <span>
              rails g watchdocs:install --app_id
              <span className={styles.codeColor}>{project.app_id}</span>
               --app_secret
              <span className={styles.codeColor}>{project.app_secret}</span>
            </span>
          </CopyableCodeBlock>
        </div>

        <div className={styles.step}>
          <p className={styles.instruction}><a target="_blank" rel="noopener noreferrer" href="https://github.com/apicracy/watchdocs-rails#configuration" className={styles.fadeOutLink}>Click here to read more about the gem</a></p>
        </div>
      </div>
    );
  }
}

export default RubyonrailsPanel;
