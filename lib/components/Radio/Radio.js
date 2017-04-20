'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var Radio = function (_Component) {
  (0, _inherits3.default)(Radio, _Component);

  function Radio() {
    (0, _classCallCheck3.default)(this, Radio);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Radio).apply(this, arguments));
  }

  (0, _createClass3.default)(Radio, [{
    key: 'render',
    value: function render() {

      var inputProps = {
        type: this.props.type,
        name: this.props.name,
        onChange: this.props.onChange,
        defaultChecked: this.props.defaultChecked,
        value: this.props.value
      };

      return _react2.default.createElement(
        'div',
        { className: 'radio' },
        _react2.default.createElement(
          'label',
          { className: 'radio-control' },
          _react2.default.createElement('input', inputProps),
          _react2.default.createElement(
            'span',
            null,
            this.props.label
          ),
          _react2.default.createElement('div', { className: 'radio-control-indicator' })
        )
      );
    }
  }]);
  return Radio;
}(_react.Component);

Radio.propTypes = {
  name: _react.PropTypes.string.isRequired
};
Radio.defaultProps = {
  type: 'radio',
  onChange: function onChange(e) {
    console.log(e);
  },
  checked: false
};
exports.default = Radio;