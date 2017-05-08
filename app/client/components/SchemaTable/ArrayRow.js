import React from 'react';

import styles from './SchemaTable.css';

import Button from 'components/Button/Button';
import RowGenerator from './RowGenerator';

class ArrayRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  toggleItems = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { node, name, isRequired } = this.props;
    const items = <RowGenerator node={node.items} isRequired />;

    return (
      <div className={styles.row}>
        <div className={styles.header}>
          <div className={styles.toggle}>
            { this.state.expanded && (
              <Button onClick={this.toggleItems}>Hide items</Button>
            )}
            { !this.state.expanded && (
              <Button onClick={this.toggleItems}>Show items</Button>
            )}
          </div>
          { name && <div className={styles.name}>{ name }</div> }
          <div className={styles.type}>array{ `${isRequired ? '' : ' (optional)'}` }</div>
        </div>
        { this.state.expanded && (
          <div className={styles.itemTable}>
            { items }
          </div>
        )}
      </div>
    );
  }
}

ArrayRow.propTypes = {
  node: React.PropTypes.object,
  name: React.PropTypes.string,
  isRequired: React.PropTypes.bool,
};

export default ArrayRow;
