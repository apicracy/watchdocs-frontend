import React from 'react';
import styles from './ParamTable.css';

const Cell = ({ data, flex }) => {
  return (
    <div className={styles.cell} style={{ flex: flex }}>
      { (data && data.text) ? data.text : data }
    </div>
  );
}

const renderCells = (keys, data) => {
  return keys.map((c, i) =>
    <Cell data={data ? data[c.key] : c} flex={c.flex} key={i} />
  );
}

const ParamTable = ({ data, headers, showHeader = true }) => {

  return (
    <div className={styles.root}>
      {
        showHeader && <div className={styles.headerRow}>
          { renderCells(headers) }
        </div>
      }
      {
        data.map((r, j) => (
          <div key={j} className={styles.row}>
            { renderCells(headers, r) }
          </div>
        ))
      }
    </div>
  );
};

export default ParamTable;
