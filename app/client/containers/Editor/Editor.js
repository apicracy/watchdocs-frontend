import React from 'react';
import { connect } from 'react-redux';

import styles from './Editor.css';
import Aside from 'containers/Aside/Aside';
import Content from 'components/Content/Content';

@connect(store => ({
  endpoints: store.endpoints,
}))

class Editor extends React.Component {
  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    params: React.PropTypes.object, // supplied by react-router
  }

  render() {
    const { children, params } = this.props;

    return (
      <div className={styles.container}>
        <Aside params={params} />
        <Content>
          { children }
        </Content>
      </div>
    );
  }
}

export default Editor;
