import React, {Component, PropTypes} from 'react'

class RadioButton extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div>
        <div className="radio-btn">
          <label className="control control--radio">
            <input type="radio" />
            <span>Some text</span>
            <div className="control__indicator"></div>
            <div className="description"></div>
          </label>
        </div>
      </div>
    );
  }
}

export default RadioButton