import React from 'react';
import styles from './Tabs.css';

import TabLink from './TabLink/TabLink';

class Tabs extends React.Component {

  static propTypes = {
    data: React.PropTypes.array,
    onChange: React.PropTypes.func,
  }

  componentWillMount() {
    this.setState({ active: null });
  }

  onLinkClick = (id) => {
    this.setState({ active: id });
    this.props.onChange(id);
  }

  render() {
    const { data } = this.props;
    const active = this.state.active || this.props.data[0].id;

    return (
      <div className={styles.root}>
        {
          data.map(v => (
            <TabLink
              key={v.id}
              id={v.id}
              onClick={this.onLinkClick}
              active={v.id === active}
              title={v.title}
            />
          ))
        }
      </div>
    );
  }
}


export default Tabs;
