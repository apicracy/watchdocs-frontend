import React from 'react';
import styles from './ParamTable.css';

const Cell = ({ data, flex }) => (
  <div className={styles.cell} style={{ flex }}>
    { (data && data.text) ? data.text : data }
  </div>
);

const renderCells = (keys, data) => keys.map((c, i) => (
  <Cell data={data ? data[c.key] : c} flex={c.flex} key={i} />
));

const ParamTable = ({ data, headers, showHeader = true }) => (
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

Cell.propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  flex: React.PropTypes.number,
};

ParamTable.propTypes = {
  data: React.PropTypes.array,
  headers: React.PropTypes.array,
  showHeader: React.PropTypes.bool,
};

export default ParamTable;
