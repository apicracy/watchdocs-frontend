import React from 'react';

import styles from './SchemaTable.css';

import Button from 'components/Button/Button';
import RowGenerator from './RowGenerator';

class ObjectRow extends React.Component {
  componentWillMount() {
    this.setState({
      expanded: false,
    });
  }

  toggleItems = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { node, name, isRequired } = this.props;
    const properties = Object.keys(node.properties).map(propertyName => (
      <RowGenerator
        name={propertyName}
        node={node.properties[propertyName]}
        isRequired={node.required.includes(propertyName)}
      />
    ));

    return (
      <div className={name ? styles.row : ''}>
        { name && (
          <div className={styles.header}>
            <div className={styles.toggle}>
              { this.state.expanded && (
                <Button onClick={this.toggleItems}>Hide properties</Button>
              )}
              { !this.state.expanded && (
                <Button onClick={this.toggleItems}>Show properties</Button>
              )}
            </div>
            { name && <div className={styles.name}>{ name }</div> }
            <div className={styles.type}>object{ `${isRequired ? '' : ' (optional)'}` }</div>
          </div>
        )}
        { (this.state.expanded || !name) && (
          <div className={name ? styles.itemTable : ''}>
            { properties }
          </div>
        )}
      </div>
    );
  }
}

ObjectRow.propTypes = {
  node: React.PropTypes.object,
  name: React.PropTypes.string,
  isRequired: React.PropTypes.bool,
};

export default ObjectRow;
