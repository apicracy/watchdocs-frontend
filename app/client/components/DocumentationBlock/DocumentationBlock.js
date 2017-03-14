import React from 'react';
import styles from './DocumentationBlock.css';

import Button from 'components/Button/Button';
import CustomIcon from 'components/Icon/CustomIcon';

const buttonIcon = (
  <span className={styles.iconWrapper}>
    <CustomIcon name="add-primary" />
  </span>
);

const DocumentationBlock = ({ title, description, buttonAction, children, emptyMsg }) => (
  <article className={styles.root}>
    <header className={styles.header}>
      <div>
        <div className={styles.title}>{ title }</div>
        <div className={styles.description}>{ description }</div>
      </div>
      { buttonAction && (
        <div className={styles.buttonWrapper}>
          <Button variants={['rounded', 'body']} icon={buttonIcon} onClick={buttonAction}>Add</Button>
        </div>
      )}
    </header>
    <main className={styles.block}>
      { children }
      { !children && emptyMsg }
      { !children && buttonAction && <Button variants={['link']} onClick={buttonAction}>Add it now</Button> }
    </main>
    <footer />
  </article>
);

DocumentationBlock.propTypes = {
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.node,
  emptyMsg: React.PropTypes.node,
  buttonAction: React.PropTypes.func,
  children: React.PropTypes.array,
};

DocumentationBlock.defaultProps = {
  emptyMsg: 'You don\'t have any setup yet.',
};


export default DocumentationBlock;
