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
      <div className="radio-btn">
        <label className="control control-radio">
          <input type="radio" name={this.props.name} onChange={this.props.onChange} />
          <span>{this.props.label}</span>
          <div className="control-indicator"></div>
          <div className="description">{this.props.description}</div>
        </label>
      </div>
    );
  }
}

export default RadioButton