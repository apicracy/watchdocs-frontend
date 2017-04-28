import React from 'react';
import styles from './SchemaTable.css';

import PropertiesTable from './PropertiesTable';

const ObjectRow = ({ data }) => (
  <div className={styles.row}>
    <div className={styles.type}>
      { data.properties && (
        <PropertiesTable data={data.items} name={data.key} type="object" isRequired={data.required} />
      )}
    </div>
  </div>
);

ObjectRow.propTypes = {
  data: React.PropTypes.object,
};

export default ObjectRow;
