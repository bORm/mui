'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = undefined;

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

var _class, _temp, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Ripple = require('../Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

var _classNames = require('../../helpers/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(List, _Component);

  function List(props) {
    (0, _classCallCheck3.default)(this, List);
    return (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).call(this, props));
  }

  (0, _createClass3.default)(List, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          component = _props.component,
          className = _props.className,
          other = (0, _objectWithoutProperties3.default)(_props, ['component', 'className']);

      var props = {
        className: (0, _classNames2.default)('list', className)
      };
      return (0, _react.isValidElement)(component) ? (0, _react.cloneElement)(component, props, this.props.children) : (0, _react.createElement)(component, props, this.props.children);
    }
  }]);
  return List;
}(_react.Component), _class.propTypes = {
  component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  className: _react.PropTypes.string
}, _class.defaultProps = {
  component: 'div',
  className: ''
}, _temp);
var Item = (_temp2 = _class2 = function (_Component2) {
  (0, _inherits3.default)(Item, _Component2);

  function Item(props) {
    (0, _classCallCheck3.default)(this, Item);
    return (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).call(this, props));
  }

  (0, _createClass3.default)(Item, [{
    key: 'handleLiClick',
    value: function handleLiClick(e) {
      var onClick = this.props.onClick;
      //console.log(e);

      onClick && onClick(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          component = _props2.component,
          children = _props2.children,
          primary = _props2.primary,
          text = _props2.text,
          secondary = _props2.secondary,
          other = (0, _objectWithoutProperties3.default)(_props2, ['className', 'component', 'children', 'primary', 'text', 'secondary']);


      var props = {
        className: (0, _classNames2.default)('list-item', className),
        onClick: this.handleLiClick.bind(this)
      };

      var item = (0, _react.isValidElement)(component) ? (0, _react.cloneElement)(component, props) : (0, _react.createElement)(component, props);

      return _react2.default.createElement(
        _Ripple2.default,
        (0, _extends3.default)({ container: item }, other),
        children && children,
        primary && _react2.default.createElement(
          'div',
          { className: 'primary' },
          primary
        ),
        text && _react2.default.createElement(
          'div',
          { className: 'text' },
          text
        ),
        secondary && _react2.default.createElement(
          'div',
          { className: 'secondary' },
          secondary
        )
      );
    }
  }]);
  return Item;
}(_react.Component), _class2.propTypes = {
  component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element])
}, _class2.defaultProps = {
  component: 'div'
}, _temp2);
exports.default = List;
exports.Item = Item;
//# sourceMappingURL=List.js.map
