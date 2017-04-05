'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Divider = exports.Item = undefined;

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

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Ripple = require('../Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

var _classNames = require('helpers/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Menu, _Component);

  function Menu() {
    (0, _classCallCheck3.default)(this, Menu);
    return (0, _possibleConstructorReturn3.default)(this, (Menu.__proto__ || (0, _getPrototypeOf2.default)(Menu)).apply(this, arguments));
  }

  (0, _createClass3.default)(Menu, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onChange = _props.onChange,
          children = _props.children,
          other = (0, _objectWithoutProperties3.default)(_props, ['onChange', 'children']);

      return _react2.default.createElement(
        _Paper2.default,
        other,
        _react2.default.createElement(
          'div',
          { className: (0, _classNames2.default)("menu") },
          _react.Children.map(children, function (child) {
            {/*return cloneElement(child, {
               onClick: (e, o)=>{
                 const { onClick } = child.props;
                 onClick && onClick(e);
                 onChange && onChange(e, o);
               }
              })*/}
            return _react2.default.createElement(Item, (0, _extends3.default)({}, child.props, {
              onClick: function onClick(e, o) {
                var onClick = child.props.onClick;

                onClick && onClick(e);
                onChange && onChange(e, o);
              }
            }));
          })
        )
      );
    }
  }]);
  return Menu;
}(_react.Component), _class.propTypes = {
  onChange: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.bool])
}, _class.defaultProps = {
  onChange: false
}, _temp);
var Item = (_temp2 = _class2 = function (_Component2) {
  (0, _inherits3.default)(Item, _Component2);

  function Item() {
    (0, _classCallCheck3.default)(this, Item);
    return (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).apply(this, arguments));
  }

  (0, _createClass3.default)(Item, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          text = _props2.text,
          children = _props2.children,
          _onClick = _props2.onClick,
          ripple = _props2.ripple,
          other = (0, _objectWithoutProperties3.default)(_props2, ['text', 'children', 'onClick', 'ripple']);


      var rippleContainer = _react2.default.createElement('div', { className: (0, _classNames2.default)('menu-item', this.props.className),
        onClick: function onClick(e) {
          _onClick && _onClick(e, function (text, value) {
            text = !!text ? text : children;
            value = value ? value : text;
            return { value: value, text: text };
          }(text, _this3.props.value));
        }
      });

      return _react2.default.createElement(
        _Ripple2.default,
        (0, _extends3.default)({ isCenter: ripple.isCenter, container: rippleContainer }, other),
        _react2.default.createElement(
          'div',
          { className: 'menu-item-inner' },
          children ? children : text
        )
      );
    }
  }]);
  return Item;
}(_react.Component), _class2.propTypes = {
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.bool]),
  text: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  onClick: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.bool]),
  ripple: _react.PropTypes.object
}, _class2.defaultProps = {
  value: false,
  text: '',
  onClick: false,
  ripple: {
    isCenter: false
  },
  onChange: function onChange(e) {}
}, _temp2);

var Divider = function (_Component3) {
  (0, _inherits3.default)(Divider, _Component3);

  function Divider() {
    (0, _classCallCheck3.default)(this, Divider);
    return (0, _possibleConstructorReturn3.default)(this, (Divider.__proto__ || (0, _getPrototypeOf2.default)(Divider)).apply(this, arguments));
  }

  (0, _createClass3.default)(Divider, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'menu-divider' },
        this.props.children
      );
    }
  }]);
  return Divider;
}(_react.Component);

exports.default = Menu;
exports.Item = Item;
exports.Divider = Divider;
//# sourceMappingURL=Menu.js.map
