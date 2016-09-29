import React, {Component, PropTypes, Children, cloneElement} from 'react'
import { findDOMNode } from 'react-dom';
import Paper from 'components/Paper'
import Ripple from 'components/Ripple'
import classNames from 'helpers/classNames'
import onClickOutside  from 'react-onclickoutside'

class Menu extends Component {
	static propTypes = {
		onChange: PropTypes.oneOfType([
			PropTypes.func, PropTypes.bool
		]),
		control: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.element
		]),
		mountTo: PropTypes.any,
		isOpen: PropTypes.bool,
		handleClickOutside: PropTypes.bool
	};

	static defaultProps = {
		onChange: false,
		control: false,
		isOpen: false,
		handleClickOutside: true
	};

	constructor(props) {
		super(props);
		this.state = {
			isOpen: props.isOpen
		};
		this.handleClickOutside = ::this.handleClickOutside
	}

	handleClickOutside(e) {
		const { handleClickOutside } = this.props;
		const { isOpen } = this.state;
		if ( isOpen && handleClickOutside ) {
			this.setState({isOpen: !isOpen});
		}
	}

	handleToggle(e){

		const { target } = e;

		if ( target === findDOMNode(this.refs.control) ) {
			this.setState({
				isOpen: true
			})
		}

		if ( target.parentElement.className === "list-item" ) {
			this.setState({
				isOpen: false
			})
		}

	}

	handleControlClick(e) {
		const  { isOpen } = this.state;
		this.setState({
			isOpen: !isOpen
		})
	}

	render() {
		const {
			control, className, isOpen,
			disableOnClickOutside, enableOnClickOutside, handleClickOutside,
			zDepth, ...other
		} = this.props;

		return (
			<div ref="menu" className={classNames('menu', className, {
				isOpen: this.state.isOpen || isOpen
			})} {...other} onClick={::this.handleToggle}>
				{ control && cloneElement(control, {
					ref: 'control',
					onClick: ::this.handleControlClick
				}) }
				<Paper zDepth={zDepth} className="menu-container">
					{ this.props.children }
				</Paper>
			</div>
		);
	}

	/*render() {
		const { onChange, children, ...other } = this.props;
		return (
			<Paper {...other}>
				<div className={classNames("menu")}>
					{ Children.map(children, (child)=>{
						return cloneElement(child, {
							onClick: (e, o)=>{
								const { onClick } = child.props;
								onClick && onClick(e);
								onChange && onChange(e, o);
							}
						})
					}) }
				</div>
			</Paper>
		);
	}*/
}

class Item extends Component {
	static propTypes = {
		value: PropTypes.oneOfType([
			PropTypes.string, PropTypes.number, PropTypes.bool
		]),
		text: PropTypes.string,
		onClick: PropTypes.oneOfType([
			PropTypes.func, PropTypes.bool
		]),
		ripple: PropTypes.object
	};

	static defaultProps = {
		value: false,
		text: '',
		onClick: false,
		ripple: {
			isCenter: false
		}
	};

	render() {

		const {
			text, value,
			className,
			children, onClick, 
			ripple, ...other
		} = this.props;

		return (
			<Ripple isCenter={ripple.isCenter} container={(
				<div className={classNames('menu-item', className)}
						 onClick={e=>{onClick && onClick(e, {value, text})}}/>
			)} {...other}>
				<div className="menu-item-inner">
					{ children ? children : text }
				</div>
			</Ripple>
		);
	}
}

class Divider extends Component {
	render() {
		return(
			<div className="menu-divider">
				{ this.props.children }
			</div>
		)
	}
}

export default onClickOutside(Menu)
export { Item }
export { Divider }