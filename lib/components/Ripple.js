'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _offset = require('util/offset.js');

var _offset2 = _interopRequireDefault(_offset);

var _autoPrefix = require('style/auto-prefix.js');

var _autoPrefix2 = _interopRequireDefault(_autoPrefix);

var _transitions = require('style/transitions.js');

var _transitions2 = _interopRequireDefault(_transitions);

var _index = require('helpers/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ripple = function (_Component) {
	(0, _inherits3.default)(Ripple, _Component);

	function Ripple(props) {
		(0, _classCallCheck3.default)(this, Ripple);

		//this.shouldComponentUpdate = ::PureRenderMixin.shouldComponentUpdate;
		var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Ripple).call(this, props));

		_this.state = {
			key: 0,
			waves: [],
			size: {
				min: 0,
				max: 0
			},
			offset: {}
		};
		_this._ignoreNextMouseDown = false;
		_this.ripple = null;
		return _this;
	}

	(0, _createClass3.default)(Ripple, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setState({
				size: this.size
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var container = _props.container;
			var isCenter = _props.isCenter;
			var disabled = _props.disabled;
			var _onMouseDown = _props.onMouseDown;
			var _onMouseUp = _props.onMouseUp;
			var _onMouseLeave = _props.onMouseLeave;
			var children = _props.children;
			var other = (0, _objectWithoutProperties3.default)(_props, ['container', 'isCenter', 'disabled', 'onMouseDown', 'onMouseUp', 'onMouseLeave', 'children']);


			var eventHandlers = {
				onMouseDown: function onMouseDown(e) {
					if (e.button === 0 && !_this2._ignoreNextMouseDown) {
						_this2.start.call(_this2, e);
						_onMouseDown && _onMouseDown(e);
						_this2._ignoreNextMouseDown = true;
					}
				},
				onMouseUp: function onMouseUp(e) {
					_this2.end.call(_this2, e);
					_onMouseUp && _onMouseUp(e);
				},
				onMouseLeave: function onMouseLeave(e) {
					_this2.end.call(_this2, e);
					_onMouseLeave && _onMouseLeave(e);
				}
			};

			var rippleProps = (0, _extends3.default)({}, other, eventHandlers);

			var waves = this.state.waves;


			var ripple = !disabled ? _react2.default.createElement(
				'div',
				{ className: 'ripple', key: 'ripple', ref: function ref(ripple) {
						return _this2.ripple = ripple;
					} },
				_react2.default.createElement(
					_reactAddonsTransitionGroup2.default,
					{ className: 'waves', key: 'waves' },
					waves
				)
			) : null;

			var grandchildren = [children, ripple];

			return (0, _react.isValidElement)(container) ? (0, _react.cloneElement)(container, rippleProps, grandchildren) : (0, _react.createElement)(container, rippleProps, grandchildren);
		}
	}, {
		key: 'start',
		value: function start(e) {
			var _this3 = this;

			var _props2 = this.props;
			var isCenter = _props2.isCenter;
			var disabled = _props2.disabled;
			var _state = this.state;
			var waves = _state.waves;
			var key = _state.key;

			var size = this.size;
			var wave = 'wave-' + key;
			//debugger;

			var style = this._getRippleStyle(e, isCenter, size);

			!disabled && waves.push(_react2.default.createElement(Wave, { ref: function ref(RippleWave) {
					return _this3.RippleWave = RippleWave;
				}, key: wave, size: size,
				style: isCenter ? (0, _extends3.default)({}, style, {
					top: '-100%',
					right: '-100%',
					bottom: '-100%',
					left: '-100%',
					margin: 'auto'
				}) : style }));
			this.setState({
				waves: waves,
				key: key + 1
			});
		}
	}, {
		key: 'end',
		value: function end(e) {
			this._ignoreNextMouseDown = false;
			var waves = this.state.waves;


			if (waves.length) {
				waves.shift();
				this.setState({
					waves: waves
				});
			}
		}
	}, {
		key: '_getRippleStyle',
		value: function _getRippleStyle(e, isCenter, size) {
			var style = {};
			var el = (0, _reactDom.findDOMNode)(this);
			var elHeight = el.offsetHeight;
			var elWidth = el.offsetWidth;
			var offset = (0, _offset2.default)(el);
			var isTouchEvent = e.touches && e.touches.length;
			var pageX = isTouchEvent ? e.touches[0].pageX : e.pageX;
			var pageY = isTouchEvent ? e.touches[0].pageY : e.pageY;
			var pointerX = pageX - offset.left;
			var pointerY = pageY - offset.top;
			var topLeftDiag = Ripple._calcDiag(pointerX, pointerY);
			var topRightDiag = Ripple._calcDiag(elWidth - pointerX, pointerY);
			var botRightDiag = Ripple._calcDiag(elWidth - pointerX, elHeight - pointerY);
			var botLeftDiag = Ripple._calcDiag(pointerX, elHeight - pointerY);
			var rippleRadius = Math.max(topLeftDiag, topRightDiag, botRightDiag, botLeftDiag);
			//const { size } = this.state;
			var rippleSize = isCenter ? size.max : rippleRadius * 2;
			var left = pointerX - rippleRadius;
			var top = pointerY - rippleRadius;

			style.height = rippleSize + 'px';
			style.width = rippleSize + 'px';

			style.top = top + 'px';
			style.left = left + 'px';
			return style;
		}
	}, {
		key: 'size',
		get: function get() {
			var ripple = this.ripple;
			return !this.ripple ? {
				min: 0,
				max: 0
			} : {
				min: Math.min(ripple.offsetWidth, ripple.offsetHeight),
				max: Math.max(ripple.offsetWidth, ripple.offsetHeight)
			};
		}
	}], [{
		key: '_calcDiag',
		value: function _calcDiag(a, b) {
			return Math.sqrt(a * a + b * b);
		}
	}]);
	return Ripple;
}(_react.Component);

Ripple.propTypes = {
	container: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
	isCenter: _react.PropTypes.bool,
	disabled: _react.PropTypes.bool,
	onMouseDown: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func]),
	onMouseUp: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func]),
	onMouseLeave: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func])
};
Ripple.defaultProps = {
	container: 'div',
	isCenter: false,
	disabled: false,
	onMouseDown: false,
	onMouseUp: false,
	onMouseLeave: false
};

var Wave = function (_Component2) {
	(0, _inherits3.default)(Wave, _Component2);

	function Wave() {
		(0, _classCallCheck3.default)(this, Wave);
		return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Wave).apply(this, arguments));
	}

	(0, _createClass3.default)(Wave, [{
		key: 'componentWillAppear',
		value: function componentWillAppear(callback) {
			this._initializeAnimation(callback);
		}
	}, {
		key: 'componentWillEnter',
		value: function componentWillEnter(callback) {
			this._initializeAnimation(callback);
		}
	}, {
		key: 'componentDidAppear',
		value: function componentDidAppear() {
			this._animate();
		}
	}, {
		key: 'componentDidEnter',
		value: function componentDidEnter() {
			this._animate();
		}
	}, {
		key: 'componentWillLeave',
		value: function componentWillLeave(callback) {
			var _this5 = this;

			var style = (0, _reactDom.findDOMNode)(this).style;
			style.opacity = 0;

			var timeOut = null;

			timeOut = setTimeout(function () {
				if ((0, _index.isMounted)(_this5)) callback();
				window.clearTimeout(timeOut);
			}, 1000);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props;
			var size = _props3.size;
			var style = _props3.style;


			return _react2.default.createElement('div', { className: 'wave', style: (0, _extends3.default)({
					width: size.min,
					height: size.min
				}, style) });
		}
	}, {
		key: '_animate',
		value: function _animate() {
			var style = (0, _reactDom.findDOMNode)(this).style;
			var transitionValue = _transitions2.default.easeOut('2s', 'opacity') + ',' + _transitions2.default.easeOut('1.5s', 'transform');
			_autoPrefix2.default.set(style, 'transition', transitionValue);
			_autoPrefix2.default.set(style, 'transform', 'scale(1)');
		}
	}, {
		key: '_initializeAnimation',
		value: function _initializeAnimation(callback) {
			var _this6 = this;

			var style = (0, _reactDom.findDOMNode)(this).style;
			style.opacity = .26;
			_autoPrefix2.default.set(style, 'transform', 'scale(0)');
			var timeOut = null;
			timeOut = setTimeout(function () {
				if ((0, _index.isMounted)(_this6)) callback();
				window.clearTimeout(timeOut);
			}, 0);
		}
	}]);
	return Wave;
}(_react.Component);

Wave.propTypes = {
	size: _react.PropTypes.object.isRequired,
	style: _react.PropTypes.object.isRequired
};
exports.default = Ripple;