import React from 'react';
import styles from './EndpointList.css';

import EndpointListGroup from './EndpointListGroup/EndpointListGroup';
import CustomIcon from 'components/Icon/CustomIcon';

import AddNewModal from './AddNewModal/AddNewModal';

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

  renderNoItems = () => (
    <div className={styles.noResults}>There are no results matching your criteria</div>
  );

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
                isOpen={!!group.isOpen}
                activeGroup={activeGroup}
                selected={selected}
                key={group.id}
                {...group}
              />
            ))
          }
          { (!endpoints || endpoints.length === 0) && this.renderNoItems() }
        </div>
        <button
          onClick={() => { this.setState({ isOpen: true }); }}
          className={styles.addNewEndpointButton}
        >
          Add New <CustomIcon ext="svg" size="lg" name="add-primary" />
        </button>

        <AddNewModal
          isShow={this.state.isOpen}
          onSave={() => { this.setState({ isOpen: false }); }}
          onHide={() => { this.setState({ isOpen: false }); }}
        />
      </div>
    );
  }
}

export default EndpointList;
