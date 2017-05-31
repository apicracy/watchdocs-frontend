import React from 'react';
import styles from './JSONBodyManager.css'
import JSONEditor from '../JSONEditor/JSONEditor';
import ConflictResolver from '../ConflictResolver/ConflictResolver';

import { isEmpty, isEqual } from 'lodash/lang';

import {
  cleanJSONSchema,
  compareJSONSchemas,
  isResolved,
  JSONSchemaToJSONLines,
} from 'services/JSONSchemaService';

class JSONBodyManager extends React.Component {
  static propTypes = {
    base: React.PropTypes.object,
    draft: React.PropTypes.object,
    onSave: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      conflictResolverEnabled: false,
      editorEnabled: false,
      hiddenDifferencesFound: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.selectComponent(nextProps);
  }

  componentWillMount() {
    this.selectComponent(this.props);
  }

  // There are differences in JSON Schema that
  // are not visible after casting to JSON
  // When we detect them we save the draft as new base.
  checkForHiddenDifferences(base, draft) {
    if (isEmpty(draft) || isEmpty(base) ||
      isEqual(base, draft)) {
      return false;
    }
    const differenceSchema = compareJSONSchemas(base, draft);
    const differenceLines = JSONSchemaToJSONLines(differenceSchema);
    if (!isResolved(differenceLines)) {
      // TODO: For optimization we can pass difference schema
      // generated here as props to ConflictResolver
      return false;
    }
    this.setState({
      hiddenDifferencesFound: true,
    });
    return true;
  }

  selectComponent = (props) => {
    this.setState({ hiddenDifferencesFound: false });

    let { base, draft } = props;
    base = cleanJSONSchema(base);
    draft = cleanJSONSchema(draft);
    this.checkForHiddenDifferences(base, draft);

    if (isEmpty(draft) || isEmpty(base) || isEqual(base, draft)) {
      this.enableEditor();
    } else {
      this.enableConflictResolver();
    }
    this.setState({ base, draft });
  }

  enableEditor = () => {
    this.setState({
      editorEnabled: true,
      conflictResolverEnabled: false,
    });
  }

  enableConflictResolver = () => {
    this.setState({
      editorEnabled: false,
      conflictResolverEnabled: true,
    });
  }

  onSave = newSchema => (
    this.props.onSave(cleanJSONSchema(newSchema))
  )

  render() {
    const {
      base, draft, hiddenDifferencesFound,
      editorEnabled, conflictResolverEnabled
    } = this.state;

    // TODO: use notice component
    return (
      <div>
        { hiddenDifferencesFound &&
          <div className={styles.warning}>
            <h3 className={styles.warning__title}> Exception occured </h3>
            <p className={styles.warning__content}>
              We are really sorry, but you can't edit the body. We found an edge case here.
              <br/>
              Please report it to <a href="mailto: contact@watchdocs.io">contact@watchdocs.io</a> sending this URL: {window.location.href}
            </p>
          </div>
        }
        { conflictResolverEnabled &&
          <ConflictResolver
            base={base}
            draft={draft}
            onSave={this.onSave}
          />
        }
        { editorEnabled &&
          <JSONEditor
            base={base}
            onSave={this.onSave}
          />
        }
      </div>
    );
  }
}

export default JSONBodyManager;
