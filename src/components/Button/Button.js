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

		primary: PropTypes.bool,
		accent: PropTypes.bool,

		large: PropTypes.bool,
		medium: PropTypes.bool,
		small: PropTypes.bool,
		mini: PropTypes.bool,

		text: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.string
		]),
		icon: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.string
		]),

		onClick: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.func
		])
	};

	static defaultProps = {
		type: 'button',
		flat: true,
		raised: false,

		primary: false,
		accent: false,

		large: false,
		medium: true,
		small: false,
		mini: false,

		text: false,
		icon: false,

		onClick: false
	};

	render() {
		const {
			type, children,
			flat, raised,
			primary, accent,
			large, medium, small, mini,
			text, icon, className,
			...other
		} = this.props;

		console.log(this.props);
		console.log(...other);

		const button = (
			<Paper component={'button'} type={type} className={classNames('button', {
				flat: !raised && flat,
				raised,
				primary,
				accent,
				large,
				medium: !large || !small || !mini,
				small,
				mini,
				icon: !!(icon)
			}, className)} />
		);

		return (
			<Ripple {...other} container={ button } isCenter={icon ? true : false}>
				{ children }
			</Ripple>
		);

		//return <button type="submit">{ children }</button>
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
			</span>
		);
	}
}

export default Button
export { ButtonIcon };
export { ButtonText };