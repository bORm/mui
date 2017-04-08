'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helpers = require('helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Paper = (_temp = _class = function (_Component) {
	(0, _inherits3.default)(Paper, _Component);

	function Paper() {
		(0, _classCallCheck3.default)(this, Paper);
		return (0, _possibleConstructorReturn3.default)(this, (Paper.__proto__ || (0, _getPrototypeOf2.default)(Paper)).apply(this, arguments));
	}

	(0, _createClass3.default)(Paper, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    zDepth = _props.zDepth,
			    component = _props.component,
			    className = _props.className,
			    other = (0, _objectWithoutProperties3.default)(_props, ['zDepth', 'component', 'className']);

			var paperProps = (0, _extends3.default)({}, other, {
				className: (0, _helpers.classNames)("paper", (0, _defineProperty3.default)({}, 'paper-shadow-z-' + zDepth, zDepth !== 0 && true), className)
			});
			return (0, _react.isValidElement)(component) ? (0, _react.cloneElement)(component, paperProps) : (0, _react.createElement)(component, paperProps);
		}
	}]);
	return Paper;
}(_react.Component), _class.propTypes = {
	zDepth: _react.PropTypes.number,
	component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element])
}, _class.defaultProps = {
	zDepth: 1,
	component: 'div'
}, _temp);
exports.default = Paper;
//# sourceMappingURL=Paper.js.map
