/* eslint-disable */
import cx from 'classnames';
import React, { Component } from 'react'
import Tree from 'react-ui-tree';
import EndpointListGroup from 'components/EndpointList/EndpointListGroup/EndpointListGroup';
import EndpointListItem from 'components/EndpointList/EndpointListItem/EndpointListItem';
import DocumentListItem from 'components/EndpointList/DocumentListItem/DocumentListItem';


const defaultTree = {
  name: '',
  tree_item_id: -1,
  children: [],
}

class ProjectTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      tree: props.tree || defaultTree
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tree: nextProps.tree
    })
  }

  renderNode = (node) => {
    const {activeGroup, selected} = this.props;
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
      <div className="app">
        <div className="tree">
          <Tree
            paddingLeft={10}
            tree={this.state.tree}
            onChange={this.handleChange}
            isNodeCollapsed={this.isNodeCollapsed}
            renderNode={this.renderNode}
          />
        </div>
      </div>
    );
  }

  handleChange = (tree, movedItem, desinationId, placement) => {
    this.setState({
      tree: tree
    });
  }
};

export default ProjectTree;
