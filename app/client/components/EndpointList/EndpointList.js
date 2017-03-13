import React from 'react';
import styles from './EndpointList.css';

import EndpointListGroup from './EndpointListGroup/EndpointListGroup';
import CustomIcon from 'components/Icon/CustomIcon';

class EndpointList extends React.Component {
  static propTypes = {
    endpoints: React.PropTypes.array,
    activeGroup: React.PropTypes.string,
    selected: React.PropTypes.string,
    onAddNewEndpoint: React.PropTypes.func,
    onClickItemMore: React.PropTypes.func,
    onClickGroupMore: React.PropTypes.func,
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
    const { endpoints, activeGroup, selected,
      onAddNewEndpoint, onClickItemMore, onClickGroupMore,
    } = this.props;

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
                onClickGroupMore={onClickGroupMore}
                onClickItemMore={onClickItemMore}
              />
            ))
          }
          { (!endpoints || endpoints.length === 0) && this.renderNoItems() }
        </div>
        <button
          onClick={onAddNewEndpoint}
          className={styles.addNewEndpointButton}
        >
          Add New <span className={styles.buttonPlus}><CustomIcon size="lg" name="add-primary" /></span>
        </button>


      </div>
    );
  }
}

export default EndpointList;
