import React, {Component, PropTypes} from 'react'

class Switch extends Component {
  static propTypes = {
    name: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.string
    ]),
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.string
    ]),
    id: PropTypes.string
  };

  static defaultProps = {
    name: false,
    checked: false,
    disabled: false,
    label: false
  };

  constructor(props){
    super(props);
    const {checked, disabled} = props;
    this.state = {checked, disabled};
  }

  render() {
    const {name, label, onChange, id} = this.props;
    const {checked, disabled} = this.state;

    return (
      <div className="switch">
        <div className="switch-text">{label}</div>
        <input id={id} type="checkbox"/>
        <label htmlFor={id}></label>
        <div className="switch-line"></div>
      </div>
    );
  }
}

export default Switch