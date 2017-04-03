import React from 'react';
import styles from './Code.css';
import { higlightSyntax } from 'services/syntaxHiglighter';

const Code = ({ children = "" }) => {
  const syntax = higlightSyntax(children);

  return (
    <pre className={styles.root}>
      <code dangerouslySetInnerHTML={syntax} />
    </pre>
  )
};

export default Code;
