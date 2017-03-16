
import React from 'react';
import { connect } from 'react-redux';

import styles from './Wiki.css';
import JSONSEditor from 'components/JSONSEditor/JSONSEditor';

@connect(state => state)
export default class Wiki extends React.Component {
  componentWillMount = () => {
    this.setState({
      base: undefined,
      baseString: '',
      baseValid: true,
      draft: undefined,
      draftString: '',
      draftValid: true,
      outputString: '',
    });
  }

  render() {
    const {
      base,
      baseString,
      baseValid,
      draft,
      draftString,
      draftValid,
      outputString,
    } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.editorWrapper}>
          <div className={styles.textAreaWrapper}>
            <h1>Base</h1>
            <textarea className={styles.textArea} value={baseString} onChange={this.onChangeBase} />
            { !baseValid && <div className={styles.information} >JSON Schema is not valid</div> }
          </div>
          <div className={styles.textAreaWrapper}>
            <h1>New Draft</h1>
            <textarea
              className={styles.textArea}
              value={draftString}
              onChange={this.onChangeDraft}
            />
            { !draftValid && <div className={styles.information}>JSON Schema is not valid</div> }
          </div>
        </div>
        <div className={styles.outputWrapper}>
          <h1>Output</h1>
          <div className={styles.outputContainer}>
            <JSONSEditor
              base={base}
              draft={draft}
              onCompare={this.onCompare}
            />
            <div className={styles.outputWrapper}>
              <p className={styles.outputText}>
                {outputString}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onChangeBase = (e) => {
    this.setState({
      baseString: e.target.value,
    });

    try {
      const obj = JSON.parse(e.target.value);
      this.setState({
        base: obj,
        baseValid: true,
      });
    } catch (err) {
      this.setState({ base: undefined, baseValid: false });
    }
  }

  onChangeDraft = (e) => {
    this.setState({
      draftString: e.target.value,
    });

    try {
      const obj = JSON.parse(e.target.value);
      this.setState({
        draft: obj,
        draftValid: true,
      });
    } catch (err) {
      this.setState({ draft: undefined, draftValid: false });
    }
  }

  onCompare = (output) => {
    const outputString = JSON.stringify(output, null, 4);
    this.setState({ outputString });
  }
}
