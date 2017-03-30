import React from 'react';

import styles from './EndpointListGroup.css';

import EndpointListItem from '../EndpointListItem/EndpointListItem';
import Icon from 'components/Icon/Icon';
import Link from 'components/NavigationLink/LinkWrapper';

class EndpointListGroup extends React.Component {

  static propTypes = {
    id: React.PropTypes.number,
    groupName: React.PropTypes.string,
    groupPath: React.PropTypes.string,
    endpoints: React.PropTypes.arrayOf(React.PropTypes.object),
    isActive: React.PropTypes.bool,
    isOpen: React.PropTypes.bool,
    activeGroup: React.PropTypes.string,
    selected: React.PropTypes.string,
  }

  componentWillMount() {
    // TODO cache opened folders
    this.setState({
      isOpen: false,
      force: false,
    });
  }

  renderIcon() {
    const open = (this.state.isOpen || (!this.state.force && this.props.isOpen));
    const icon = open ? 'caret-down' : 'caret-right';

    return <Icon name={icon} />;
  }

  renderEndpoint(endpoint) {
    const { id, groupPath, selected } = this.props;

    return (
      <EndpointListItem
        key={endpoint.id}
        isSelected={(selected === `${endpoint.id}`)}
        groupId={id}
        path={groupPath}
        {...endpoint}
      />
    );
  }

  renderEndpointGroup(group) {
    const { groupPath, selected, activeGroup } = this.props;

    return (
      <EndpointListGroup
        isActive={(`${group.id}` === activeGroup)}
        activeGroup={activeGroup}
        selected={selected}
        key={group.id}
        {...group}
        groupPath={groupPath + group.groupPath}
      />
    );
  }

  renderEndpointList(endpoints) {
    if (this.state.isOpen || (!this.state.force && this.props.isOpen)) {
      return endpoints.map((endpoint) => {
        if (endpoint.method) {
          return this.renderEndpoint(endpoint);
        } else if (endpoint.groupPath) {
          return this.renderEndpointGroup(endpoint);
        }

        return null; // do not render
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
    const { id, groupName, endpoints, isActive, selected } = this.props;
    const topStyle = (isActive && !selected) ? styles.selected : styles.link;

    return (
      <div className={styles.root}>
        <div className={topStyle}>
          <Link to={`/editor/${id}`} className={styles.link} onClick={this.toggleOpen}>
            { this.renderIcon() }
            <span className={styles.groupName}>{ groupName }</span>
          </Link>
        </div>
        <div className={styles.endpoints}>
          { this.renderEndpointList(endpoints) }
        </div>
      </div>
    );
  }
}

export default EndpointListGroup;
