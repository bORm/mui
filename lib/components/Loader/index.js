"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loader = function (_Component) {
	(0, _inherits3.default)(Loader, _Component);

	function Loader(props) {
		(0, _classCallCheck3.default)(this, Loader);
		return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Loader).call(this, props));
	}

	(0, _createClass3.default)(Loader, [{
		key: "render",
		value: function render() {
			var width = this.props.width;

			var style = {
				width: width,
				height: width
			};

			return _react2.default.createElement(
				"div",
				{ className: "loader" },
				_react2.default.createElement(
					"svg",
					{ className: "circular", viewBox: "25 25 50 50", style: style },
					_react2.default.createElement("circle", { className: "path", cx: "50", cy: "50", r: "20", fill: "none",
						strokeWidth: "2", strokeMiterlimit: "10" })
				)
			);
		}
	}]);
	return Loader;
}(_react.Component);

Loader.propTypes = {
	width: _react.PropTypes.any
};
Loader.defaultProps = {
	width: 100
};
exports.default = Loader;