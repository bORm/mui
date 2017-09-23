import React, {Component} from 'react'
import PropTypes from 'prop-types';
/**
 * Tooltip
 */
class Tooltip extends Component {
  static propTypes = {
    
  };

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