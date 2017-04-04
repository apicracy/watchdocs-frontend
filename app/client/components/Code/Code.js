import React from 'react';
import styles from './Code.css';
import { higlightSyntax } from 'services/syntaxHiglighter';

/* eslint-disable react/no-danger */
const Code = ({ children = '' }) => {
  const syntax = higlightSyntax(children);

  return (
    <pre className={styles.root}>
      <code dangerouslySetInnerHTML={syntax} />
    </pre>
  );
};

Code.propTypes = {
  children: React.PropTypes.string,
};

export default Code;
