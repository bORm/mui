import React, {
	Component,
	cloneElement, createElement, isValidElement
} from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom'
import { TransitionGroup } from 'react-transition-group';
import Offset from 'util/offset.js';
import AutoPrefix from 'style/auto-prefix.js';
import Transitions from 'style/transitions.js';
import { isMounted } from 'helpers';

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
		this.ripple = null;

    this.start = ::this.start;
    this.end = ::this.end;
	}

	componentDidMount() {
		this.setState({
			size: this.size
		})
	}

	get size(){
		let ripple = this.ripple;
		return !this.ripple ? {
			min: 0,
			max: 0
		} : {
      min: Math.min(
        ripple.offsetWidth,
        ripple.offsetHeight
      ),
      max: Math.max(
        ripple.offsetWidth,
        ripple.offsetHeight
      )
    }
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
          this.start(e);
					onMouseDown && onMouseDown(e);
					this._ignoreNextMouseDown = true;
				}
			}
		, onMouseUp: (e)=>{
				this.end(e);
				onMouseUp && onMouseUp(e);
			}
		, onMouseLeave: (e)=>{
				this.end(e);
				onMouseLeave && onMouseLeave(e);
			}
		};

		const rippleProps = {
			...other,
			...eventHandlers
		};

		const { waves } = this.state;

		const ripple = !disabled ? (
			<div
				ref={ripple => (this.ripple = ripple)}
				className="ripple" key="ripple"
			>
				<TransitionGroup className="waves" key="waves">
					{waves}
				</TransitionGroup>
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
		const { waves, key } = this.state;
		const size = this.size;
		let wave = 'wave-'+ key;

		const style = this._getRippleStyle(e, isCenter, size);

		!disabled && waves.push(
			<Wave
				key={wave} size={size}
				style={isCenter ? {
					...style,
          top: '-100%',
          right: '-100%',
          bottom: '-100%',
          left: '-100%',
          margin: 'auto'
				} : style}
			/>
		);
		this.setState({
			waves: waves,
			key: key + 1
		});
	}

	end() {
		this._ignoreNextMouseDown = false;
		const { waves } = this.state;

		if ( waves.length ) {
			waves.shift();
			this.setState({
				waves
			});
		}
	}

	_getRippleStyle(e, isCenter, size) {
		let style = {};
		const el = findDOMNode(this);
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
		//const { size } = this.state;
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

	constructor(props) {
		super(props);
		this._initializeAnimation = ::this._initializeAnimation;
		this._animate = ::this._animate;
		this.mounted = false;
	}

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
		let style = findDOMNode(this).style;
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
        width: size.min,
        height: size.min,
        ...style
      }}/>
		);
	}

	_animate() {
		let style = findDOMNode(this).style;
		const transitionValue = (
			Transitions.easeOut('2s', 'opacity') + ',' +
			Transitions.easeOut('1.5s', 'transform')
		);
		AutoPrefix.set(style, 'transition', transitionValue);
		AutoPrefix.set(style, 'transform', 'scale(1)');
	}
	_initializeAnimation(callback) {
		let style = findDOMNode(this).style;
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