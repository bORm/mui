import React, {Component} from 'react'
import PropTypes from 'prop-types';

class Tab extends Component {
  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.string, PropTypes.element
    ]),
    disabled: PropTypes.bool
  };

  static defaultProps = {
    label: false,
		disabled: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { ...other } = this.props;
    return (
      <div {...other}>
        { this.props.children }
      </div>
    );
  }
}

export default Tab