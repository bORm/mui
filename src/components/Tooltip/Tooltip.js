import React, {Component, PropTypes} from 'react'
/**
 * Tooltip
 */
class Tooltip extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div className="tooltip-text tooltip-bot">
        { this.props.children }
      </div>
    );
  }
}

export default Tooltip