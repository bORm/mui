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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Ripple = require('../Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

var _classNames = require('../../helpers/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function (_Component) {
  (0, _inherits3.default)(List, _Component);

  function List(props) {
    (0, _classCallCheck3.default)(this, List);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(List).call(this, props));
  }

  (0, _createClass3.default)(List, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var component = _props.component;
      var className = _props.className;
      var other = (0, _objectWithoutProperties3.default)(_props, ['component', 'className']);

      var props = {
        className: (0, _classNames2.default)('list', className)
      };
      return (0, _react.isValidElement)(component) ? (0, _react.cloneElement)(component, props, this.props.children) : (0, _react.createElement)(component, props, this.props.children);
    }
  }]);
  return List;
}(_react.Component);

List.propTypes = {
  component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  className: _react.PropTypes.string
};
List.defaultProps = {
  component: 'div',
  className: ''
};

var Item = function (_Component2) {
  (0, _inherits3.default)(Item, _Component2);

  function Item(props) {
    (0, _classCallCheck3.default)(this, Item);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Item).call(this, props));
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
      var _props2 = this.props;
      var className = _props2.className;
      var component = _props2.component;
      var children = _props2.children;
      var primary = _props2.primary;
      var text = _props2.text;
      var secondary = _props2.secondary;
      var other = (0, _objectWithoutProperties3.default)(_props2, ['className', 'component', 'children', 'primary', 'text', 'secondary']);


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
}(_react.Component);

Item.propTypes = {
  component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element])
};
Item.defaultProps = {
  component: 'div'
};
exports.default = List;
exports.Item = Item;