import React from 'react';
import styles from './DocumentationBlock.css';

import Button from 'components/Button/Button';
import CustomIcon from 'components/Icon/CustomIcon';

import DocumentationRow from './DocumentationRow';

const buttonIcon = (
  <span className={styles.iconWrapper}>
    <CustomIcon name="add-primary" size="lg" />
  </span>
);

const DocumentationBlock = ({ title, titleElement, description,
  buttonAction, children, emptyMsg, content }) => {
  const parsedDescription = description && description.map ? (
    description.map((v, k) => <span key={k}>{v}</span>)
  ) : description;

  const rows = (!children || (Array.isArray(children) && !children.length)) ? (
    <DocumentationRow
      empty
      data={[
        emptyMsg,
        <Button variants={['link']} onClick={buttonAction}>Add it now</Button>,
      ]}
      actions={[]}
    />
  ) : children;

  return (
    <article className={styles.root}>
      <header className={styles.header}>
        <div className={styles.title}>{title} {titleElement}</div>
        { buttonAction && (
          <div className={styles.buttonWrapper}>
            <Button variants={['rounded', 'body']} icon={buttonIcon} onClick={buttonAction}>Add new</Button>
          </div>
        )}
        { description && (
          <div className={styles.description}>{ parsedDescription }</div>
        )}
      </header>
      <main className={styles.blockWrapper}>
        { rows }
      </main>
      { content && (
        <footer className={styles.footer}>
          { content }
        </footer>
      )}
    </article>
  );
};

DocumentationBlock.propTypes = {
  title: React.PropTypes.string.isRequired,
  titleElement: React.PropTypes.object,
  description: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.arrayOf(React.PropTypes.node),
  ]),
  content: React.PropTypes.node,
  emptyMsg: React.PropTypes.node,
  buttonAction: React.PropTypes.func,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
};

DocumentationBlock.defaultProps = {
  emptyMsg: 'You don\'t have any setup yet.',
};

export {
  DocumentationRow as Row,
};

export default DocumentationBlock;
