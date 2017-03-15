
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
      base2: {},
      baseString2: '',
      valid2: true,
    });
  }

  render() {
    const {
      base,
      baseString,
      valid,
      base2,
      baseString2,
      valid2,
    } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.editorWrapper}>
          <div className={styles.textAreaWrapper}>
            <h1>Base</h1>
            <textarea className={styles.textArea} value={baseString} onChange={this.onChange} />
            { !valid && <p>JSON Schema is not valid</p> }
          </div>
          <div className={styles.textAreaWrapper}>
            <h1>New Draft</h1>
            <textarea className={styles.textArea} value={baseString2} onChange={this.onChange2} />
            { !valid2 && <p>JSON Schema is not valid</p> }
          </div>
        </div>
        <div className={styles.outputWrapper}>
          <h1>Output</h1>
          <div className={styles.outputContainer}>
            <JSONSEditor
              base={base}
              newDraft={base2}
            />
          <div className={styles.outputWrapper}>
              <p className={styles.outputText}>
                {baseString}
              </p>
            </div>
          </div>
        </div>
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

  onChange2 = (e) => {
    this.setState({
      baseString2: e.target.value,
    });

    try {
      const obj = JSON.parse(e.target.value);
      this.setState({
        base2: obj,
        valid2: true,
      });
    } catch (err) {
      this.setState({ valid2: false });
    }
  }
}
