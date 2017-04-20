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

var Tab = function (_Component) {
  (0, _inherits3.default)(Tab, _Component);

  function Tab(props) {
    (0, _classCallCheck3.default)(this, Tab);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Tab).call(this, props));
  }

  (0, _createClass3.default)(Tab, [{
    key: 'render',
    value: function render() {
      var other = (0, _objectWithoutProperties3.default)(this.props, []);

      return _react2.default.createElement(
        'div',
        other,
        this.props.children
      );
    }
  }]);
  return Tab;
}(_react.Component);

Tab.propTypes = {
  label: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.element]),
  disabled: _react.PropTypes.bool
};
Tab.defaultProps = {
  label: false,
  disabled: false
};
exports.default = Tab;