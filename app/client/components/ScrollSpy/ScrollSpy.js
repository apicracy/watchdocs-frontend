import React from 'react';
import Link from './ScrollSpyLink';
import styles from './ScrollSpy.css';

class ScrollSpy extends React.Component {
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
    if(this.elem.getBoundingClientRect().top < 0) {
      this.setState({ position: 'fixed' });
    } else {
      this.setState({ position: 'relative' });
    }
  }

  setCurrentSection = () => {
    const { sections } = this.state
    const sectionCount = sections.length

    this.floatingMenu();

    if (!sectionCount) return;

    let currentSection = this.props.defaultSection ? sections[0] : null
    const sectionNodes = sections.map(v => document.getElementById(v));

    sectionNodes.forEach(section => {
      if(!section) return;

      if (window.pageYOffset > (section.offsetTop - 100)) {
        currentSection = section.id
      }
    });

    this.setState({ currentSection })
  }

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
    )
  }
}

export { ScrollSpy, Link };
export default ScrollSpy;
