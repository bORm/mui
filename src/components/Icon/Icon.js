import React, {Component, PropTypes} from 'react'

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