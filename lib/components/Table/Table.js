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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _classNames = require('../../helpers/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Table, _Component);

  function Table(props) {
    (0, _classCallCheck3.default)(this, Table);
    return (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).call(this, props));
  }

  (0, _createClass3.default)(Table, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          striped = _props.striped,
          other = (0, _objectWithoutProperties3.default)(_props, ['striped']);

      return _react2.default.createElement(
        _Paper2.default,
        other,
        _react2.default.createElement(
          'table',
          { className: (0, _classNames2.default)("table", {
              striped: striped
            }) },
          this.props.children
        )
      );
    }
  }]);
  return Table;
}(_react.Component), _class.propTypes = {
  striped: _react.PropTypes.bool
}, _class.defaultProps = {
  striped: false
}, _temp);
exports.default = Table;
//# sourceMappingURL=Table.js.map
