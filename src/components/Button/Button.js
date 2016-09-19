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
    component: PropTypes.oneOfType([
      PropTypes.string, PropTypes.element
    ]),
		active: PropTypes.bool,
		disabled: PropTypes.bool,

		flat: PropTypes.bool,
		raise: PropTypes.bool,
		link: PropTypes.bool,

		primary: PropTypes.bool,
		accent: PropTypes.bool,
    white: PropTypes.bool,

		large: PropTypes.bool,
		medium: PropTypes.bool,
		small: PropTypes.bool,
		mini: PropTypes.bool,

		text: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.string, PropTypes.number
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
    component: 'button',
		active: false,
		disabled: false,
		flat: true,
		raised: false,
		link: false,

		primary: false,
		accent: false,
    white: false,

		large: false,
		medium: true,
		small: false,
		mini: false,

		text: false,
		icon: false,

		//onClick: false
	};

	render() {
		const {
			type, component, active, disabled, children,
			flat, raised, link,
			primary, accent, white,
			large, medium, small, mini,
			text, icon, className,
			...other
		} = this.props;

		const button = (
			<Paper component={component} type={type} disabled={disabled} className={classNames('button', {
				active, disabled,
				flat: !raised && !link && flat,
				raised,
				link,
				primary,
				accent,
        white,
				large,
				medium: !large || !small || !mini,
				small,
				mini,
				//icon: !!(icon)
			}, className)} />
		);

		let inner = [];

		icon && inner.push(<ButtonIcon key="icon" name={icon}/>);
		text && inner.push(<ButtonText key="text" text={text}/>);

		if ( children ) {
			inner = children;
			if ( typeof children === 'string' ) {
				inner = <ButtonText text={children}/>;
			}
		}
		/*const inner = text ? (
			<ButtonText text={text}/>
		) : typeof children === 'string'
			? <ButtonText text={children}/>
			: children;*/

		return (
			<Ripple {...other} container={ button } isCenter={!!(icon)} disabled={disabled || !!(link)}>
				<div className="button-inner">
					{inner}
				</div>
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
			<span className="button-icon">
				<Icon>{ name || children }</Icon>
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
			PropTypes.bool, PropTypes.string, PropTypes.number
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