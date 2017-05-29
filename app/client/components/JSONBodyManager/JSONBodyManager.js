import React from 'react';

import JSONEditor from '../JSONEditor/JSONEditor';
import ConflictResolver from '../ConflictResolver/ConflictResolver';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

import { isEmpty, isEqual } from 'lodash/lang';

import { cleanJSONSchema } from 'services/JSONSchemaService';

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
      submitting: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.selectComponent(nextProps);
  }

  componentWillMount() {
    this.selectComponent(this.props);
  }

  selectComponent = (props) => {
    let { base, draft } = props;
    base = cleanJSONSchema(base);
    draft = cleanJSONSchema(draft);

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

  onSave = (newSchema) => {
    this.setState({ submitting: true });
    return this.props.onSave(cleanJSONSchema(newSchema)).then(() => {
      this.setState({ submitting: false });
    });
  }

  render() {
    const { base, draft } = this.state;
    const { editorEnabled, conflictResolverEnabled, submitting } = this.state;
    return (
      <div>
        { submitting && <LoadingIndicator /> }
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
