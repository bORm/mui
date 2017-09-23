import React, {Component} from 'react'
import PropTypes from 'prop-types';

class Icon extends Component {
	static propTypes = {};

	static defaultProps = {};

	render() {
		return (
			<span className="material-icon">
				{ this.props.children }
			</span>
		);
	}
}

export default Icon