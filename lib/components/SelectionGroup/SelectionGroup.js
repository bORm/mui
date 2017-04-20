'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectionGroup = function (_Component) {
  (0, _inherits3.default)(SelectionGroup, _Component);

  function SelectionGroup() {
    (0, _classCallCheck3.default)(this, SelectionGroup);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SelectionGroup).apply(this, arguments));
  }

  (0, _createClass3.default)(SelectionGroup, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var text = _props.text;
      var value = _props.value;
      var className = _props.className;
      var children = _props.children;
      var onClick = _props.onClick;
      var ripple = _props.ripple;
      var other = (0, _objectWithoutProperties3.default)(_props, ['text', 'value', 'className', 'children', 'onClick', 'ripple']);


      return _react2.default.createElement(
        'fieldset',
        null,
        _react2.default.createElement(
          'legend',
          null,
          this.props.legend
        ),
        this.props.name ? _react.Children.map(children, function (child) {
          return (0, _react.cloneElement)(child, {
            name: _this2.props.name
          });
        }) : children
      );
    }
  }]);
  return SelectionGroup;
}(_react.Component);

SelectionGroup.propTypes = {};
SelectionGroup.defaultProps = {};
exports.default = SelectionGroup;