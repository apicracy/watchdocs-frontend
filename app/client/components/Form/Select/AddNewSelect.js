import React from 'react';
import styles from './Select.css';
import CustomIcon from 'components/Icon/CustomIcon';
import Button from 'components/Button/Button';

class Select extends React.Component {

  static propTypes = {
    options: React.PropTypes.array,
    onSelect: React.PropTypes.func,
    variants: React.PropTypes.array,
    emptyMsg: React.PropTypes.string,
    customIcon: React.PropTypes.object,
  }

  static defaultProps = {
    options: [],
    onSelect: () => {},
    variants: [],
    emptyMsg: 'Please choose',
    customIcon: <CustomIcon ext="svg" color="white" size="sm" name="arrow-down" />,
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
    const { options, variants, emptyMsg, customIcon } = this.props;
    const variantStyles = variants.map(v => styles[v]);

    const selectStyle = [
      styles.selectWrapper,
      ...variantStyles,
      this.state.isOpen && styles.open,
    ].join(' ');
    /* eslint jsx-a11y/no-static-element-interactions: 0 */
    return (
      <div className={selectStyle} tabIndex="0" onBlur={this.onOutsideClick}>
        <div className={styles.selectedOption}>
          <Button
            onClick={this.toggleOpen}
            icon={customIcon}
          >
            { emptyMsg }
          </Button>
        </div>
        { this.state.isOpen && (
          <div
            className={styles.optionList}
            onClick={() => { this.setState({ isOpen: false }); }}
          >
            { options }
          </div>
        )}
      </div>
    );
  }
}

export default Select;
