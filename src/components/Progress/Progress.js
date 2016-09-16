import React, {Component, PropTypes} from 'react';

class Progress extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div className="progress">
        <svg className="bar bar-dotted">
          <line className="line" x1="2" x2="10000" y1="2" y2="2" />
        </svg>
        <span className="bar bar-buffer"/>
        <span className="bar bar-progress"/>
      </div>
    )
  }
}

export default Progress;