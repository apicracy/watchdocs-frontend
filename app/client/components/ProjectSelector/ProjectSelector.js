import React from 'react';
import styles from './ProjectSelector.css';
import CustomIcon from 'components/Icon/CustomIcon';
import Button from 'components/Button/Button';

class ProjectSelector extends React.Component {
  static propTypes = {
    projects: React.PropTypes.array,
    activeProject: React.PropTypes.object,
    onSelect: React.PropTypes.func,
    onAddNew: React.PropTypes.func,
  }

  static defaultProps = {
    projects: [],
    onSelect: () => {},
  }

  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  close = () => this.setState({ isOpen: false });
  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  handleOptionClick = id => () => {
    this.close();
    this.props.onSelect(id);
  }

  handleAddClick = () => {
    this.close();
    this.props.onAddNew();
  }

  onOutsideClick = (e) => {
    const currentTarget = e.currentTarget;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.close();
      }
    });
  }

  render() {
    const { projects, activeProject } = this.props;
    const { isOpen } = this.state;

    const wrapperStyle = [
      styles.selectWrapper,
      isOpen && styles.open,
    ].join(' ');


    const selectedProject = (
      <div className={styles.selectedOption}>
        <Button
          type="button"
          onClick={this.toggle}
        >
          <div className={styles.arrowButton}>
            <CustomIcon ext="svg" color="white" size="sm" name="arrow-down" />
          </div>
          <span className={styles.innerSelected}>
            <span className={styles.main}>
              { activeProject && activeProject.name }
            </span>
          </span>
        </Button>
      </div>
    );

    const projectsOptions = (
      <div className={styles.optionList}>
        { projects.map(project => (
          <Button
            key={project.id}
            onClick={this.handleOptionClick(project.id)}
          >
            {project.name}
            {project.sample &&
              <span className={`badge badge-pill ${styles.badge}`}>SAMPLE</span>
            }
          </Button>
        )) }
        <a onClick={this.handleAddClick} className={styles.addNew}>Add new +</a>
      </div>
    );

    return (
      <div className={wrapperStyle} tabIndex="0" onBlur={this.onOutsideClick}>
        { selectedProject }
        { isOpen && projectsOptions }
      </div>
    );
  }
}

export default ProjectSelector;
