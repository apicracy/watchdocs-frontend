import React from 'react';

import CodeEditor from '../CodeEditor/CodeEditor';
import ConflictResolver from '../ConflictResolver/ConflictResolver';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

import { isEmpty, isEqual } from 'lodash/lang';

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
    const { base, draft } = props;

    if (isEmpty(draft) || isEmpty(base) || isEqual(base, draft)) {
      this.enableEditor();
    } else {
      this.enableConflictResolver();
    }
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
    return this.props.onSave(newSchema).then(() => {
      this.setState({ submitting: false });
    });
  }

  render() {
    const { base, draft } = this.props;
    const { editorEnabled, conflictResolverEnabled, submitting } = this.state;
    return (
      <div>
        { submitting && <LoadingIndicator fixed /> }
        { conflictResolverEnabled &&
          <ConflictResolver
            base={base}
            draft={draft}
            onSave={this.onSave}
          />
        }
        { editorEnabled &&
          <CodeEditor
            base={base}
            onSave={this.onSave}
          />
        }
      </div>
    );
  }
}

export default JSONBodyManager;
