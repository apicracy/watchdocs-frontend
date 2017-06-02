import React from 'react';
import styles from './TabPanel.css';

class RubyonrailsPanel extends React.Component {
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

        <br /><br />
        <h2 className={styles.title}>Configuration</h2>
        <br />
        <div className={styles.step}>
          <p className={styles.instruction}>Create <span className={styles.inlineCode}>config/initializers/watchdocs.rb</span> and configure the gem with your project credentials:</p>
          <div className={styles.code}>
            Watchdocs::Rails.configure do |c|<br />
            &nbsp;&nbsp;c.app_id = <span className={styles.codeColor}>'{project.app_id}'</span><br />
            &nbsp;&nbsp;c.app_secret = <span className={styles.codeColor}>'{project.app_secret}'</span><br />
            end
          </div>
        </div>

        <div className={styles.step}>
          <p className={styles.instruction}>For more configuration options <a target="_blank" href="https://github.com/apicracy/watchdocs-rails#configuration"> click here.</a></p>
        </div>

        <br /><br />
        <h2 className={styles.title}>Usage</h2>
        <br />
        <div className={styles.step}>
          <p className={styles.instruction}>You can enable Watchdocs to record request while executing specs or making manual tests. You can of course do both at the same time if you want.</p>
        </div>

        <br />
        <h3 className={styles.subtitle}>Specs</h3>

        <div className={styles.step}>
          <p className={styles.instruction}>If you have some requests specs or features specs that call JSON API then add this line to your <span className={styles.inlineCode}>config/environments/test.rb</span>.</p>
          <div className={styles.code}>
            config.middleware.insert(0, Watchdocs::Rails::Middleware)
          </div>
        </div>

        <div className={styles.step}>
          <p className={styles.instruction}>Update/create your spec hooks:</p>
        </div>

        <h4 className={styles.section}>RSpec</h4>

        <div className={styles.step}>
          <p className={styles.instruction}>In <span className={styles.inlineCode}>specs/rails_helper.rb</span>:</p>
          <div className={styles.code}>
            config.before(:suite) do <br />
            &nbsp;&nbsp;.... <br />
            &nbsp;&nbsp;Watchdocs::Rails::Recordings.clear! <br />
            end <br /><br />

            config.after(:suite) do <br />
            &nbsp;&nbsp;.... <br />
            &nbsp;&nbsp;Watchdocs::Rails::Recordings.export <br />
            end
          </div>
        </div>

        <h4 className={styles.section}>Minitest</h4>

        <div className={styles.step}>
          <p className={styles.instruction}>In <span className={styles.inlineCode}>specs/rails_helper.rb</span>:</p>
          <div className={styles.code}>
            Minitest.after_run do<br />
            &nbsp;&nbsp;Watchdocs::Rails::Recordings.export<br />
            end
          </div>
        </div>
        <div className={styles.step}>
          <p className={styles.instruction}>If you need more help with specs integration <a target="_blank" href="https://github.com/apicracy/watchdocs-rails#tests"> click here.</a></p>
        </div>

        <br /><br />
        <h3 className={styles.subtitle}>Development (manual tests)</h3>

        <div className={styles.step}>
          <p className={styles.instruction}>If you don't have any request specs yet, you can add the following line to <span className={styles.inlineCode}>config/environments/development.rb</span>.</p>
          <div className={styles.code}>
            config.middleware.insert(0, Watchdocs::Rails::Middleware)
          </div>
        </div>

        <div className={styles.step}>
          <p className={styles.instruction}>To make sure we will receive all recorded request please add this worker command to your <span className={styles.inlineCode}>Procfile</span> or run it manually:</p>
          <div className={styles.code}>
            watchdocs --every 60.seconds
          </div>
        </div>

        <div className={styles.step}>
          <p className={styles.instruction}>Watchdocs will be recording all requests in your development environment during manual tests and export them every <span className={styles.inlineCode}>buffer_size</span> requests and every 60 seconds (you can adjust the frequency to your needs).</p>
          <p className={styles.instruction}>You can of course enable the middleware in any other environment like <span className={styles.inlineCode}>dev</span> or <span className={styles.inlineCode}>staging</span>.</p>
        </div>
     </div>
    );
  }
}

export default RubyonrailsPanel;
