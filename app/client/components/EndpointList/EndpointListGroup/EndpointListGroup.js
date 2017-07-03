import React from 'react';
import styles from './EndpointListGroup.css';
import Link from 'components/NavigationLink/LinkWrapper';

class EndpointListGroup extends React.Component {

  static propTypes = {
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    selected: React.PropTypes.bool,
  }

  componentWillMount() {
    // TODO cache opened folders
    this.setState({
      force: false,
    });
  }

  render() {
    const { id, name, isActive, selected } = this.props;
    const topStyle = (isActive && !selected) ? styles.selected : styles.link;
    return (
      <div className={styles.root}>
        <div className={topStyle}>
          <Link to={`/editor/group/${id}`} className={styles.link}>
            <span className={styles.groupName}>{ name }</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default EndpointListGroup;
