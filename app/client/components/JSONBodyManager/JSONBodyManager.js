import React from 'react';

import JSONEditor from '../JSONEditor/JSONEditor';
import ConflictResolver from '../ConflictResolver/ConflictResolver';

import { isEmpty, isEqual } from 'lodash/lang';

import {
  cleanJSONSchema,
  compareJSONSchemas,
  isResolved,
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
    if (!isResolved(differenceSchema)) {
      // TODO: For optimization we can pass difference schema
      // generated here as props to ConflictResolver
      return false;
    }
    this.onSave(draft);
    return true;
  }

  selectComponent = (props) => {
    let { base, draft } = props;
    base = cleanJSONSchema(base);
    draft = cleanJSONSchema(draft);
    if (this.checkForHiddenDifferences(base, draft)) {
      return;
    }

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
    const { base, draft } = this.state;
    const { editorEnabled, conflictResolverEnabled } = this.state;
    return (
      <div>
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
