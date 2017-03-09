import React from 'react';
import styles from './EndpointList.css';

import EndpointListGroup from './EndpointListGroup/EndpointListGroup';
import Icon from 'components/Icon/Icon';

class EndpointList extends React.Component {
  static propTypes = {
    endpoints: React.PropTypes.array,
    activeGroup: React.PropTypes.string,
    selected: React.PropTypes.string,
    onAddNewEndpoint: React.PropTypes.func,
  };

  componentWillMount() {
    // cache opened modal
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const { endpoints, activeGroup, selected, onAddNewEndpoint } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.list}>
          {
            /* TODO not sure if id will be int or string */
            endpoints.map(group => (
              <EndpointListGroup
                isActive={(`${group.id}` === activeGroup)}
                isOpen={!!group.isOpen}
                activeGroup={activeGroup}
                selected={selected}
                key={group.id}
                {...group}
              />
            ))
          }
        </div>
        <button
          onClick={onAddNewEndpoint}
          className={styles.addNewEndpointButton}
        >
          Add New <span className={styles.plusButton}><Icon name="plus-circle" /></span>
        </button>


      </div>
    );
  }
}

export default EndpointList;
