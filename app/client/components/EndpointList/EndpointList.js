import React from 'react';
import styles from './EndpointList.css';

import EndpointListGroup from './EndpointListGroup/EndpointListGroup';
import CustomIcon from 'components/Icon/CustomIcon';
import Icon from 'components/Icon/Icon';
import Select from 'components/Form/Select/AddNewSelect';
import Button from 'components/Button/Button';

class EndpointList extends React.Component {
  static propTypes = {
    endpoints: React.PropTypes.array,
    activeGroup: React.PropTypes.string,
    selected: React.PropTypes.string,
    onAddNewEndpoint: React.PropTypes.func,
    onAddNewGroup: React.PropTypes.func,
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
    /* eslint no-unused-vars: 0 */
    const { endpoints, activeGroup, selected,
      onAddNewEndpoint, onAddNewGroup, onClickItemMore, onClickGroupMore,
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
        <div>
          <Select
            emptyMsg="Add New"
            variants={['addNew']}
            customIcon={<div className={styles.buttonPlus}><CustomIcon size="lg" name="add-primary" /></div>}
            options={[
              (<Button key={1} onClick={onAddNewGroup}>
                <CustomIcon ext="svg" name="folder-closed" size="lg" color="white" />
                <span className={styles.addNewItem}>Group</span>
              </Button>),
              (<Button key={2} onClick={onAddNewEndpoint}>
                <span className={styles.endpointIcon}><Icon name="link" size="lg" /></span>
                <span className={styles.addNewItem}>Endpoint</span>
              </Button>),
            ]}
          />
        </div>
      </div>
    );
  }
}

export default EndpointList;
