
import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'components/Input';
import { changeTitle } from 'services/app-service';
import { Link } from 'react-router';

@connect(state => ({
  title: state.app.title,
}))
export default class App extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    children: React.PropTypes.object,
    dispatch: React.PropTypes.func,
  }

  render() {
    const {
      title,
      children,
    } = this.props;

    return (
      <div>
        Hello world!<Link to="/about">Homepage</Link>
        <p>{title}</p>
        <Input value={title} onChange={this.onChange} placeholder="Title" />
        { children }
      </div>
    );
  }

  onChange = (value) => {
    this.props.dispatch(changeTitle(value));
  }
}
