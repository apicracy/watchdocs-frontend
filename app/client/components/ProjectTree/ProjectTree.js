import React, { Component } from 'react';
import Tree from 'react-ui-tree';
import { connect } from 'react-redux';
import EndpointListGroup from 'components/EndpointList/EndpointListGroup/EndpointListGroup';
import EndpointListItem from 'components/EndpointList/EndpointListItem/EndpointListItem';
import DocumentListItem from 'components/EndpointList/DocumentListItem/DocumentListItem';

import { moveTreeItem } from 'services/endpointsTree';

const defaultTree = {
  name: '',
  tree_item_id: -1,
  children: [],
};

@connect(() => ({ }))
class ProjectTree extends Component {
  static propTypes = {
    tree: React.PropTypes.object,
    activeGroup: React.PropTypes.string,
    selected: React.PropTypes.string,
    treeRootId: React.PropTypes.number,
    dispatch: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      active: null,
      tree: props.tree || defaultTree,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tree: nextProps.tree,
    });
  }

  renderNode = (node) => {
    const { activeGroup, selected } = this.props;
    const isSelected = selected === `${node.id}`;
    const isActive = activeGroup === `${node.id}`;
    switch (node.type) {
      case 'Endpoint': {
        return this.renderEndpoint(node, isSelected);
      }
      case 'Group': {
        return this.renderGroup(node, isActive, isSelected);
      }
      case 'Document': {
        return this.renderDocument(node, isSelected);
      }
      default: return null;
    }
  }

  renderGroup = (group, isActive, isSelected) => (
    <EndpointListGroup
      isActive={isActive}
      selected={isSelected}
      key={group.id}
      name={group.name}
      id={group.id}
    />
  )

  renderEndpoint = (endpoint, isSelected) => (
    <EndpointListItem
      key={endpoint.id}
      isSelected={isSelected}
      {...endpoint}
    />
  )

  renderDocument = (document, isSelected) => (
    <DocumentListItem
      key={document.id}
      selected={isSelected}
      {...document}
    />
  )

  render() {
    return (
      <div className="tree">
        <Tree
          paddingLeft={10}
          tree={this.state.tree}
          onChange={this.handleChange}
          isNodeCollapsed={this.isNodeCollapsed}
          renderNode={this.renderNode}
        />
      </div>
    );
  }

  handleChange = (tree, itemToMoveId, destinationId, placementType) => {
    let params = { to: destinationId };
    let reload = false;

    if (placementType === 'before') params = { before: destinationId };
    if (placementType === 'after') params = { after: destinationId };

    // Protect from adding out of the root item
    // We need to reload list as the movement will be different
    // from what what we received in params
    if (destinationId === this.props.treeRootId) {
      reload = true;
      const firstItemInRoot = tree.children[1];
      if (!firstItemInRoot) params = { to: this.props.treeRootId };
      params = { before: firstItemInRoot.tree_item_id };
    }

    this.props.dispatch(moveTreeItem(itemToMoveId, params, reload));
    if (!reload) this.setState({ tree });
  }
}

export default ProjectTree;
