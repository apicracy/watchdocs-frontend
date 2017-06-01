import React from 'react';
import styles from './ParamTable.css';

const Cell = ({ data, cellStyles }) => (
  <div className={styles.cell} style={cellStyles}>
    { (data && data.text) ? data.text : data }
  </div>
);

const renderCells = (keys, data) => keys.map((c, i) => (
  <Cell data={data ? data[c.key] : c} cellStyles={c.style} key={i} />
));

const ParamTable = ({ data, headers, showHeader = false }) => (
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
  cellStyles: React.PropTypes.object,
};

ParamTable.propTypes = {
  data: React.PropTypes.array,
  headers: React.PropTypes.array,
  showHeader: React.PropTypes.bool,
};

export default ParamTable;
