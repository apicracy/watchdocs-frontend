import React from 'react';
import styles from './Sidebar.css';

class Sidebar extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  componentWillMount() {
    // Load width from cache
    let initWidth = 250;

    if (typeof (Storage) !== 'undefined' && localStorage.getItem('sidebarWidth')) {
      initWidth = localStorage.getItem('sidebarWidth');
      initWidth = parseInt(initWidth, 10);
    }

    this.setState({ width: initWidth, baseWidth: initWidth, dragStart: null });
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

    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem('sidebarWidth', this.state.width);
    }
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
    );
  }
}

export default Sidebar;
