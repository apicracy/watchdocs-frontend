import React from 'react';
import styles from './PropertiesTable.css';

import Button from 'components/Button/Button';
import SchemaTable from './SchemaTable';

class PropertiesTable extends React.Component {

  componentWillMount() {
    this.setState({
      expanded: false,
    });
  }

  toggleItems = () => this.setState({ expanded: !this.state.expanded });

  formatProperties = data => ({
    type: 'object',
    properties: data,
  });

  render() {
    const { data, name, type, isRequired } = this.props;

    const childType = type === 'array' ? 'Items' : 'Properties';

    return (
      <div className={styles.root}>
        <div className={styles.header}>
          { name && <div className={styles.name}>{ name }</div> }
          { type && <div className={styles.type}>{ `${type} (${isRequired ? 'required' : 'optional'})` }</div> }
          <div className={styles.toggle}>
            { this.state.expanded && (
              <Button onClick={this.toggleItems}>Hide { childType }</Button>
            )}
            { !this.state.expanded && (
              <Button onClick={this.toggleItems}>Show { childType }</Button>
            )}
          </div>
        </div>
        { this.state.expanded && (
          <div className={styles.itemTable}>
            { type === 'object' && <SchemaTable data={this.formatProperties(data)} /> }
            { type === 'array' && <SchemaTable data={data} /> }
          </div>
        )}
      </div>
    );
  }
}

PropertiesTable.propTypes = {
  data: React.PropTypes.object,
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  isRequired: React.PropTypes.bool,
};

export default PropertiesTable;
