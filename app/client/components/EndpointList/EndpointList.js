import React from 'react';
import styles from './EndpointList.css';

import EndpointListGroup from './EndpointListGroup/EndpointListGroup';
import CustomIcon from 'components/Icon/CustomIcon';
import Icon from 'components/Icon/Icon';
import Select from 'components/Form/Select/AddNewSelect';
import Button from 'components/Button/Button';
import DocumentListItem from './DocumentListItem/DocumentListItem';

class EndpointList extends React.Component {
  static propTypes = {
    endpoints: React.PropTypes.array,
    activeGroup: React.PropTypes.string,
    selected: React.PropTypes.string,
    onAddNewEndpoint: React.PropTypes.func,
    onAddNewGroup: React.PropTypes.func,
    onAddNewDocument: React.PropTypes.func,
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
      onAddNewEndpoint, onAddNewGroup, onAddNewDocument,
    } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.list}>
          {
            /* TODO not sure if id will be int or string */
            endpoints.map((group) => {
              if (group.wiki) {
                return (
                  <DocumentListItem
                    isActive={(`${group.id}` === activeGroup)}
                    activeGroup={activeGroup}
                    selected={selected}
                    key={group.id}
                    {...group}
                  />);
              }
              return null;
            })
          }
          {
            endpoints.map((group) => {
              if (!group.wiki) {
                return (
                  <EndpointListGroup
                    isActive={(`${group.id}` === activeGroup)}
                    isOpen={!!group.isOpen}
                    activeGroup={activeGroup}
                    selected={selected}
                    key={group.id}
                    {...group}
                  />);
              }
              return null;
            })
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
                <span className={styles.endpointIcon}><Icon name="folder-o" size="lg" /></span>
                <span className={styles.addNewItem}>Group</span>
              </Button>),
              (<Button key={2} onClick={onAddNewEndpoint}>
                <span className={styles.endpointIcon}><Icon name="link" size="lg" /></span>
                <span className={styles.addNewItem}>Endpoint</span>
              </Button>),
              (<Button key={3} onClick={onAddNewDocument}>
                <span className={styles.endpointIcon}><Icon name="file-o" size="lg" /></span>
                <span className={styles.addNewItem}>Document</span>
              </Button>),
            ]}
          />
        </div>
      </div>
    );
  }
}

export default EndpointList;
