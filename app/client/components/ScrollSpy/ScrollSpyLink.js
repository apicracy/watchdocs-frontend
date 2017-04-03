import React from 'react';
import styles from './ScrollSpyLink.css';

class ScrollSpyLink extends React.Component {
  static contextTypes = {
    scrollSpy: React.PropTypes.object
  }

  static propTypes = {
    section: React.PropTypes.string.isRequired
  }

  componentDidMount() {
    this.context.scrollSpy.registerLink(this.props.section)
  }

  render() {
    const { section, className, children, ...restProps } = this.props
    const isCurrent = (section === this.context.scrollSpy.currentSection);
    const classes = [
      className || '',
      isCurrent && 'active',
    ].map(v => styles[v]).join(' ');

    return (
      <a href={`#${section}`} className={classes} >{children}</a>
    );
  }
}

export default ScrollSpyLink;
