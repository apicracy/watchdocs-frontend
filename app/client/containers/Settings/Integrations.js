import React from 'react';

import styles from './Settings.css';

import { connect } from 'react-redux';

import Button from 'components/Button/Button';
import DocumentationBlock, { Row } from 'components/DocumentationBlock/DocumentationBlock';

import circle from '../../assets/integrations/ci.png';
import github from '../../assets/integrations/github.png';
import honey from '../../assets/integrations/honey.png';
import jira from '../../assets/integrations/jira.png';
import rollbar from '../../assets/integrations/rollbar.png';
import slack from '../../assets/integrations/slack.png';

@connect(store => ({
  users: [store.session.user],
}))

class Integrations extends React.Component {
  static propTypes = {
    users: React.PropTypes.array,
  }

  render() {
    return (
      <div className={styles.usersContainer}>
        <DocumentationBlock title="Integrations">
          <Row
            key={1}
            data={[
              <img className={styles.integrationLogo} src={slack} alt="Slack" />,
            ]}
            actions={[
              <Button variants={['linkPrimary', 'noPaddingLeft']}>Enable</Button>,
            ]}
          />
          <Row
            key={2}
            data={[
              <img className={styles.integrationLogo} src={circle} alt="CircleCI" />,
            ]}
            actions={[
              <Button variants={['linkPrimary', 'noPaddingLeft']}>Enable</Button>,
            ]}
          />
          <Row
            key={3}
            data={[
              <img className={styles.integrationLogo} src={github} alt="Github" />,
            ]}
            actions={[
              <Button variants={['linkPrimary', 'noPaddingLeft']}>Enable</Button>,
            ]}
          />
          <Row
            key={4}
            data={[
              <img className={styles.integrationLogo} src={honey} alt="Honeybadger" />,
            ]}
            actions={[
              <Button variants={['linkPrimary', 'noPaddingLeft']}>Enable</Button>,
            ]}
          />
          <Row
            key={5}
            data={[
              <img className={styles.integrationLogo} src={jira} alt="Jira" />,
            ]}
            actions={[
              <Button variants={['linkPrimary', 'noPaddingLeft']}>Enable</Button>,
            ]}
          />
          <Row
            key={6}
            data={[
              <img className={styles.integrationLogo} src={rollbar} alt="Rollbar" />,
            ]}
            actions={[
              <Button variants={['linkPrimary', 'noPaddingLeft']}>Enable</Button>,
            ]}
          />
        </DocumentationBlock>
        <div className={styles.overflow}>
          <div className={styles.overflowTitle}>Coming soon</div>
          <div className={styles.overflowDescription}>Here we are going to have various integrations available for you soon.</div>
        </div>
      </div>
    );
  }
}

export default Integrations;
