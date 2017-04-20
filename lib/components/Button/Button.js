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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Ripple = require('components/Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

var _Paper = require('components/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Icon = require('components/Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _classNames = require('helpers/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Button
 */
var Button = function (_Component) {
	(0, _inherits3.default)(Button, _Component);

	function Button() {
		(0, _classCallCheck3.default)(this, Button);
		return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Button).apply(this, arguments));
	}

	(0, _createClass3.default)(Button, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var type = _props.type;
			var component = _props.component;
			var active = _props.active;
			var disabled = _props.disabled;
			var children = _props.children;
			var block = _props.block;
			var flat = _props.flat;
			var raised = _props.raised;
			var link = _props.link;
			var primary = _props.primary;
			var accent = _props.accent;
			var white = _props.white;
			var large = _props.large;
			var medium = _props.medium;
			var small = _props.small;
			var mini = _props.mini;
			var text = _props.text;
			var icon = _props.icon;
			var className = _props.className;
			var other = (0, _objectWithoutProperties3.default)(_props, ['type', 'component', 'active', 'disabled', 'children', 'block', 'flat', 'raised', 'link', 'primary', 'accent', 'white', 'large', 'medium', 'small', 'mini', 'text', 'icon', 'className']);


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
					' ',
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
}(_react.Component);

/**
 * ButtonIcon
 */


Button.propTypes = {
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
	icon: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.element, _react.PropTypes.array]),

	onClick: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func])
};
Button.defaultProps = {
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

};

var ButtonIcon = function (_Component2) {
	(0, _inherits3.default)(ButtonIcon, _Component2);

	function ButtonIcon() {
		(0, _classCallCheck3.default)(this, ButtonIcon);
		return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ButtonIcon).apply(this, arguments));
	}

	(0, _createClass3.default)(ButtonIcon, [{
		key: 'render',
		value: function render() {
			var _props2 = this.props;
			var children = _props2.children;
			var name = _props2.name;

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
}(_react.Component);

/**
 * ButtonText
 */


ButtonIcon.propTypes = {
	name: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.element, _react.PropTypes.array])
};
ButtonIcon.defaultProps = {
	name: false
};

var ButtonText = function (_Component3) {
	(0, _inherits3.default)(ButtonText, _Component3);

	function ButtonText() {
		(0, _classCallCheck3.default)(this, ButtonText);
		return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ButtonText).apply(this, arguments));
	}

	(0, _createClass3.default)(ButtonText, [{
		key: 'render',
		value: function render() {
			var _props3 = this.props;
			var children = _props3.children;
			var text = _props3.text;

			return _react2.default.createElement(
				'span',
				{ className: 'button-text' },
				text || children
			);
		}
	}]);
	return ButtonText;
}(_react.Component);

ButtonText.propTypes = {
	text: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.element])
};
ButtonText.defaultProps = {
	text: false
};
exports.default = Button;
exports.ButtonIcon = ButtonIcon;
exports.ButtonText = ButtonText;