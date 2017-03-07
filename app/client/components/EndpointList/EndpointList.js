import React from 'react';
import styles from './EndpointList.css';

import EndpointListGroup from './EndpointListGroup/EndpointListGroup';
import Icon from 'components/Icon/Icon';

import AddNewEndpointModal from './AddNewEndpointModal/AddNewEndpointModal';

class EndpointList extends React.Component {
  static propTypes = {
    endpoints: React.PropTypes.array,
    activeGroup: React.PropTypes.string,
    selected: React.PropTypes.string,
  };

  componentWillMount() {
    // cache opened modal
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const { endpoints, activeGroup, selected } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.list}>
          {
            /* TODO not sure if id will be int or string */
            endpoints.map(group => (
              <EndpointListGroup
                isActive={(`${group.id}` === activeGroup)}
                activeGroup={activeGroup}
                selected={selected}
                key={group.id}
                {...group}
              />
            ))
          }
        </div>
        <button
          onClick={() => { this.setState({ isOpen: true }); }}
          className={styles.addNewEndpointButton}
        >
          Add New <span className={styles.plusButton}><Icon name="plus-circle" /></span>
        </button>

        <AddNewEndpointModal
          isShow={this.state.isOpen}
          onSave={() => { this.setState({ isOpen: false }); }}
          onHide={() => { this.setState({ isOpen: false }); }}
        />
      </div>
    );
  }
}

export default EndpointList;
