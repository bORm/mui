import React, {Component, PropTypes} from 'react'
import classNames from 'helpers/classNames'
/**
 * Checkbox
 */
class Checkbox extends Component {
  static propTypes = {
    active: PropTypes.bool,  
    disabled: PropTypes.bool
  };

  static defaultProps = {
    active: false,
    filledIn: false,
    disabled: false
  };

  render() {
    const {active, filledIn, disabled} = this.props;
    return (
      <label className={classNames({
          'disabled': disabled
      })}>
        <input type="checkbox" className={classNames({
          'filledIn' : filledIn,
          'switch-active': active
        })} />
        <span />
      </label>
    );
  }
}

export default Checkbox