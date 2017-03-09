import React from 'react';

import styles from './EndpointListGroup.css';

import EndpointListItem from '../EndpointListItem/EndpointListItem';
import Icon from 'components/Icon/Icon';
import CustomIcon from 'components/Icon/CustomIcon';
import { Link } from 'react-router';

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
    if (this.state.isOpen || (!this.state.force && this.props.isOpen)) {
      return <CustomIcon name="folder-open" size="lg" />;
    }

    return <CustomIcon name="folder-closed" size="lg" />;
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
        <Link to={`/docs/${id}`} className={topStyle} onClick={this.toggleOpen}>
          <span className={styles.nameWrapper}>
            { this.renderIcon() }
            <span className={styles.groupName}>{ groupName }</span>
          </span>
          { (isActive && !selected) && <Icon name="ellipsis-h" /> }
        </Link>
        <div className={styles.endpoints}>
          { this.renderEndpointList(endpoints) }
        </div>
      </div>
    );
  }
}

export default EndpointListGroup;
