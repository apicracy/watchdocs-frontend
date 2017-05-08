import React from 'react';
import styles from './SchemaTable.css';

const PrimitiveRow = ({ name, isRequired, node }) => (
  <div className={styles.row}>
    <div className={styles.header}>
      { name && <div className={styles.name}>{ name }</div> }
      { node && node.type && <div className={styles.type}>{ `${node.type}${isRequired ? '' : ' (optional)'}` }</div> }
    </div>
  </div>
);

PrimitiveRow.propTypes = {
  name: React.PropTypes.string,
  isRequired: React.PropTypes.bool,
  node: React.PropTypes.object,
};

export default PrimitiveRow;
