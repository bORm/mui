import React, {Component, PropTypes} from 'react'

class Tab extends Component {
  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.string, PropTypes.element
    ])
  };

  static defaultProps = {
    label: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

export default Tab