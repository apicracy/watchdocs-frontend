import React from 'react';
import styles from './Sidebar.css';

class Sidebar extends React.Component {

  componentWillMount() {
    // Load width from cache
    this.setState({ width: 300, baseWidth: 300, dragStart: null });
  }

  onDragStart = ({ nativeEvent }) => {
    this.setState({ dragStart: nativeEvent.pageX });
  }

  onDrag = ({ nativeEvent }) => {
    if (this.state.width + (nativeEvent.pageX - this.state.dragStart) > 200) {
      this.setState({
        width: this.state.width + (nativeEvent.pageX - this.state.dragStart),
        dragStart: nativeEvent.pageX,
      });
    }
  }

  onDragEnd = () => {
    this.setState({
      baseWidth: null,
    });
  }

  render() {
    const { children } = this.props;
    return (
      <aside className={styles.sideBar} style={{ width: this.state.width }}>
        <div
          draggable
          onDragStart={this.onDragStart}
          onDrag={this.onDrag}
          onDragEnd={this.onDragEnd}
          className={styles.handle}
        />
        { children }
      </aside>
    )
  }
}

export default Sidebar;
