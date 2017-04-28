import React from 'react';
import styles from './SchemaTable.css';

import PropertiesTable from './PropertiesTable';
import ArrayRow from './ArrayRow';
import ObjectRow from './ObjectRow';

class SchemaTable extends React.Component {

  renderPrioperties = (body) => {
    const properties = Object.keys(body.properties).map(value => ({
      key: value,
      ...body.properties[value],
      required: body.required.includes(value),
    }));

    return properties.map((property) => {
      if (property.type === 'array') return <ArrayRow data={property} />;
      if (property.type === 'object') return <ObjectRow data={property} />;

      return (
        <div className={styles.row}>
          <div className={styles.key}>{ property.key }</div>
          <div className={styles.type}>
            { `${property.type} (${property.required ? 'required' : 'optional'})` }
          </div>
        </div>
      );
    });
  }

  render() {
    const { data, topLevel } = this.props;
    const type = data.type;

    return (
      <div className={topLevel ? styles.root : styles.child}>
        { type === 'object' && this.renderPrioperties(data) }
        { type === 'array' && <ArrayRow data={data} /> }
      </div>
    );
  }
}

SchemaTable.propTypes = {
  data: React.PropTypes.object,
  topLevel: React.PropTypes.bool,
};

export default SchemaTable;
