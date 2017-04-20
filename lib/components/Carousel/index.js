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

var _classNames = require('helpers/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ratios = {
  '1x1': 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=',
  '4x3': 'iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAAEElEQVR42mP8/58BDBgxGABi7gX+XyMkHgAAAABJRU5ErkJggg==',
  '16x9': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAQAAACRI2S5AAAAEklEQVR42mP8/58BL2AcVQAGAHscEfhX5bYNAAAAAElFTkSuQmCC'
};

var Carousel = function (_Component) {
  (0, _inherits3.default)(Carousel, _Component);

  function Carousel(props) {
    (0, _classCallCheck3.default)(this, Carousel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Carousel).call(this, props));

    var index = props.index;
    var ratio = props.ratio;

    _this.state = { index: index, ratio: ratio };
    return _this;
  }

  (0, _createClass3.default)(Carousel, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state;
      var index = _state.index;
      var ratio = _state.ratio;

      var length = this.props.items.length;
      return _react2.default.createElement(
        'div',
        { className: 'carousel' },
        _react2.default.createElement(
          'div',
          { className: 'carousel-inner' },
          _react2.default.createElement('img', { className: 'ratio', src: 'data:image/png;base64,' + ratios[ratio], alt: '' }),
          length > 1 && [_react2.default.createElement(
            'a',
            { href: '#', onClick: function onClick(e) {
                return _this2.index = index - 1;
              }, key: 'left',
              className: 'material-icon' },
            'keyboard_arrow_left'
          ), _react2.default.createElement(
            'a',
            { href: '#', onClick: function onClick(e) {
                return _this2.index = index + 1;
              }, key: 'right',
              className: 'material-icon' },
            'keyboard_arrow_right'
          )],
          this.props.items.map(function (src, key) {
            return _react2.default.createElement(
              'div',
              { className: (0, _classNames2.default)('carousel-inner-item', {
                  active: index === key
                }), key: key },
              _react2.default.createElement('img', { src: src, alt: '' })
            );
          })
        ),
        _react2.default.createElement('div', { className: 'carousel-thumbs' })
      );
    }
  }, {
    key: 'index',
    set: function set(index) {
      var length = this.props.items.length;
      if (index <= -1) {
        index = length - 1;
      } else if (index >= length) {
        index = 0;
      }
      this.setState({ index: index });
    }
  }]);
  return Carousel;
}(_react.Component);

Carousel.propTypes = {
  index: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  ratio: _react.PropTypes.oneOf(['1x1', '4x3', '16x9'])
};
Carousel.defaultProps = {
  index: 0,
  ratio: '4x3'
};
exports.default = Carousel;