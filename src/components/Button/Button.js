import React, {Component, PropTypes} from 'react'
import Ripple from 'components/Ripple'
import Paper from 'components/Paper'
import Icon from 'components/Icon/Icon'
import classNames from 'helpers/classNames'
/**
 * Button
 */
class Button extends Component {
	static propTypes = {
		type: PropTypes.string,
		flat: PropTypes.bool,
		raise: PropTypes.bool,
		icon: PropTypes.bool,

		onClick: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.func
		])
	};

	static defaultProps = {
		type: 'button',
		flat: true,
		raised: false,
		icon: false,

		onClick: false
	};

	render() {
		const {
			type, children,
			flat, raised, icon,
			...other
		} = this.props;

		const button = (
			<button type={type} className={classNames('button', {
				flat: !raised && flat,
				raised: raised,
				icon: icon
			})} />
		);

		return (
			<Ripple {...other} container={ button } isCenter={icon ? true : false}>
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
			<div className="button-icon">
				<Icon>{ name || children }</Icon>
			</div>
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
export { ButtonIcon };
export { ButtonText };