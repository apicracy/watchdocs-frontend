import React from 'react';
import styles from './EndpointList.css';
import { connect } from 'react-redux';

import EndpointListGroup from './EndpointListGroup/EndpointListGroup';
import EndpointListItem from './EndpointListItem/EndpointListItem';
import CustomIcon from 'components/Icon/CustomIcon';
import Icon from 'components/Icon/Icon';
import Select from 'components/Form/Select/AddNewSelect';
import Button from 'components/Button/Button';
import DocumentListItem from './DocumentListItem/DocumentListItem';
import ProjectTree from 'components/ProjectTree/ProjectTree';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

import { parseTreeItem } from 'services/endpointsTree';

@connect(store => ({
  treeRootId: store.endpoints.treeRootId,
  isFetching: store.endpoints.isFetching,
}))
class EndpointList extends React.Component {
  static propTypes = {
    endpoints: React.PropTypes.array,
    treeRootId: React.PropTypes.number,
    activeGroup: React.PropTypes.string,
    selected: React.PropTypes.string,
    onAddNewEndpoint: React.PropTypes.func,
    onAddNewGroup: React.PropTypes.func,
    onAddNewDocument: React.PropTypes.func,
    isFetching: React.PropTypes.bool,
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

  projectTree = () => {
    const { endpoints, treeRootId } = this.props;
    return {
      type: 'Group',
      name: 'root',
      tree_item_id: treeRootId,
      children: endpoints.map(treeItem => parseTreeItem(treeItem)),
    };
  }

  render() {
    /* eslint no-unused-vars: 0 */
    const { endpoints, activeGroup, selected, treeRootId,
      onAddNewEndpoint, onAddNewGroup, onAddNewDocument, isFetching,
    } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.list}>
          { isFetching && <LoadingIndicator /> }
          <ProjectTree
            tree={this.projectTree()}
            activeGroup={activeGroup}
            selected={selected}
            treeRootId={treeRootId}
          />
          { (!endpoints || endpoints.length === 0) && this.renderNoItems() }
        </div>
        <div className={styles.dragdrop}>
          Drag & drop to reorder
        </div>
        <div>
          <Select
            emptyMsg="Add New"
            variants={['addNew']}
            customIcon={<div className={styles.buttonPlus}><CustomIcon size="lg" name="add-primary" /></div>}
            id="endpoint-list-add-new"
            options={[
              (<Button key={1} onClick={onAddNewGroup}>
                <span className={styles.endpointIcon}><Icon name="folder-o" size="lg" /></span>
                <span className={styles.addNewItem}>Group</span>
              </Button>),
              (<Button key={2} onClick={onAddNewEndpoint}>
                <span className={styles.endpointIcon}><Icon name="link" size="lg" /></span>
                <span className={styles.addNewItem}>Endpoint</span>
              </Button>),
              false && (<Button key={3} onClick={onAddNewDocument}>
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
