import React, {Component, PropTypes, Children, cloneElement} from 'react'
import Paper from 'components/Paper'
import Ripple from 'components/Ripple'
import classNames from 'helpers/classNames'

class Menu extends Component {
	static propTypes = {
		onChange: PropTypes.oneOfType([
			PropTypes.func, PropTypes.bool
		])
	};

	static defaultProps = {
		onChange: false
	};

	render() {
		const { onChange, className, children, ...other } = this.props;
		const items = Children.map(children, (child)=>{
			return cloneElement(child, {
				onClick: (e, o)=>{
					onChange && onChange(e, o)
				}
			})
		});
		return (
			<Paper {...other}>
				<div className={classNames("menu", className)}>
					{ items }
				</div>
			</Paper>
		);
	}
}

class Item extends Component {
	static propTypes = {
		value: PropTypes.oneOfType([
			PropTypes.string, PropTypes.number, PropTypes.bool
		]),
		text: PropTypes.string,
		onClick: PropTypes.oneOfType([
			PropTypes.func, PropTypes.bool
		])
	};

	static defaultProps = {
		value: false,
		text: '',
		onClick: false
	};

	render() {

		const { text, value, children, onClick } = this.props;

		return (
			<Ripple container={
				<div className="menu-item" onClick={e=>{onClick && onClick(e, {value, text})}}/>
			}>
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
			<div className="menu-divider"/>
		)
	}
}

export default Menu
export { Item }
export { Divider }