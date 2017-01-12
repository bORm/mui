import React, {
	Component, PropTypes,
	cloneElement, createElement, isValidElement
} from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-transition-group';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import Offset from 'util/offset.js';
import AutoPrefix from 'style/auto-prefix.js';
import Transitions from 'style/transitions.js';
import { isMounted } from 'helpers/index'

class Ripple extends Component {
	static propTypes = {
		container: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element,
		]),
		isCenter: PropTypes.bool,
		disabled: PropTypes.bool,
		onMouseDown: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.func
		]),
		onMouseUp: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.func
		]),
		onMouseLeave: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.func
		])
	};

	static defaultProps = {
		container: 'div',
		isCenter: false,
		disabled: false,
		onMouseDown: false,
		onMouseUp: false,
		onMouseLeave: false
	};

	constructor(props) {
		super(props);
		//this.shouldComponentUpdate = ::PureRenderMixin.shouldComponentUpdate;
		this.state = {
			key: 0,
			waves: [],
			size: {
				min: 0,
				max: 0
			},
			offset: {}
		};
		this._ignoreNextMouseDown = false;
	}

	componentDidMount() {
		let DOMNode = ReactDOM.findDOMNode(this);
		this.setState({
			size : {
				min: Math.min(
					DOMNode.offsetWidth,
					DOMNode.offsetHeight
				),
				max: Math.max(
					DOMNode.offsetWidth,
					DOMNode.offsetHeight
				)
			},
			offset: Offset(DOMNode)
		});
	}

	render() {
		const {
			container, isCenter, disabled,
			onMouseDown, onMouseUp, onMouseLeave,
			children, ...other
		} = this.props;

		const eventHandlers = {
			onMouseDown: (e)=>{
				if (e.button === 0 && !this._ignoreNextMouseDown) {
					::this.start(e);
					onMouseDown && onMouseDown(e);
					this._ignoreNextMouseDown = true;
				}
			}
			, onMouseUp: (e)=>{
				::this.end(e);
				onMouseUp && onMouseUp(e);
			}
			, onMouseLeave: (e)=>{
				::this.end(e);
				onMouseLeave && onMouseLeave(e);
			}
		};

		const rippleProps = {
			...other,
			...eventHandlers
		};

		const { waves } = this.state;

		const ripple = !disabled ? (
			<div className="ripple" key="ripple">
				<ReactCSSTransitionGroup className="waves" key="waves">
					{waves}
				</ReactCSSTransitionGroup>
			</div>
		) : null;

		const grandchildren = [children, ripple];

		return isValidElement(container)
			? cloneElement(container, rippleProps, grandchildren)
			: createElement(container, rippleProps, grandchildren)
		;
	}

	start(e) {
		const { isCenter, disabled } = this.props;
		const { waves, key, size } = this.state;
		let wave = 'wave-'+ key;
		//debugger;

		const style = this._getRippleStyle(e, isCenter);

		!disabled && waves.push(
			<Wave ref="RippleWave" key={wave} size={size}
			      style={isCenter ? {
				      ...style,
				      ...{
					      top: '-100%',
					      right: '-100%',
					      bottom: '-100%',
					      left: '-100%',
					      margin: 'auto'
				      }
			      } : style} />
		);
		this.setState({
			waves: waves,
			key: key + 1
		});
	}

	end(e) {
		this._ignoreNextMouseDown = false;
		const { waves } = this.state;

		if ( waves.length ) {
			waves.shift();
			this.setState({
				waves
			});
		}
	}

	_getRippleStyle(e, isCenter) {
		let style = {};
		const el = ReactDOM.findDOMNode(this);
		const elHeight = el.offsetHeight;
		const elWidth = el.offsetWidth;
		const offset = Offset(el);
		const isTouchEvent = e.touches && e.touches.length;
		const pageX = isTouchEvent ? e.touches[0].pageX : e.pageX;
		const pageY = isTouchEvent ? e.touches[0].pageY : e.pageY;
		const pointerX = pageX - offset.left;
		const pointerY = pageY - offset.top;
		const topLeftDiag = Ripple._calcDiag(pointerX, pointerY);
		const topRightDiag = Ripple._calcDiag(elWidth - pointerX, pointerY);
		const botRightDiag = Ripple._calcDiag(elWidth - pointerX, elHeight - pointerY);
		const botLeftDiag = Ripple._calcDiag(pointerX, elHeight - pointerY);
		const rippleRadius = Math.max(
			topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
		);
		const { size } = this.state;
		const rippleSize = isCenter ? size.max : rippleRadius * 2;
		const left = pointerX - rippleRadius;
		const top = pointerY - rippleRadius;

		style.height = rippleSize + 'px';
		style.width = rippleSize + 'px';

		style.top = top + 'px';
		style.left = left + 'px';
		return style;
	}

	static _calcDiag(a, b) {
		return Math.sqrt((a * a) + (b * b));
	}

}

class Wave extends Component {

	static propTypes = {
		size: PropTypes.object.isRequired,
		style: PropTypes.object.isRequired
	};

	componentWillAppear(callback) {
		this._initializeAnimation(callback);
	}
	componentWillEnter(callback) {
		this._initializeAnimation(callback);
	}
	componentDidAppear() {
		this._animate();
	}
	componentDidEnter() {
		this._animate();
	}
	componentWillLeave(callback) {
		let style = ReactDOM.findDOMNode(this).style;
		style.opacity = 0;

		let timeOut = null;

		timeOut = setTimeout(() => {
			if (isMounted(this)) callback();
			window.clearTimeout(timeOut);
		}, 1000);
	}

	render() {

		const { size, style } = this.props;

		return (
			<div className="wave" style={{
				...{
					//backgroundColor: 'rgb(0,0,0)'
				width: size.min
				, height: size.min
				},
				...style
			}}></div>
		);
	}

	_animate() {
		let style = ReactDOM.findDOMNode(this).style;
		const transitionValue = (
			Transitions.easeOut('2s', 'opacity') + ',' +
			Transitions.easeOut('1.5s', 'transform')
		);
		AutoPrefix.set(style, 'transition', transitionValue);
		AutoPrefix.set(style, 'transform', 'scale(1)');
	}
	_initializeAnimation(callback) {
		let style = ReactDOM.findDOMNode(this).style;
		style.opacity = .26;
		AutoPrefix.set(style, 'transform', 'scale(0)');
		let timeOut = null;
		timeOut = setTimeout(() => {
			if (isMounted(this)) callback();
			window.clearTimeout(timeOut);
		}, 0);
	}

}

export default Ripple