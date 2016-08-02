import React, {Component, PropTypes, cloneElement} from 'react'
import ReactDOM from 'react-dom';

import Button, { ButtonIcon } from 'components/Button/Button'

import Transitions from 'style/transitions.js';
import requestAnimationFrame from 'style/requestAnimFrame.js';
import CssEvent from 'util/css-event.js';
import classNames from 'helpers/classNames'

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
			isOpen: props.isOpen
		};
		this._ignoreNextClick = false;
	}

	componentDidUpdate(prevProps) {
		const { isOpen } = this.props;
		if (isOpen !== prevProps.isOpen) {
			this.handleMenuToggle();
		}
	}

	render() {

		const { control, onChange, children } = this.props;
		const { isOpen } = this.state;

		return (
			<div className={classNames('drop down', {
				isOpen
			})}>
				{ cloneElement(control, {
					onMouseDown: e=>{
						this.setState({
							isOpen: !isOpen
						}, ::this._renderVisibility)
					}
				}) }
				<div className="drop-content" ref={'content'}>
					{ cloneElement(children, {
						ref: 'menu',
						onChange: (e, value)=>{
							( isOpen && onChange ) && onChange(e, value)
						}
					}) }
				</div>
			</div>
		);
	}

	handleMenuToggle() {
		const { isOpen } = this.state;
	}

	_renderVisibility() {
		if ( !this._ignoreNextClick ) {
			if (this.state.isOpen) this._expandHideableMenu();
			else this._collapseHideableMenu();
		}
	}

	_expandHideableMenu() {
		let { _ignoreNextClick } = this;
		_ignoreNextClick = true;
		let el = ReactDOM.findDOMNode(this.refs.content);
		let container = ReactDOM.findDOMNode(this.refs.menu);
		let padding = 8;
		let height = this._getHiddenMenuHeight(el, padding);

		console.log(this._getHiddenMenuOffset(el));

		//Add transition
		if (!el.style.transition) {
			el.style.transition = Transitions.easeOut();
		}

		_nextAnimationFrame(() => {

			container.style.overflow = 'hidden';

			// Yeild to the DOM, then apply height and padding. This makes the transition smoother.
			el.style.paddingTop = padding + 'px';
			el.style.paddingBottom = padding + 'px';
			el.style.height = height + 'px';
			el.style.opacity = 1;

			//Set the overflow to visible after the animation is done so
			//that other nested menus can be shown
			CssEvent.onTransitionEnd(el, () => {
				_ignoreNextClick = false;
				//Make sure the menu is open before setting the overflow.
				//This is to accout for fast clicks
				if (this.props.visible) container.style.overflow = 'visible';
				el.style.transition = null;
				el.focus();
			});
		});
	}

	_getHiddenMenuHeight(el, padding) {
		//Add padding to the offset height, because it is not yet set in the style.
		let height = padding * 2;

		//Hide the element and allow the browser to automatically resize it.
		el.style.visibility = 'hidden';
		el.style.height = 'auto';

		//Determine the height of the menu.
		height += el.offsetHeight;

		//Unhide the menu with the height set back to zero.
		el.style.height = '0px';
		el.style.visibility = 'visible';

		return height;
	}

	_getHiddenMenuOffset(el){
		return el.getBoundingClientRect();
	}

	componentDidMount(){
		let el = ReactDOM.findDOMNode(this.refs.content);

		console.log(this._getHiddenMenuOffset(el));

	}

	_collapseHideableMenu() {
		let { _ignoreNextClick } = this;
		_ignoreNextClick = true;
		let el = ReactDOM.findDOMNode(this.refs.content);
		let container = ReactDOM.findDOMNode(this.refs.menu);
		let originalOpacity = el.style.opacity;

		//Add transition
		if (!el.style.transition && originalOpacity !== '') {
			el.style.transition = Transitions.easeOut();
		}

		_nextAnimationFrame(function () {
			//Set the overflow to hidden so that animation works properly
			container.style.overflow = 'hidden';

			//Close the menu
			el.style.opacity = 0;
			el.style.height = '0px';
			el.style.paddingTop = '0px';
			el.style.paddingBottom = '0px';

			let end = () => {
				_ignoreNextClick = false;
				el.style.transition = null;
			};

			if (originalOpacity === '') end();
			else CssEvent.onTransitionEnd(el, end);
		});
	}

}

function _nextAnimationFrame(func) {
	if (window.requestAnimationFrame) {
		return requestAnimationFrame(func);
	}
	func()
}

export default DropDown