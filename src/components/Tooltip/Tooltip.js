import React, {Component, PropTypes} from 'react'

class Tooltip extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div className="tooltip active">
        Hello i'm tooltip
      </div>
    );
  }
}

export default Tooltip