import React, {Component, PropTypes} from 'react'

class RadioButton extends Component {
  static propTypes = {};

  static defaultProps = {
    checked: false,
    onChange: function (e) {

    }
  };

  render() {
    return (
      <div className="radio">
        <label className="radio-control">
          <input type="radio" name={this.props.name} onChange={this.props.onChange} checked={this.props.checked} />
          <span>{this.props.label}</span>
          <div className="radio-control-indicator"></div>
        </label>
      </div>
    );
  }
}

export default RadioButton