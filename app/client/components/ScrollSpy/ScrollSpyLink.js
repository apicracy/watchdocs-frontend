import React from 'react';
import styles from './ScrollSpyLink.css';

class ScrollSpyLink extends React.Component {
  static contextTypes = {
    scrollSpy: React.PropTypes.object,
  }

  static propTypes = {
    section: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    subitems: React.PropTypes.array,
    children: React.PropTypes.node,
    isTop: React.PropTypes.bool,
  }

  componentDidMount() {
    this.context.scrollSpy.registerLink(this.props.section);
  }

  isActive = doc => doc.section === this.context.scrollSpy.currentSection;

  render() {
    const {
      section,
      className,
      subitems,
      children,
      isTop,
    } = this.props;

    const isCurrent = this.isActive({ section });
    const hasActiveChildren = subitems && subitems.find(this.isActive);
    const isExpanded = hasActiveChildren || isCurrent;

    const classes = [
      'root',
      className || '',
      isTop && 'topLink',
      isCurrent && 'active',
    ].map(v => styles[v]).join(' ');

    const wrapperClasses = [
      'wrapper',
      isExpanded && 'expanded',
    ].map(v => styles[v]).join(' ');

    return (
      <div className={wrapperClasses}>
        <a href={`#${section}`} className={classes}>{children}</a>
        { isExpanded && (
          <div className={this.subitems}>
            { subitems && subitems.map((v, i) => (
              <ScrollSpyLink key={i} {...v}>{v.title}</ScrollSpyLink>
            )) }
          </div>
        )}
      </div>
    );
  }
}

export default ScrollSpyLink;
