import React from 'react';
import styles from './Select.css';
import CustomIcon from 'components/Icon/CustomIcon';
import Button from 'components/Button/Button';

/* eslint no-unused-vars: 0 */
// TODO: in development
class Select extends React.Component {

  static propTypes = {
    options: React.PropTypes.array,
    activeId: React.PropTypes.number,
    onSelect: React.PropTypes.func,
  }

  static defaultProps = {
    options: [],
    onSelect: () => {},
  }

  componentWillMount() {
    this.setState({ isOpen: false });
  }

  handleOptionClick = id => () => {
    this.setState({ isOpen: false });
    this.props.onSelect(id);
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { options, onSelect, activeId } = this.props;
    const selectedOption = options.filter(v => v.id === activeId);

    return (
      <div className={styles.selectWrapper}>
        <div className={styles.selectedOption}>
          <Button
            onClick={this.toggleOpen}
            icon={<CustomIcon ext="svg" color="white" size="sm" name="arrow-down" />}
          >
            { selectedOption[0] && selectedOption[0].name }
            { selectedOption.length === 0 && 'Please Choose' }
          </Button>
        </div>
        { this.state.isOpen && (
          <div className={styles.optionList}>
            { options.map(o => (
              <Button key={o.id} onClick={this.handleOptionClick(o.id)}>{o.name}</Button>
            )) }
          </div>
        )}
      </div>
    );
  }
}

export default Select;
