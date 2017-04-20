'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _Paper = require('components/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Ripple = require('components/Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

var _classNames = require('helpers/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chips = function (_Component) {
  (0, _inherits3.default)(Chips, _Component);

  function Chips(props) {
    (0, _classCallCheck3.default)(this, Chips);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Chips).call(this, props));

    _this.open = function () {
      _this.setState({ open: true });
    };

    _this.close = function () {
      _this.setState({ open: false });
    };

    _this.handleMouseLeave = function (_event) {
      _this.setState({ selectedSuggest: -1 });
    };

    _this.handleMouseEnter = function (index) {
      return function (_event) {
        _this.setState({ selectedSuggest: index });
      };
    };

    _this.handleKeyDown = function (event) {
      var _this$state = _this.state;
      var selectedSuggest = _this$state.selectedSuggest;
      var selectedValue = _this$state.selectedValue;
      var inputValue = _this$state.inputValue;
      var suggest = _this$state.suggest;
      var value = _this$state.value;


      var input = _this.input;

      _this.open();

      var key = event.key;

      // Double Click
      if (event.type === 'dblclick') {
        key = 'DoubleClick';
      }

      // console.log(event.key);

      switch (key) {
        case 'ArrowDown':
          event.preventDefault();
          selectedSuggest = Math.min(selectedSuggest + 1, suggest.length - 1);
          selectedValue = -1;
          break;

        case 'ArrowUp':
          event.preventDefault();
          selectedSuggest = Math.max(selectedSuggest - 1, -1);
          selectedValue = -1;
          break;

        case 'Enter':
          event.preventDefault();
          if (selectedSuggest > -1) {
            _this.handleSelect(suggest[selectedSuggest])(event);
          } else {
            _this.handleSelect(event.target.value)(event);
          }
          selectedValue = -1;
          break;

        case 'Backspace':
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'DoubleClick':

          if (input.value === '' && value.length) {
            switch (key) {
              case 'Backspace':
                if (selectedValue === -1) {
                  selectedValue = value.length - 1;
                } else {
                  value.splice(selectedValue, 1);
                  selectedValue = -1;
                  inputValue = '';
                }
                break;
              case 'ArrowLeft':
                selectedValue = selectedValue === -1 ? Math.max(value.length - 1, -1) : Math.max(selectedValue - 1, -1);
                break;
              case 'ArrowRight':
                selectedValue = selectedValue === value.length - 1 ? -1 : Math.min(selectedValue + 1, value.length - 1);
                break;
              case 'DoubleClick':
                selectedValue = Math.max(value.length - 1, -1);
                break;
            }
          }

          break;

        case 'Escape':
          selectedSuggest = -1;
          selectedValue = -1;
          _this.close();
          break;

        default:
          selectedValue = -1;
          inputValue = event.target.value;
          // TODO: Add debounce
          _this.props.onKeyDown(event);
          if (!_this.props.multiple && value.length) {
            event.preventDefault();
            return false;
          }
          //setTimeout(() => this.forceUpdate());
          break;
      }

      /*if ( selectedValue !== -1 ) {
        this._blur = true;
        input.blur();
      }*/

      _this.setState({ selectedSuggest: selectedSuggest, selectedValue: selectedValue, inputValue: inputValue });
    };

    _this.handleFocus = function (e) {
      var onFocus = _this.props.onFocus;

      _this.setState({ isFocused: true });
      onFocus && onFocus(e);

      _this.open();
    };

    _this.handleBlur = function (e) {
      var onBlur = _this.props.onBlur;

      onBlur && onBlur(e);
      _this.setState({
        isFocused: false,
        selectedSuggest: -1,
        selectedValue: -1
      });

      _this.close();
    };

    _this.handleSelect = function (item) {
      return function (event) {
        var _this$props = _this.props;
        var options = _this$props.options;
        var onSelect = _this$props.onSelect;
        var search = _this$props.search;
        var multiple = _this$props.multiple;
        var value = _this.state.value;

        var input = _this.input;
        input.focus();
        /**
         * If there is no onSelect, just update the value
         */

        var selectHandler = onSelect(item, options, event);
        /**
         * After updating the value, we need to trigger an onChange event.
         * Can also trigger by returning true in onSelect
         */
        if (selectHandler) {
          if (!value.filter(function (item) {
            return search(item, selectHandler);
          }).length) {
            _this.setState({
              value: multiple ? [].concat((0, _toConsumableArray3.default)(_this.state.value), [selectHandler]) : [selectHandler]
            });
          }
          input.value = '';
          var changeEvent = new Event('input', { bubbles: true });
          input.dispatchEvent(changeEvent);
        }

        /**
         * Close the menu and allow blur events
         * to continue,
         */
        setTimeout(function () {
          input.focus();
          _this._blur = true;
          _this.close();
          _this.setState({
            selectedSuggest: -1
          });
          _this.props.onChange(_this.state.value);
        }, 100);
      };
    };

    _this.handleChange = function (event) {
      var suggest = _this.suggest(event.target.value);
      _this.setState({ suggest: suggest, inputValue: event.target.value });
    };

    _this.state = {
      isFocused: false,
      selectedValue: -1,
      selectedSuggest: -1,
      opened: false,
      value: props.value,
      inputValue: '',
      suggest: []
    };
    return _this;
  }

  (0, _createClass3.default)(Chips, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ suggest: this.suggest() });
    }
  }, {
    key: 'suggest',
    value: function suggest() {
      var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var _props = this.props;
      var options = _props.options;
      var filter = _props.filter;
      var sort = _props.sort;
      var limit = _props.limit;

      /*let suggestions = options.reduce((array, opt) => {
        if (~opt.name.toLowerCase().indexOf(value)) {
          array.push(opt);
        }
        return array;
      }, []);*/

      if (!value.length) return [];

      return options.filter(function (item) {
        return filter(item, value);
      }).sort(sort).slice(0, limit);
    }

    // menu


    // item


    // item

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props;
      var required = _props2.required;
      var success = _props2.success;
      var warning = _props2.warning;
      var danger = _props2.danger;
      var className = _props2.className;
      var placeholder = _props2.placeholder;
      var Item = _props2.item;
      var Chip = _props2.chip;


      return _react2.default.createElement(
        'div',
        { className: (0, _classNames2.default)('chips', className) },
        _react2.default.createElement(
          'label',
          { className: (0, _classNames2.default)('field floating field-md', {
              success: success !== false,
              warning: warning !== false,
              danger: danger !== false,
              hasValue: this.state.value.length > 0 || this.state.inputValue !== '',
              isFocused: this.state.isFocused
            }) },
          _react2.default.createElement(
            'div',
            { className: 'field-control' },
            this.state.value.map(function (item, key) {
              return _react2.default.createElement(Chip, {
                item: item, index: key, key: key,
                selected: _this2.state.selectedValue === key,
                onClickDelete: function onClickDelete() {
                  _this2.state.value.splice(key, 1);
                },
                onClick: function onClick() {
                  _this2.setState({ selectedValue: key });
                }
              });
            }),
            _react2.default.createElement('input', {
              ref: 'input',
              type: 'text',
              autoComplete: false,
              className: 'field-entry',
              onKeyDown: this.handleKeyDown,
              onDoubleClick: this.handleKeyDown,
              onFocus: this.handleFocus,
              onBlur: this.handleBlur,
              onChange: this.handleChange
            }),
            placeholder && _react2.default.createElement(
              'span',
              { className: 'field-label',
                onClick: function onClick() {
                  return _this2.input.focus();
                }
              },
              placeholder,
              ' ',
              required && _react2.default.createElement(
                'sup',
                null,
                '*'
              )
            ),
            _react2.default.createElement('hr', { className: 'field-border field-border-focus' }),
            _react2.default.createElement('hr', { className: 'field-border' })
          )
        ),
        this.state.open && _react2.default.createElement(
          _Paper2.default,
          (0, _extends3.default)({ component: 'ul' }, {
            onMouseLeave: this.handleMouseLeave
          }),
          this.state.suggest.map(function (item, key) {
            return _react2.default.createElement(Item, {
              item: item, key: key,
              selected: _this2.state.selectedSuggest === key,
              onMouseEnter: _this2.handleMouseEnter(key),
              onMouseDown: _this2.handleSelect(item)
            });
          })
        )
      );
    }
  }, {
    key: 'input',
    get: function get() {
      return this.refs.input;
    }
  }]);
  return Chips;
}(_react.Component);

Chips.propTypes = {
  required: _react.PropTypes.bool,
  success: _react.PropTypes.bool,
  warning: _react.PropTypes.bool,
  danger: _react.PropTypes.bool,

  placeholder: _react.PropTypes.string,

  multiple: _react.PropTypes.bool,

  options: _react.PropTypes.array,
  value: _react.PropTypes.array,
  filter: _react.PropTypes.func,
  sort: _react.PropTypes.func,
  query: _react.PropTypes.string,
  item: _react.PropTypes.func
};
Chips.defaultProps = {
  required: false,
  success: false,
  warning: false,
  danger: false,

  placeholder: '',

  multiple: true,
  options: [],
  value: [],

  onSelect: function onSelect(item, options, event) {
    return item;
  },
  filter: function filter(item, query) {
    return item.toLowerCase().includes(query.toLowerCase());
  },
  search: function search(item, query) {
    return item.toLowerCase().includes(query.toLowerCase());
  },
  sort: function sort() {},
  query: '',
  item: function item(_ref) {
    var _item = _ref.item;
    var selected = _ref.selected;
    var onMouseEnter = _ref.onMouseEnter;
    var onMouseDown = _ref.onMouseDown;

    return _react2.default.createElement(
      _Ripple2.default,
      {
        container: 'li',
        className: (0, _classNames2.default)({ selected: selected }),
        onMouseEnter: onMouseEnter, onMouseDown: onMouseDown
      },
      _react2.default.createElement(
        'span',
        null,
        _item.name
      )
    );
  },
  chip: function chip(_ref2) {
    var item = _ref2.item;
    var index = _ref2.index;
    var selected = _ref2.selected;
    var onClickDelete = _ref2.onClickDelete;
    var other = (0, _objectWithoutProperties3.default)(_ref2, ['item', 'index', 'selected', 'onClickDelete']);
    return _react2.default.createElement(
      'em',
      (0, _extends3.default)({ className: (0, _classNames2.default)({ selected: selected }) }, other),
      _react2.default.createElement(
        'span',
        null,
        item.name
      ),
      _react2.default.createElement(
        'span',
        { className: 'material-icon', onClick: onClickDelete },
        'close'
      )
    );
  }
};
exports.default = Chips;