'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CheckboxLabel = undefined;

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

var _classNames = require('helpers/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _Ripple = require('components/Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = function (_Component) {
	(0, _inherits3.default)(Checkbox, _Component);

	function Checkbox(props) {
		(0, _classCallCheck3.default)(this, Checkbox);

		var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Checkbox).call(this, props));

		var checked = props.checked;
		var disabled = props.disabled;

		_this.state = { checked: checked, disabled: disabled };
		return _this;
	}

	(0, _createClass3.default)(Checkbox, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var name = _props.name;
			var label = _props.label;
			var _onChange = _props.onChange;
			var _state = this.state;
			var checked = _state.checked;
			var disabled = _state.disabled;


			return _react2.default.createElement(
				_Ripple2.default,
				{ container: _react2.default.createElement('label', { className: (0, _classNames2.default)('checkbox', { checked: checked, disabled: disabled }) }), isCenter: true, disabled: disabled },
				_react2.default.createElement('input', (0, _extends3.default)({ type: 'checkbox' }, {
					/**
      * Input Props
      */
					name: name, checked: checked, disabled: disabled,
					onChange: function onChange(e) {
						var checked = e.target.checked;

						_this2.setState({ checked: checked });
						_onChange && _onChange(e);
					}
				})),
				_react2.default.createElement('span', { className: 'checkbox-icon' }),
				label && _react2.default.createElement(
					CheckboxLabel,
					null,
					label
				)
			);
		}
	}]);
	return Checkbox;
}(_react.Component);

Checkbox.propTypes = {
	name: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),
	checked: _react.PropTypes.bool,
	disabled: _react.PropTypes.bool,
	label: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.element])
};
Checkbox.defaultProps = {
	checked: false,
	disabled: false,
	label: false
};

var CheckboxLabel = function (_Component2) {
	(0, _inherits3.default)(CheckboxLabel, _Component2);

	function CheckboxLabel() {
		(0, _classCallCheck3.default)(this, CheckboxLabel);
		return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CheckboxLabel).apply(this, arguments));
	}

	(0, _createClass3.default)(CheckboxLabel, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'checkbox-label' },
				this.props.children
			);
		}
	}]);
	return CheckboxLabel;
}(_react.Component);

exports.default = Checkbox;
exports.CheckboxLabel = CheckboxLabel;