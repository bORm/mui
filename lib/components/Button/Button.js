'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ButtonText = exports.ButtonIcon = undefined;

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

var _class, _temp, _class2, _temp2, _class3, _temp3;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Ripple = require('../Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _classNames = require('helpers/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Button
 */
var Button = (_temp = _class = function (_Component) {
	(0, _inherits3.default)(Button, _Component);

	function Button() {
		(0, _classCallCheck3.default)(this, Button);
		return (0, _possibleConstructorReturn3.default)(this, (Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).apply(this, arguments));
	}

	(0, _createClass3.default)(Button, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    type = _props.type,
			    component = _props.component,
			    active = _props.active,
			    disabled = _props.disabled,
			    children = _props.children,
			    block = _props.block,
			    flat = _props.flat,
			    raised = _props.raised,
			    link = _props.link,
			    primary = _props.primary,
			    accent = _props.accent,
			    white = _props.white,
			    large = _props.large,
			    medium = _props.medium,
			    small = _props.small,
			    mini = _props.mini,
			    text = _props.text,
			    icon = _props.icon,
			    className = _props.className,
			    other = (0, _objectWithoutProperties3.default)(_props, ['type', 'component', 'active', 'disabled', 'children', 'block', 'flat', 'raised', 'link', 'primary', 'accent', 'white', 'large', 'medium', 'small', 'mini', 'text', 'icon', 'className']);


			var button = _react2.default.createElement(_Paper2.default, { component: component, type: type, disabled: disabled, className: (0, _classNames2.default)('button', {
					active: active, disabled: disabled, block: block,
					flat: !raised && !link && flat,
					raised: raised,
					link: link,
					primary: primary,
					accent: accent,
					white: white,
					large: large,
					medium: !large || !small || !mini,
					small: small,
					mini: mini
				}, className) });

			var inner = [];

			text && inner.push(_react2.default.createElement(ButtonText, { key: 'text', text: text }));
			icon && inner.push(_react2.default.createElement(ButtonIcon, { key: 'icon', name: icon }));

			if (children) {
				inner = children;
				if (typeof children === 'string') {
					inner = _react2.default.createElement(ButtonText, { text: children });
				}
			}
			/*const inner = text ? (
   	<ButtonText text={text}/>
   ) : typeof children === 'string'
   	? <ButtonText text={children}/>
   	: children;*/

			return _react2.default.createElement(
				_Ripple2.default,
				(0, _extends3.default)({}, other, { container: button, disabled: disabled || !!link }),
				_react2.default.createElement(
					'div',
					{ className: 'button-inner' },
					text && _react2.default.createElement(ButtonText, { key: 'text', text: text }),
					'\xA0',
					icon && _react2.default.createElement(ButtonIcon, { key: 'icon', name: icon }),
					function () {
						var inner = null;
						if (children) {
							inner = children;
							if (typeof children === 'string') {
								inner = _react2.default.createElement(ButtonText, { text: children });
							}
							return inner;
						}
					}()
				)
			);

			//return <button type="submit">{ children }</button>
		}
	}]);
	return Button;
}(_react.Component), _class.propTypes = {
	type: _react.PropTypes.string,
	component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
	active: _react.PropTypes.bool,
	disabled: _react.PropTypes.bool,

	block: _react.PropTypes.bool,
	flat: _react.PropTypes.bool,
	raised: _react.PropTypes.bool,
	link: _react.PropTypes.bool,

	primary: _react.PropTypes.bool,
	accent: _react.PropTypes.bool,
	white: _react.PropTypes.bool,

	large: _react.PropTypes.bool,
	medium: _react.PropTypes.bool,
	small: _react.PropTypes.bool,
	mini: _react.PropTypes.bool,

	text: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.element]),
	icon: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),

	onClick: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func])
}, _class.defaultProps = {
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
	icon: false

}, _temp);

/**
 * ButtonIcon
 */

var ButtonIcon = (_temp2 = _class2 = function (_Component2) {
	(0, _inherits3.default)(ButtonIcon, _Component2);

	function ButtonIcon() {
		(0, _classCallCheck3.default)(this, ButtonIcon);
		return (0, _possibleConstructorReturn3.default)(this, (ButtonIcon.__proto__ || (0, _getPrototypeOf2.default)(ButtonIcon)).apply(this, arguments));
	}

	(0, _createClass3.default)(ButtonIcon, [{
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    children = _props2.children,
			    name = _props2.name;

			return _react2.default.createElement(
				'span',
				{ className: 'button-icon' },
				_react2.default.createElement(
					_Icon2.default,
					null,
					name || children
				)
			);
		}
	}]);
	return ButtonIcon;
}(_react.Component), _class2.propTypes = {
	name: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string])
}, _class2.defaultProps = {
	name: false
}, _temp2);

/**
 * ButtonText
 */

var ButtonText = (_temp3 = _class3 = function (_Component3) {
	(0, _inherits3.default)(ButtonText, _Component3);

	function ButtonText() {
		(0, _classCallCheck3.default)(this, ButtonText);
		return (0, _possibleConstructorReturn3.default)(this, (ButtonText.__proto__ || (0, _getPrototypeOf2.default)(ButtonText)).apply(this, arguments));
	}

	(0, _createClass3.default)(ButtonText, [{
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    children = _props3.children,
			    text = _props3.text;

			return _react2.default.createElement(
				'span',
				{ className: 'button-text' },
				text || children
			);
		}
	}]);
	return ButtonText;
}(_react.Component), _class3.propTypes = {
	text: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.element])
}, _class3.defaultProps = {
	text: false
}, _temp3);
exports.default = Button;
exports.ButtonIcon = ButtonIcon;
exports.ButtonText = ButtonText;
//# sourceMappingURL=Button.js.map
