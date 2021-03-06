import React, {Component} from 'react'
import PropTypes from 'prop-types';

class Loader extends Component {
	static propTypes = {
		width: PropTypes.any
	};

	static defaultProps = {
		width: 100
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { width, ...other } = this.props;
		const style = {
			width,
			height: width
		};

		return (
			<div className="loader" {...other}>
				<svg className="circular" viewBox="25 25 50 50" style={style}>
					<circle className="path" cx="50" cy="50" r="20" fill="none"
									strokeWidth="2" strokeMiterlimit="10"/>
				</svg>
			</div>
		);
	}
}

export default Loader