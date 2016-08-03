import React, {Component, PropTypes, cloneElement} from 'react'
import ReactDOM from 'react-dom';

import Button, { ButtonIcon } from 'components/Button/Button'
import classNames from 'helpers/classNames'

import Debounce from 'lodash.debounce'
import onClickOutside  from 'react-onclickoutside'

class DropDown extends Component {

	static propTypes = {
		control: PropTypes.element,
		isOpen: PropTypes.bool,
		onChange: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.func
		])
	};

	static defaultProps = {
		control: (
			<Button icon={true}>
				<ButtonIcon>more_vert</ButtonIcon>
			</Button>
		),
		isOpen: false,
		onChange: false
	};

	constructor(props) {
		super(props);
		this.state = {
			isOpen: props.isOpen,
			rect: {},
			maxHeight: 0,
			placement: 'top-left'
		};

		this.control = null;
		this.handleClickOutside = ::this.handleClickOutside
	}

	render() {

		const { control, onChange, children } = this.props;
		const { isOpen, maxHeight, placement } = this.state;

		return (
			<div className={classNames('drop', {
				isOpen
			})}>
				{ cloneElement(control, {
					ref: 'control',
					onMouseDown: e=>{
						this.setState({
							isOpen: !isOpen
						}, ::this.handleMenuToggle)
					}
				}) }
				<div ref="container" className={classNames('drop-container', placement)}>
					{ cloneElement(children, {
						ref: 'menu',
						className: 'drop-menu',
						style: {maxHeight},
						onChange: (e, value)=>{
							( isOpen && onChange ) && onChange(e, value);
							let timeOut = null;

							timeOut = setTimeout(() => {
								this.setState({isOpen: false});
								window.clearTimeout(timeOut);
							}, 250);
						}
					}) }
				</div>
			</div>
		);
	}

	handleMenuToggle() {
		const { isOpen } = this.state;
		return isOpen
			? this.handleMenuExpand()
			: this.handleMenuCollapse();
	}

	handleClickOutside(event) {
		this.setState({isOpen: false});
	}

	handleMenuExpand(){

	}

	handleMenuCollapse(){

	}

	componentDidUpdate(prevProps) {
		const { isOpen } = this.props;
		if (isOpen !== prevProps.isOpen) {
			this.handleMenuToggle();
		}
	}

	componentDidMount(){
		this.control = ReactDOM.findDOMNode(this.refs.control);

		const debounceFn = Debounce(::this.getHiddenMenuOffset, 250);

		this.getHiddenMenuOffset();

		window.addEventListener('resize', debounceFn);
	}



	getHiddenMenuOffset(){
		const rect = this.control.getBoundingClientRect();

		var cords = {
			top: rect.top - window.pageYOffset,
			left: rect.left - window.pageXOffset,
			bottom: document.documentElement.clientHeight - (rect.top - window.pageYOffset),
			right: document.documentElement.clientWidth - (rect.left - window.pageXOffset)
		};

		var maxHeight = cords.bottom, placement;

		// Decide if place the dropdown below or above the input
		if (maxHeight < 200 && cords.top > cords.bottom) {
			maxHeight = cords.top;
			placement = "top-left";
		} else {
			placement = "bottom-left";
		}

		// alert(window.pageYOffset);
		// alert(document.documentElement.clientHeight);
		// alert(rect.top);
		// alert(cords.top);

		this.setState({rect, maxHeight, placement});
	}

}

export default onClickOutside(DropDown)