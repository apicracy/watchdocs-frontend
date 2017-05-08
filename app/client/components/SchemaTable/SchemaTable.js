import React from 'react';

import styles from './SchemaTable.css';

import RowGenerator from './RowGenerator';

class SchemaTable extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div className={styles.root}>
        <RowGenerator isRequired node={data} />
      </div>
    );
  }
}

SchemaTable.propTypes = {
  data: React.PropTypes.object,
};

export default SchemaTable;
