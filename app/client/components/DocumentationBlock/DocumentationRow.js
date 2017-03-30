import React from 'react';
import styles from './DocumentationRow.css';

function render(v, k) {
  return React.isValidElement(v) ? { ...v, key: k } : <span key={k}>{v}</span>;
}

const DocumentationRow = ({ empty, data, actions }) => (
  <article className={empty ? styles.empty : styles.root}>
    <div className={styles.data}>
      {
        data.map(render)
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
