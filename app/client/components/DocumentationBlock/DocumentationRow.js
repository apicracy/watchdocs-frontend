import React from 'react';
import styles from './DocumentationRow.css';

const DocumentationRow = ({ empty, data, actions }) => (
  <article className={empty ? styles.empty : styles.root}>
    <div className={styles.data}>
      {
        data.map((v, k) => (
          <span key={k}>{v}</span>
        ))
      }
    </div>
    <div className={styles.actions}>
      {
        actions.map((v, k) => (
          <span key={k}>{v}</span>
        ))
      }
    </div>
  </article>
);

DocumentationRow.propTypes = {
  empty: React.PropTypes.bool,
  data: React.PropTypes.array,
  actions: React.PropTypes.array,
};

export default DocumentationRow;
