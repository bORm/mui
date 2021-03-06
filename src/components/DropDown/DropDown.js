import React, {
	Component,
	cloneElement, isValidElement
} from 'react'
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import Button, { ButtonIcon } from 'components/Button/Button'
import Menu, { Item } from './Menu'
import classNames from 'helpers/classNames'
import isMounted from 'helpers/isMounted'

import Debounce from 'lodash.debounce'
import onClickOutside  from 'react-onclickoutside'

class DropDown extends Component {

	static propTypes = {
		control: PropTypes.element,
		isOpen: PropTypes.bool,
    autoClose: PropTypes.bool,
		handleClickOutside: PropTypes.bool,
    toggle: PropTypes.bool,
		onChange: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.func
		])
	};

	static defaultProps = {
		control: (
			<Button icon={'more_vert'} />
		),
		isOpen: false,
		autoClose: true,
		handleClickOutside: true,
    toggle: true,
		onChange: false,
		//outsideClickIgnoreClass: 'react-datepicker-ignore-onclickoutside'
	};

	constructor(props) {
		super(props);
		this.state = {
			isOpen: props.isOpen || false,
			rect: {},
			maxHeight: 0,
			placement: 'top-left'
		};
    
		this.control = null;
		this.handleClickOutside = ::this.handleClickOutside;
		this.debounceFn = Debounce(::this.getHiddenMenuOffset, 250);
	}

	componentWillReceiveProps(props){
		if ( this.state.isOpen !== props.isOpen ) {
			this.setState({
				isOpen: props.isOpen
			}, ::this.handleMenuToggle);
		}
	}

	render() {

		const { control, onChange, autoClose, children, className, toggle, ...other } = this.props;
		const { isOpen, maxHeight, placement } = this.state;

		return (
			<div className={classNames('drop', className, {
				isOpen
			})}>
				{ cloneElement(control, {
					ref: 'control',
					className: 'drop-control',
					onMouseDown: e=>{
            this.setState({
							isOpen: toggle ? !isOpen : true
						}, ::this.handleMenuToggle);
					}
				}) }
				<div ref="container" className={classNames('drop-container', placement)}>
					<Menu ref="menu" className="drop-menu" style={{maxHeight}} onChange={(e, value)=>{
						( isOpen && onChange ) && onChange(e, value);
						let timeOut = null;
						timeOut = setTimeout(() => {
							if ( isMounted(this) ) {
								autoClose && this.setState({isOpen: false});
							}
							clearTimeout(timeOut);
						}, 250)
					}}>
						{ children }
					</Menu>
				</div>
			</div>
		);
	}

	handleMenuToggle(e) {
		const { isOpen } = this.state;
		return isOpen
			? this.handleMenuExpand(e)
			: this.handleMenuCollapse(e);
	}

	handleClickOutside(e) {
		const { isOpen } = this.state;
		if ( isOpen && this.props.handleClickOutside ) {
			this.setState({isOpen: !isOpen});
		}
	}

	handleMenuExpand(){
		this.getHiddenMenuOffset();
	}

	handleMenuCollapse(){

	}

	componentDidMount(){
		this.control = findDOMNode(this.refs.control);
		this.getHiddenMenuOffset();
		window.addEventListener('resize', this.debounceFn);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.debounceFn);
	}

	componentDidUpdate(prevProps) {
		const { isOpen } = this.props;
		if (isOpen !== prevProps.isOpen) {
			this.handleMenuToggle();
		}
	}

	getHiddenMenuOffset(){
		const rect = this.control.getBoundingClientRect();

		const cords = {
			top: rect.top,
			left: rect.left,
			bottom: document.documentElement.clientHeight - (rect.top),
			right: document.documentElement.clientWidth - (rect.left)
		};

		let maxHeight = cords.bottom
			, maxWidth = cords.left
			, placement;

		// Decide if place the dropdown below or above the input
		if (maxHeight < findDOMNode(this.refs.menu).clientHeight + 20 && cords.top > cords.bottom) {
			maxHeight = cords.top;
			placement = "top-";
		} else {
			placement = "bottom-";
		}

		// Decide if place the dropdown below or above the input
		if (maxWidth < findDOMNode(this.refs.menu).clientWidth + 20 && cords.left > cords.right) {
			placement += "left";
		} else {
			placement += "right";
		}

		this.setState({rect, maxHeight, placement});
	}

}

export default onClickOutside(DropDown, 'react-datepicker__tether-element')
export { Item }