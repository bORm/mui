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

var Switch = function (_Component) {
  (0, _inherits3.default)(Switch, _Component);

  function Switch(props) {
    (0, _classCallCheck3.default)(this, Switch);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Switch).call(this, props));

    var checked = props.checked;
    var disabled = props.disabled;

    _this.state = { checked: checked, disabled: disabled };
    return _this;
  }

  (0, _createClass3.default)(Switch, [{
    key: "render",
    value: function render() {
      var _props = this.props;
      var name = _props.name;
      var label = _props.label;
      var onChange = _props.onChange;
      var id = _props.id;
      var _state = this.state;
      var checked = _state.checked;
      var disabled = _state.disabled;


      return _react2.default.createElement(
        "div",
        { className: "switch" },
        _react2.default.createElement(
          "div",
          { className: "switch-text" },
          label
        ),
        _react2.default.createElement("input", { id: id, type: "checkbox" }),
        _react2.default.createElement("label", { htmlFor: id }),
        _react2.default.createElement("div", { className: "switch-line" })
      );
    }
  }]);
  return Switch;
}(_react.Component);

Switch.propTypes = {
  name: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),
  checked: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  label: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),
  id: _react.PropTypes.string
};
Switch.defaultProps = {
  name: false,
  checked: false,
  disabled: false,
  label: false
};
exports.default = Switch;