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
    return this.props.children;
  }
}

export default Tab