import React from 'react';
import Link from './ScrollSpyLink';
import styles from './ScrollSpy.css';

class ScrollSpy extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  static childContextTypes = {
    scrollSpy: React.PropTypes.object,
  }

  componentWillMount() {
    this.state = {
      sections: [],
      currentSection: null,
      position: 'relative',
    };
  }

  getChildContext() {
    return {
      scrollSpy: {
        registerLink: this.registerLink,
        currentSection: this.state.currentSection,
      },
    };
  }

  componentDidMount() {
    this.setCurrentSection();
    window.addEventListener('scroll', this.setCurrentSection);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.setCurrentSection);
  }

  registerLink = (section) => {
    const { sections } = this.state;
    sections.push(section);
    this.setState({ sections });
  }

  floatingMenu = () => {
    if (this.elem.getBoundingClientRect().top < 0) {
      this.setState({ position: 'fixed' });
    } else {
      this.setState({ position: 'relative' });
    }
  }

  isInView = rect => ((Math.abs(rect.top) + Math.abs(rect.bottom)) - 250) <= rect.height;

  getVisibleSections = sections => sections.filter((section) => {
    if (!section) return false;
    const bounds = section.getBoundingClientRect();

    return this.isInView(bounds);
  });

  setCurrentSection = () => {
    console.log("scrolled");
    const { sections } = this.state;
    const sectionCount = sections.length;

    this.floatingMenu();

    if (!sectionCount) return;

    const sectionNodes = sections.map(v => document.getElementById(v));
    const inView = this.getVisibleSections(sectionNodes);
    const selected = this.getTopmostSection(inView);
    const currentSection = selected ? selected.id : null;

    this.setState({ currentSection });
  }

  getTopmostSection = active => active.reduce((state, section) => {
    const stateTop = state ? state.getBoundingClientRect().top : null;
    const sectionTop = section.getBoundingClientRect().top;

    if (stateTop === 0) return state;
    if (!stateTop) return section;

    return (stateTop > sectionTop) ? state : section;
  }, null);

  render() {
    const classes = [
      'root',
      this.state.position,
    ].map(v => styles[v]).join(' ');

    return (
      <div ref={(elem) => { this.elem = elem; }} className={styles.wrapper}>
        <div className={classes}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export { ScrollSpy, Link };
export default ScrollSpy;
