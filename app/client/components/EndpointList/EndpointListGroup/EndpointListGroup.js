import React from 'react';

import styles from './EndpointListGroup.css';

import EndpointListItem from '../EndpointListItem/EndpointListItem';
import DocumentListItem from '../DocumentListItem/DocumentListItem';
import Icon from 'components/Icon/Icon';

class EndpointListGroup extends React.Component {

  static propTypes = {
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    isActive: React.PropTypes.bool,
    isOpen: React.PropTypes.bool,
    activeGroup: React.PropTypes.string,
    selected: React.PropTypes.string,
  }

  componentWillMount() {
    // TODO cache opened folders
    this.setState({
      isOpen: true,
      force: false,
    });
  }

  renderIcon() {
    const open = (this.state.isOpen || (!this.state.force && this.props.isOpen));
    const icon = open ? 'caret-down' : 'caret-right';

    return <Icon name={icon} />;
  }

  renderEndpoint(endpoint) {
    const { id, selected } = this.props;

    return (
      <EndpointListItem
        key={endpoint.id}
        isSelected={(selected === `${endpoint.id}`)}
        groupId={id}
        {...endpoint}
      />
    );
  }
  renderDocument(endpoint) {
    const { id, selected } = this.props;

    return (
      <DocumentListItem
        key={endpoint.id}
        isSelected={(selected === `${endpoint.id}`)}
        groupId={id}
        {...endpoint}
      />
    );
  }

  renderEndpointGroup(group) {
    const { selected, activeGroup } = this.props;

    return (
      <EndpointListGroup
        isActive={(`${group.id}` === activeGroup)}
        activeGroup={activeGroup}
        selected={selected}
        key={group.id}
        {...group}
      />
    );
  }

  renderEndpointList(endpoints) {
    if (endpoints && (this.state.isOpen || (!this.state.force && this.props.isOpen))) {
      return endpoints.map((endpoint) => {
        switch (endpoint.type) {
          case 'Endpoint': {
            return this.renderEndpoint(endpoint);
          }
          case 'Group': {
            return this.renderEndpointGroup(endpoint);
          }
          case 'Document': {
            return this.renderDocument(endpoint);
          }
          default: return null;
        }
      });
    }

    return [];
  }

  toggleOpen = () => {
    const { isOpen } = this.props;

    const conditions = [
      !this.state.isOpen,
      isOpen,
      !this.state.force,
    ];

    // Will not close when user wants to select open group
    if (conditions.every(e => e)) {
      this.setState({
        isOpen: false,
        force: true,
      });
      return;
    }

    this.setState({
      isOpen: !this.state.isOpen,
      force: isOpen,
    });
  }

  render() {
    const { id, name, items, isActive, selected } = this.props;
    const topStyle = (isActive && !selected) ? styles.selected : styles.link;
    return (
      <div className={styles.root}>
        <div className={topStyle}>
          <div className={styles.link} onClick={this.toggleOpen}>
            { this.renderIcon() }
            <span className={styles.groupName}>{ name }</span>
          </div>
        </div>
        <div className={styles.endpoints}>
          { this.renderEndpointList(items) }
        </div>
      </div>
    );
  }
}

export default EndpointListGroup;
