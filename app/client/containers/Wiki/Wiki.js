
import React from 'react';
import { connect } from 'react-redux';

import styles from './Wiki.css';
import Button from 'components/Button/Button';

@connect(state => state)
export default class Wiki extends React.Component {
  render() {
    /* eslint no-undef: 0 */
    // imported in index.html
    /* eslint react/no-unescaped-entities: 0 */
    tinymce.init({ selector: 'textarea' });
    return (
      <div>
        <article className={styles.root}>
          <header className={styles.header}>
            <div className={styles.title}>Wiki title</div>
            <div className={styles.description}>This is title of the section we're going
              to display in documentation and in navigation</div>
          </header>
          <main className={styles.blockWrapper}>
            <div className={styles.gettingStarted}>
              Getting started
            </div>
          </main>
        </article>
        <article className={styles.root}>
          <header className={styles.header}>
            <div className={styles.title}>Content</div>
            <div className={styles.description}>This description will
              appear on your generated public documentation</div>
          </header>
          <main className={styles.blockWrapper}>
            <div className={styles.textarea}>
              <textArea />
            </div>
          </main>
        </article>
        <div className={styles.buttons}>
          <Button variants={['primary', 'large', 'spaceRight']}>Save</Button>
          <Button variants={['body', 'large']}>Preview</Button>
        </div>
      </div>

    );
  }
}
