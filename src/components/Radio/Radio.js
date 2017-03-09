import React, {Component, PropTypes} from 'react'

class Radio extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  static defaultProps = {
    type: 'radio',
    onChange: function (e) {
      console.log(e);
    },
    checked: false
  };

  render() {

    const inputProps = {
      type: this.props.type,
      name: this.props.name,
      onChange: this.props.onChange,
      defaultChecked: this.props.defaultChecked,
      value: this.props.value
    };

    return (
      <div className="radio">
        <label className="radio-control">
          <input {...inputProps} />
          <span>{this.props.label}</span>
          <div className="radio-control-indicator"></div>
        </label>
      </div>
    );
  }
}

export default Radio