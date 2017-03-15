
import React from 'react';
import { connect } from 'react-redux';

import styles from './Wiki.css';
import JSONSEditor from 'components/JSONSEditor/JSONSEditor';

@connect(state => state)
export default class Wiki extends React.Component {
  componentWillMount = () => {
    this.setState({
      base: {},
      baseString: '',
      valid: true,
    });
  }

  render() {
    const {
      base,
      baseString,
      valid,
    } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.textAreaWrapper}>
          <textarea className={styles.textArea} value={baseString} onChange={this.onChange} />
          { !valid && <p>JSON Schema is not valid</p> }
        </div>
        <JSONSEditor
          className={styles.editor}
          base={base}
        />
      </div>
    );
  }

  onChange = (e) => {
    this.setState({
      baseString: e.target.value,
    });

    try {
      const obj = JSON.parse(e.target.value);
      this.setState({
        base: obj,
        valid: true,
      });
    } catch (err) {
      this.setState({ valid: false });
    }
  }
}
