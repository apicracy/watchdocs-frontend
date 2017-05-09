import React from 'react';
import styles from './Select.css';
import CustomIcon from 'components/Icon/CustomIcon';
import Button from 'components/Button/Button';

class Select extends React.Component {

  static propTypes = {
    options: React.PropTypes.array,
    activeId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    onSelect: React.PropTypes.func,
    variants: React.PropTypes.array,
    emptyMsg: React.PropTypes.string,
    additionalInfo: React.PropTypes.string,
  }

  static defaultProps = {
    options: [],
    onSelect: () => {},
    variants: [],
    emptyMsg: 'Please choose',
  }

  componentWillMount() {
    this.setState({ isOpen: false });
  }

  handleOptionClick = id => () => {
    this.setState({ isOpen: false });
    this.props.onSelect(id);
  }

  onOutsideClick = (e) => {
    const currentTarget = e.currentTarget;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.toggleOpen(true);
      }
    });
  }

  toggleOpen = (forceHide) => {
    if (forceHide === true) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }

  render() {
    const { options, activeId, variants, emptyMsg, additionalInfo } = this.props;
    const variantStyles = variants.map(v => styles[v]);
    const selectedOption = options.filter(v => v.id === activeId);

    const selectStyle = [
      styles.selectWrapper,
      ...variantStyles,
      this.state.isOpen && styles.open,
    ].join(' ');

    return (
      <div className={selectStyle} tabIndex="0" onBlur={this.onOutsideClick}>
        <div className={styles.selectedOption}>
          <Button
            type="button"
            onClick={this.toggleOpen}
            icon={<CustomIcon ext="svg" color="white" size="sm" name="arrow-down" />}
          >
            <span className={styles.innerSelected}>
              <span className={styles.main}>
                { selectedOption[0] && selectedOption[0].name }
                { selectedOption.length === 0 && emptyMsg }
              </span>
              <span className={styles.additional}>
                { additionalInfo }
              </span>
            </span>
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
