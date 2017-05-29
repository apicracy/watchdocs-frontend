import React from 'react';
import styles from './RequiredSwitch.css';
import Switch from 'rc-switch';

class RequiredSwitch extends React.Component {
  static propTypes = {
    isReq: React.PropTypes.bool,
    isOpt: React.PropTypes.bool,
    nodeId: React.PropTypes.number,
    onChange: React.PropTypes.func,
  };

  onChange = () => {
    const { nodeId, onChange } = this.props;
    setTimeout(() => onChange(nodeId), 200);
  }

  render() {
    const {
      isOpt,
      isReq,
    } = this.props;

    return (
      <div className={styles.lineContainer}>
        <div className={styles.oneLine}>
          <div className={styles.attribute}>
            {(isOpt || isReq) &&
              <Switch
                checkedChildren={'req'}
                unCheckedChildren={'opt'}
                defaultChecked={isReq}
                onChange={this.onChange}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default RequiredSwitch;
