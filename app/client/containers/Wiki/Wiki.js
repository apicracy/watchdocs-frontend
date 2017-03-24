
import React from 'react';
// import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';

import styles from './Wiki.css';
import Button from 'components/Button/Button';
import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';

// @connect(state => state)
export default class Wiki extends React.Component {
  render() {
    return (
      <div>
        <DocumentationBlock
          title="Wiki title"
          description="This is title of the section we're going
            to display in documentation and in navigation."
        >
          <div className={styles.gettingStarted}>
          Getting started
          </div>
        </DocumentationBlock>

        <DocumentationBlock
          title="Content"
          description="This description will
            appear on your generated public documentation."
        >
          <TinyMCE />
        </DocumentationBlock>

        <div className={styles.buttons}>
          <Button variants={['primary', 'large', 'spaceRight']}>Save</Button>
          <Button variants={['body', 'large']}>Preview</Button>
        </div>
      </div>
    );
  }
}
