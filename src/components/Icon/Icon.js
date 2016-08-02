import React, {Component, PropTypes} from 'react'

class Icon extends Component {
	static propTypes = {};

	static defaultProps = {};

	render() {
		return (
			<div className="material-icon">
				{ this.props.children }
			</div>
		);
	}
}

export default Icon