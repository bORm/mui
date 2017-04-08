'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Progress = exports.ANIMATION_TIME = exports.PROGRESS_INCREASE = exports.MAX_PROGRESS = exports.UPDATE_TIME = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UPDATE_TIME = exports.UPDATE_TIME = 100;
var MAX_PROGRESS = exports.MAX_PROGRESS = 80;
var PROGRESS_INCREASE = exports.PROGRESS_INCREASE = 1;
var ANIMATION_TIME = exports.ANIMATION_TIME = UPDATE_TIME * 2;

var initialState = {
  buffer: 0,
  percent: 0,
  progressInterval: null,
  animationTimeout: null
};

var Progress = exports.Progress = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Progress, _React$Component);

  function Progress(props) {
    (0, _classCallCheck3.default)(this, Progress);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Progress.__proto__ || (0, _getPrototypeOf2.default)(Progress)).call(this, props));

    _this.state = initialState;

    _this.progressInterval = null;
    _this.animationTimeout = null;
    _this.boundSimulateProgress = _this.simulateProgress.bind(_this);
    _this.boundResetProgress = _this.resetProgress.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Progress, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.launch();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.progress > this.props.progress) {
        this.launch();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.progressInterval);
      clearTimeout(this.animationTimeout);
    }
  }, {
    key: 'launch',
    value: function launch() {
      var _state = this.state,
          percent = _state.percent,
          buffer = _state.buffer;


      if (!this.progressInterval) {
        this.progressInterval = setInterval(this.boundSimulateProgress, this.props.updateTime);
        clearTimeout(this.animationTimeout);
        percent = 0;
        buffer = 0;
      }

      this.setState((0, _extends3.default)({}, this.state, {
        percent: percent,
        buffer: buffer
      }));
    }
  }, {
    key: 'simulateProgress',
    value: function simulateProgress() {
      var _state2 = this.state,
          percent = _state2.percent,
          buffer = _state2.buffer;

      if (percent === 100) {
        this.animationTimeout = setTimeout(this.boundResetProgress, ANIMATION_TIME);
        clearInterval(this.progressInterval);
        this.progressInterval = null;
      } else if (this.props.progress === null) {
        percent = 100;
        buffer = 100;
      } else if (percent < this.props.maxProgress) {
        percent = percent + this.props.progressIncrease;
        if (percent < 35) {
          buffer = 50;
        }
        if (percent < 50) {
          buffer = 70;
        } else {
          buffer = 100;
        }
      }

      this.setState({ percent: percent, buffer: buffer });

      this.props.onProgress(percent);
    }
  }, {
    key: 'resetProgress',
    value: function resetProgress() {
      var _this2 = this;

      clearTimeout(this.animationTimeout);
      this.setState(initialState, function () {
        _this2.props.onDone();
      });
    }
  }, {
    key: 'buildStyle',
    value: function buildStyle() {
      //console.log(this.state.percent)
      var style = {
        progress: {
          width: this.state.percent + '%',
          transition: 'width ' + ANIMATION_TIME + 'ms linear,\n                   height ' + ANIMATION_TIME + 'ms linear',
          zIndex: 2
        },
        buffer: {
          width: this.state.buffer + '%'
        }
      };

      return (0, _extends3.default)({}, style, this.props.style);
    }
  }, {
    key: 'render',
    value: function render() {
      var style = this.buildStyle();
      var active = Progress.shouldShow(this.state.percent);

      return _react2.default.createElement(
        'div',
        { className: (0, _classNames2.default)('progress', 'clearfix', this.props.className, { active: active }) },
        _react2.default.createElement('span', { className: 'bar bar-progress', style: style.progress }),
        _react2.default.createElement('span', { style: style.buffer, className: 'bar bar-buffer' }),
        _react2.default.createElement(
          'svg',
          { className: 'bar bar-dotted' },
          _react2.default.createElement('line', { className: 'line',
            x1: '2', x2: '10000', y1: '2', y2: '2' })
        )
      );
    }
  }], [{
    key: 'shouldShow',
    value: function shouldShow(percent) {
      return percent > 0 && percent < 100;
    }
  }]);
  return Progress;
}(_react2.default.Component), _class.propTypes = {
  style: _react.PropTypes.object,
  className: _react.PropTypes.string,
  actions: _react.PropTypes.object,
  progress: _react.PropTypes.number,
  updateTime: _react.PropTypes.number,
  maxProgress: _react.PropTypes.number,
  progressIncrease: _react.PropTypes.number
}, _class.defaultProps = {
  style: {},
  className: undefined,
  progress: 0,
  updateTime: UPDATE_TIME,
  maxProgress: MAX_PROGRESS,
  progressIncrease: PROGRESS_INCREASE
}, _temp);
exports.default = Progress;
//# sourceMappingURL=Progress.js.map
