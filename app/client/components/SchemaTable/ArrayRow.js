import React from 'react';
import styles from './SchemaTable.css';

import PropertiesTable from './PropertiesTable';

const ArrayRow = ({ data }) => (
  <div className={styles.row}>
    <div className={styles.type}>
      { data.items && (
        <PropertiesTable data={data.items} name={data.key} type="array" isRequired={data.required} />
      )}
    </div>
  </div>
);

ArrayRow.propTypes = {
  data: React.PropTypes.object,
};

export default ArrayRow;
