'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _classNames = require('helpers/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _Ripple = require('../Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Selection = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Selection, _Component);

  function Selection(props) {
    (0, _classCallCheck3.default)(this, Selection);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Selection.__proto__ || (0, _getPrototypeOf2.default)(Selection)).call(this, props));

    var checked = props.checked,
        disabled = props.disabled;

    _this.state = { checked: checked, disabled: disabled };
    return _this;
  }

  (0, _createClass3.default)(Selection, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          type = _props.type,
          name = _props.name,
          label = _props.label,
          _onChange = _props.onChange;
      var _state = this.state,
          checked = _state.checked,
          disabled = _state.disabled;


      return _react2.default.createElement(
        _Ripple2.default,
        { container: _react2.default.createElement('label', { className: (0, _classNames2.default)('selection', type, { checked: checked, disabled: disabled }) }), isCenter: true, disabled: disabled },
        _react2.default.createElement('input', (0, _extends3.default)({ type: type }, {
          /**
           * Input Props
           */
          name: name, checked: checked, disabled: disabled,
          onChange: function onChange(e) {
            var checked = e.target.checked;

            _this2.setState({ checked: checked });
            _onChange && _onChange(e);
          }
        })),
        _react2.default.createElement('span', { className: 'checkbox-icon' }),
        label && _react2.default.createElement(
          'div',
          { className: 'selection-label' },
          label
        )
      );
    }
  }]);
  return Selection;
}(_react.Component), _class.propTypes = {
  type: _react.PropTypes.oneOf(['checkbox', 'radio', 'switch']),
  name: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),
  checked: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  label: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.element])
}, _class.defaultProps = {
  type: 'checkbox',
  checked: false,
  disabled: false,
  label: false
}, _temp);
exports.default = Selection;
//# sourceMappingURL=Selection.js.map
