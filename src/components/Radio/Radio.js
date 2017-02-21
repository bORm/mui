import React, {Component, PropTypes} from 'react'

class RadioButton extends Component {
  static propTypes = {};

  static defaultProps = {
    onChange: function (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="radio">
        <label className="radio-control">
          <input type="radio" name={this.props.name} onChange={this.props.onChange} />
          <span>{this.props.label}</span>
          <div className="radio-control-indicator"></div>
        </label>
      </div>
    );
  }
}

export default RadioButton