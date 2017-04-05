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

var _mui = require('mui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pagination = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Pagination, _Component);

  function Pagination(props) {
    (0, _classCallCheck3.default)(this, Pagination);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Pagination.__proto__ || (0, _getPrototypeOf2.default)(Pagination)).call(this, props));

    _this.state = props;
    return _this;
  }

  (0, _createClass3.default)(Pagination, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState((0, _extends3.default)({}, props));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'pagination' },
        this.pages(this.props)
      );
    }
  }, {
    key: 'pages',
    value: function pages(props) {
      var visible = props.visible,
          first = props.first,
          last = props.last,
          limit = props.limit,
          total = props.total,
          page = props.page,
          onChange = props.onChange;


      limit = parseInt(limit);
      total = parseInt(total);
      page = parseInt(page);

      if (!limit || !total || !page) return null;

      var pages = Math.ceil(total / limit);
      visible = pages > visible ? visible == 2 ? 3 : visible : pages;

      var currentPage = void 0,
          lowerLimit = void 0,
          upperLimit = void 0;
      currentPage = lowerLimit = upperLimit = Math.min(page, pages);

      for (var b = 1; b < visible && b < pages;) {
        if (lowerLimit > 1) {
          lowerLimit--;b++;
        }
        if (b < visible && upperLimit < pages) {
          upperLimit++;b++;
        }
      }

      var pagination = [_react2.default.createElement(_mui.Button, { className: 'prev', icon: 'chevron_left',
        disabled: page <= 1, key: 'prev',
        onClick: function onClick(e) {
          onChange && onChange(page - 1, e);
          return Pagination.handlePrevNextClick(e, page <= 1);
        } })];

      if (first && lowerLimit > 1 && visible >= 3) {
        lowerLimit++;
        pagination.push(_react2.default.createElement(_mui.Button, { text: 1, key: 'first',
          onClick: function onClick(e) {
            onChange && onChange(1, e);
          } }), _react2.default.createElement(_mui.Button, { text: '...', key: 'lDots', disabled: true }));
      }

      if (last && upperLimit < pages && visible >= 3) {
        upperLimit--;
      }

      var _loop = function _loop(i) {
        if (i == currentPage) {
          pagination.push(_react2.default.createElement(_mui.Button, { text: i, key: i, primary: true, disabled: true }));
        } else {
          pagination.push(_react2.default.createElement(_mui.Button, { text: i, key: i, white: true,
            onClick: function onClick(e) {
              onChange && onChange(i, e);
            } }));
        }
      };

      for (var i = lowerLimit; i <= upperLimit; i++) {
        _loop(i);
      }

      if (last && upperLimit < pages && visible >= 3) {
        pagination.push(_react2.default.createElement(_mui.Button, { text: '...', key: 'rDots', disabled: true }), _react2.default.createElement(_mui.Button, { text: pages, key: 'last',
          onClick: function onClick(e) {
            onChange && onChange(pages, e);
          } }));
      }

      pagination.push(_react2.default.createElement(_mui.Button, { className: 'prev', icon: 'chevron_right',
        disabled: page >= pages, key: 'next',
        onClick: function onClick(e) {
          onChange && onChange(page + 1, e);
          return Pagination.handlePrevNextClick(e, page >= 1);
        } }));

      return pagination;
    }
  }], [{
    key: 'handlePrevNextClick',
    value: function handlePrevNextClick(e, disabled) {
      if (disabled) {
        e.preventDefault();
        return false;
      }
    }
  }]);
  return Pagination;
}(_react.Component), _class.propTypes = {
  // limit: PropTypes.number,
  // total: PropTypes.number,
  // page: PropTypes.number,
  // link: PropTypes.string
  onChange: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func])
}, _class.defaultProps = {
  visible: 10,
  first: true,
  last: true,
  limit: 10,
  total: 10,
  link: '/page/',
  onChange: false
}, _temp);
exports.default = Pagination;
//# sourceMappingURL=Pagination.js.map
