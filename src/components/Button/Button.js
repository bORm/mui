import React, {Component} from 'react'
import PropTypes from 'prop-types';
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

		block: PropTypes.bool,
		flat: PropTypes.bool,
		raised: PropTypes.bool,
		link: PropTypes.bool,

		primary: PropTypes.bool,
		accent: PropTypes.bool,
    white: PropTypes.bool,

		large: PropTypes.bool,
		medium: PropTypes.bool,
		small: PropTypes.bool,
		mini: PropTypes.bool,

		text: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.string, PropTypes.number, PropTypes.element
		]),
		icon: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.string, PropTypes.element, PropTypes.array
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

		block: false,
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
			block, flat, raised, link,
			primary, accent, white,
			large, medium, small, mini,
			text, icon, className,
			...other
		} = this.props;

		const button = (
			<Paper component={component} type={type} disabled={disabled} className={classNames('button', {
				active, disabled, block,
				flat: !raised && !link && flat,
				raised,
				link,
				primary,
				accent,
        white,
				large,
				medium: medium && [large, small, mini].indexOf(true) === -1,
				small,
				mini,
				//icon: !!(icon)
			}, className)} />
		);

		let inner = [];

    text && inner.push(<ButtonText key="text" text={text}/>);
		icon && inner.push(<ButtonIcon key="icon" name={icon}/>);

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
			<Ripple {...other} container={ button } disabled={disabled || !!(link)}>
				<div className="button-inner">
					{text && <ButtonText key="text" text={text}/>}
					&nbsp;
					{icon && <ButtonIcon key="icon" name={icon}/>}
					{(()=>{
						let inner = null;
						if ( children ) {
							inner = children;
							if ( typeof children === 'string' ) {
								inner = <ButtonText text={children}/>;
							}
							return inner;
						}
					})()}
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
			PropTypes.bool, PropTypes.string, PropTypes.element, PropTypes.array
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
			PropTypes.bool, PropTypes.string, PropTypes.number, PropTypes.element
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
