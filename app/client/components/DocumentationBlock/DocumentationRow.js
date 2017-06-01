import React from 'react';
import styles from './DocumentationRow.css';

function render(v, k) {
  return React.isValidElement(v) ? { ...v, key: k } : <span key={k}>{v}</span>;
}

const DocumentationRow = ({ empty, data, actions, variants }) => {
  // to apply many variants to one button
  const variantStyles = variants ? variants.map(v => styles[v]) : [];
  const rootstyle = [
    ...variantStyles,
    empty ? styles.empty : styles.root,
  ].join(' ');

  return (
    <article className={rootstyle}>
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
};

DocumentationRow.propTypes = {
  empty: React.PropTypes.bool,
  data: React.PropTypes.array,
  actions: React.PropTypes.array,
  variants: React.PropTypes.array,
};

export default DocumentationRow;
