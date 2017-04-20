'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isMouseControlInverted = function isMouseControlInverted(axis) {
	return axis === 'x-reverse' || axis === 'y';
};
var mainAxisClientOffsetProperty = {
	x: 'clientX',
	'x-reverse': 'clientX',
	y: 'clientY',
	'y-reverse': 'clientY'
};

var mainAxisOffsetProperty = {
	x: 'left',
	'x-reverse': 'right',
	y: 'bottom',
	'y-reverse': 'top'
};

var mainAxisClientProperty = {
	x: 'clientWidth',
	'x-reverse': 'clientWidth',
	y: 'clientHeight',
	'y-reverse': 'clientHeight'
};

var Slider = function (_Component) {
	(0, _inherits3.default)(Slider, _Component);

	function Slider(props) {
		(0, _classCallCheck3.default)(this, Slider);

		var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Slider).call(this, props));

		_this.dragHandler = function (event) {

			if (_this.dragRunning) {
				return;
			}
			_this.dragRunning = true;

			var eventName = event.constructor.name;

			var clientOffset = void 0;
			switch (eventName) {
				case 'MouseEvent':
				case 'SyntheticMouseEvent':
					clientOffset = event[mainAxisClientOffsetProperty[_this.props.axis]];
					break;
				case 'TouchEvent':
				case 'SyntheticTouchEvent':
					clientOffset = event.touches[0][mainAxisClientOffsetProperty[_this.props.axis]];
			}

			requestAnimationFrame(function () {
				var pos = void 0;
				if (isMouseControlInverted(_this.props.axis)) {
					pos = _this.getTrackOffset() - clientOffset;
				} else {
					pos = clientOffset - _this.getTrackOffset();
				}
				_this.onDragUpdate(event, pos);
				_this.dragRunning = false;
			});
		};

		_this.dragMouseEndHandler = function (event) {
			if (document) {
				document.removeEventListener('mousemove', _this.dragHandler, false);
				document.removeEventListener('mouseup', _this.dragMouseEndHandler, false);
			}

			_this.onDragEnd(event);
		};

		_this.state = {
			percent: 0,
			value: props.min || 0
		};
		return _this;
	}

	(0, _createClass3.default)(Slider, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var disabled = _props.disabled;
			var label = _props.label;
			var name = _props.name;


			var handleDragProps = void 0;
			if (!disabled) {
				handleDragProps = {
					onTouchStart: this.handleTouchStart.bind(this),
					onMouseDown: this.handleMouseStart.bind(this)
				};
			}

			var _state = this.state;
			var percent = _state.percent;
			var value = _state.value;


			var left = percent === 0 ? '0%' : percent * 100 + '%';

			return _react2.default.createElement(
				'div',
				{ className: 'slider' },
				typeof label !== 'undefined' && _react2.default.createElement(
					'div',
					{ className: 'slider-label' },
					label
				),
				_react2.default.createElement(
					'div',
					(0, _extends3.default)({ className: 'slider-track', ref: 'track' }, handleDragProps),
					_react2.default.createElement(
						'div',
						{ className: 'slider-thumb', ref: 'thumb', style: {
								left: left
							} },
						_react2.default.createElement(
							'div',
							{ className: 'slider-thumb-discrete' },
							_react2.default.createElement(
								'span',
								null,
								value
							)
						)
					),
					_react2.default.createElement('span', { className: 'slider-fill', ref: 'fill', style: {
							width: left
						} }),
					_react2.default.createElement('input', { type: 'hidden', value: value, name: name, onChange: function onChange() {} })
				)
			);
		}

		/**
   * Start
   * @param event
   */

	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart(event) {
			if (document) {
				document.addEventListener('touchmove', this.dragHandler.bind(this), false);
				document.addEventListener('touchup', this.dragTouchEndHandler.bind(this), false);
				document.addEventListener('touchend', this.dragTouchEndHandler.bind(this), false);
				document.addEventListener('touchcancel', this.dragTouchEndHandler.bind(this), false);
			}
			this.dragHandler(event);
			this.onDragStart(event);
		}
	}, {
		key: 'handleMouseStart',
		value: function handleMouseStart(event) {
			if (document) {
				document.addEventListener('mousemove', this.dragHandler, false);
				document.addEventListener('mouseup', this.dragMouseEndHandler, false);
			}
			console.log(event);
			this.dragHandler(event);
			this.onDragStart(event);
		}
	}, {
		key: 'onDragStart',
		value: function onDragStart(event) {
			// Cancel scroll and context menu
			event.preventDefault();

			// Set focus manually since we called preventDefault()
			this.refs.thumb.focus();

			this.setState({
				dragging: true,
				active: true
			});

			if (this.props.onDragStart) {
				this.props.onDragStart(event);
			}
		}

		/**
   * Drag requestAnimationFrame
   * @param event
   */

	}, {
		key: 'getTrackOffset',
		value: function getTrackOffset() {
			return this.refs.track.getBoundingClientRect()[mainAxisOffsetProperty[this.props.axis]];
		}
	}, {
		key: 'onDragUpdate',
		value: function onDragUpdate(event, pos) {
			if (!this.state.dragging) {
				return;
			}
			if (!this.props.disabled) {
				this.dragTo(event, pos);
			}
		}
	}, {
		key: 'dragTo',
		value: function dragTo(event, pos) {
			var max = this.refs.track[mainAxisClientProperty[this.props.axis]];
			if (pos < 0) {
				pos = 0;
			} else if (pos > max) {
				pos = max;
			}

			//console.log(pos);
			//this.setState({pos})
			this.updateWithChangeEvent(event, pos / max);
		}
	}, {
		key: 'updateWithChangeEvent',
		value: function updateWithChangeEvent(event, percent) {
			var _this2 = this;

			this.setPercent(percent, function () {
				if (_this2.props.onChange) {
					_this2.props.onChange(event, _this2.state.value);
				}
			});
		}

		/**
   *
   * @param percent
   * @param callback
   */

	}, {
		key: 'setPercent',
		value: function setPercent(percent, callback) {
			var value = this.alignValue(this.percentToValue(percent));
			var _props2 = this.props;
			var min = _props2.min;
			var max = _props2.max;

			var alignedPercent = (value - min) / (max - min);
			if (this.state.value !== value) {
				this.setState({ value: value, percent: alignedPercent }, callback);
			}
		}
	}, {
		key: 'alignValue',
		value: function alignValue(val) {
			var _props3 = this.props;
			var step = _props3.step;
			var min = _props3.min;

			var alignValue = Math.round((val - min) / step) * step + min;
			return parseFloat(alignValue.toFixed(5));
		}
	}, {
		key: 'percentToValue',
		value: function percentToValue(percent) {
			return percent * (this.props.max - this.props.min) + this.props.min;
		}
	}, {
		key: 'clearValue',
		value: function clearValue() {
			this.setValue(this.props.min);
		}

		/**
   * End
   * @param event
   */

	}, {
		key: 'dragTouchEndHandler',
		value: function dragTouchEndHandler(event) {
			if (document) {
				document.removeEventListener('touchmove', this.dragHandler, false);
				document.removeEventListener('touchup', this.dragTouchEndHandler.bind(this), false);
				document.removeEventListener('touchend', this.dragTouchEndHandler.bind(this), false);
				document.removeEventListener('touchcancel', this.dragTouchEndHandler.bind(this), false);
			}

			this.onDragEnd(event);
		}
	}, {
		key: 'onDragEnd',
		value: function onDragEnd(event) {
			this.setState({
				dragging: false,
				active: false
			});

			if (this.props.onDragStop) {
				this.props.onDragStop(event);
			}
		}
	}]);
	return Slider;
}(_react.Component);

Slider.propTypes = {
	axis: _react.PropTypes.oneOf(['x', 'x-reverse', 'y', 'y-reverse']),
	disabled: _react.PropTypes.bool,
	step: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	max: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	min: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	name: _react.PropTypes.string,
	required: _react.PropTypes.bool,
	label: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.component])
};
Slider.defaultProps = {
	axis: 'x',
	disabled: false,
	step: 0.01,
	max: 1,
	min: 0,
	required: true
};
exports.default = Slider;

// react-DefinitelyTyped