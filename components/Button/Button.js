import React, {Component, PropTypes} from 'react'
import Ripple from '../Ripple'
/**
 * Button
 */
class Button extends Component {
	static propTypes = {
		type: PropTypes.string
	};

	static defaultProps = {
		type: 'button'
	};

	render() {
		const {
			type, children
		} = this.props;
		return (
			<Ripple container={<button type={type} className="button"/> }>
				{ children }
			</Ripple>
		);
	}
}

/**
 * ButtonIcon
 */
class ButtonIcon extends Component {
	static propTypes = {
		name: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.string
		])
	};

	static defaultProps = {
		name: false
	};

	render() {
		const { children, name } = this.props;
		return (
			<span className="button-icon">
				{ name || children }
			</span>
		);
	}
}

/**
 * ButtonText
 */
class ButtonText extends Component {
	static propTypes = {
		text: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.string
		])
	};

	static defaultProps = {
		text: false
	};

	render() {
		const { children, text } = this.props;
		return (
			<span className="button-text">
				{ text || children }
				<span>

				</span>
			</span>
		);
	}
}

export default Button
export { Button };
export { ButtonIcon };
export { ButtonText };