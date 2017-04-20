'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = undefined;

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Tab = require('components/Tabs/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _Button = require('components/Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _classNames = require('helpers/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tabs = function (_Component) {
  (0, _inherits3.default)(Tabs, _Component);

  function Tabs(props) {
    (0, _classCallCheck3.default)(this, Tabs);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Tabs).call(this, props));

    var active = parseInt(props.active);
    _this.state = (0, _extends3.default)({}, props, {
      active: active,
      last: parseInt(props.last),
      hasArrows: false,
      translateX: 0,
      translateI: 0,
      range: {
        min: 0,
        max: 0
      }
    });
    return _this;
  }

  (0, _createClass3.default)(Tabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.labels = (0, _reactDom.findDOMNode)(this.refs['labels']);
      this.titles = (0, _reactDom.findDOMNode)(this.refs['titles']);

      this.active = this.props;

      window.addEventListener('resize', function () {
        _this2.active = _this2.props;
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', function () {});
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.active !== this.state.active) {
        this.active = props;
      }
    }
  }, {
    key: 'paginate',
    value: function paginate(dir) {
      var _this3 = this;

      var translateX = this.state.translateX;


      var offsetWidth = {
        titles: this.titles.offsetWidth,
        labels: this.labels.offsetWidth
      };

      var translate = {
        min: 0,
        max: offsetWidth.titles - offsetWidth.labels
      };

      var translateI = this.state.translateI;


      var DOM = void 0,
          labelsWidth = this.labels.offsetWidth;

      var length = this.props.children.length;
      var Childs = new Array(length).join().split(',').map(function (i, index) {
        return index;
      });

      //console.log(Childs)

      if (dir === 'right') {

        offsetWidth.labels = Childs.reduce(function (sum, i) {
          DOM = (0, _reactDom.findDOMNode)(_this3.refs['li' + i]);
          if (i >= translateI && sum + DOM.offsetWidth < labelsWidth) {
            sum += DOM.offsetWidth;
            translateI = i;
          }
          return sum;
        }, 0);

        translateX = function (translateX) {
          return translateX > translate.max ? translate.max : translateX;
        }(translateX + offsetWidth.labels);
      } else if (dir === 'left') {

        offsetWidth.labels = Childs.reverse().reduce(function (sum, i) {
          DOM = (0, _reactDom.findDOMNode)(_this3.refs['li' + i]);
          if (i <= translateI && sum + DOM.offsetWidth < labelsWidth) {
            sum += DOM.offsetWidth;
            translateI = i;
          }
          return sum;
        }, 0);

        translateX = function (translateX) {
          return translateX < translate.min ? translate.min : translateX;
        }(translateX - offsetWidth.labels);
      }

      this.setState({
        translateX: translateX, translateI: translateI
      });

      /*const { range } = this.state;
       let length = this.props.children.length;
      let active;
      if ( dir === 'right' ) {
         active = ((active)=>{
          return active > length ? length : active;
        })(range.max + 1);
       } else {
         active = ((active)=>{
          return active < 0 ? 0 : active;
        })(range.min - 1);
       }
       let i = 0, w = 0,
        scrollWidth = 0,
        labelsWidth = this.labels.offsetWidth,
        titlesWidth = this.titles.offsetWidth,
        translate = {
          min: 0,
          max: titlesWidth - labelsWidth
        };
       this.range = active;
       new Array(active).join().split(',').map((tab, index)=>{
        scrollWidth += findDOMNode(this.refs['li' + index]).offsetWidth;
      });
       let translateX = translate.min;
       if ( ( scrollWidth - labelsWidth ) > 0 ) {
        while ( ++i ) {
          w += findDOMNode(this.refs['li' + (i-1)]).offsetWidth;
          if ( w > ( scrollWidth - labelsWidth ) ) {
            translateX = w;
            break;
          }
        }
      }
       ( translateX > translate.max ) && ( translateX = translate.max );
      this.setState({translateX});*/
    }
  }, {
    key: 'translateX',
    value: function translateX(dir) {
      var _this4 = this;

      var translateX = this.state.translateX;


      var offsetWidth = {
        titles: this.titles.offsetWidth,
        labels: this.labels.offsetWidth
      };

      var translate = {
        min: 0,
        max: offsetWidth.titles - offsetWidth.labels
      };

      var translateI = this.state.translateI;


      var DOM = void 0,
          labelsWidth = this.labels.offsetWidth;

      var length = this.props.children.length;
      var Childs = new Array(length).join().split(',').map(function (i, index) {
        return index;
      });

      console.log(Childs);

      if (dir === 'right') {

        offsetWidth.labels = Childs.reduce(function (sum, i) {
          DOM = (0, _reactDom.findDOMNode)(_this4.refs['li' + i]);
          if (i >= translateI && sum + DOM.offsetWidth < labelsWidth) {
            sum += DOM.offsetWidth;
            translateI = i;
          }
          return sum;
        }, 0);

        translateX = function (translateX) {
          return translateX > translate.max ? translate.max : translateX;
        }(translateX + offsetWidth.labels);
      } else if (dir === 'left') {

        offsetWidth.labels = Childs.reverse().reduce(function (sum, i) {
          DOM = (0, _reactDom.findDOMNode)(_this4.refs['li' + i]);
          if (i <= translateI && sum + DOM.offsetWidth < labelsWidth) {
            sum += DOM.offsetWidth;
            translateI = i;
          }
          return sum;
        }, 0);

        translateX = function (translateX) {
          return translateX < translate.min ? translate.min : translateX;
        }(translateX - offsetWidth.labels);
      }

      this.setState({
        translateX: translateX, translateI: translateI
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var tabs = {
        titles: [],
        contents: []
      };

      var child = [];

      var _state = this.state;
      var active = _state.active;
      var last = _state.last;
      var inkBar = _state.inkBar;
      var hasArrows = _state.hasArrows;
      var translateX = _state.translateX;
      var translateI = _state.translateI;
      // const count = Children.count(this.props.children);
      // const width = 100 / count;

      //console.log(translateI)

      var transform = 100 * -1;

      _react.Children.map(this.props.children, function (tab, key) {

        if (tab.type.name === 'Tab') {
          tabs.titles.push(_react2.default.createElement(
            'li',
            { ref: 'li' + key, className: (0, _classNames2.default)('tab-title', {
                active: key === active
              }), key: key, onClick: function onClick(e) {
                return _this5.active = (0, _extends3.default)({}, _this5.props, { active: key });
              } },
            typeof tab.props.label === 'string' ? _react2.default.createElement(_Button2.default, { text: tab.props.label, disabled: tab.props.disabled }) : tab.props.label
          ));

          if (key === active) {
            transform = 0;
          } else if (key > active) {
            transform = 100;
          }

          tabs.contents.push((0, _react.cloneElement)(tab, {
            className: (0, _classNames2.default)('tab-content', tab.props.className, {
              active: key === active
            }),
            style: {
              // width: width + '%',
              // transform: `translateX(${transform}%)`,
              // position: key === active ? 'relative' : 'absolute',
              //visibility: key === active || key === last ? 'visible' : 'hidden',
              display: key === active ? 'block' : 'none',
              opacity: key === active ? 1 : 0
            }, key: key
          }));
        } else {
          child.push(tab);
        }
      });

      return _react2.default.createElement(
        'div',
        { className: (0, _classNames2.default)('tabs', this.props.className) },
        _react2.default.createElement(
          'div',
          { className: 'tabs-header' },
          hasArrows && [_react2.default.createElement(
            'a',
            { href: '#', className: 'material-icon left',
              key: 'left', onClick: function onClick(e) {
                return _this5.paginate('left');
              } },
            'chevron_left'
          ), _react2.default.createElement(
            'a',
            { href: '#', className: 'material-icon right',
              key: 'right', onClick: function onClick(e) {
                return _this5.paginate('right');
              } },
            'chevron_right'
          )],
          _react2.default.createElement(
            'div',
            { ref: 'labels', className: (0, _classNames2.default)('tabs-labels', { hasArrows: hasArrows }) },
            _react2.default.createElement(
              'ul',
              { ref: 'titles', style: {
                  transform: 'translateX(-' + translateX + 'px)'
                } },
              tabs.titles,
              _react2.default.createElement('li', { className: 'ink-bar', style: inkBar })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'tabs-container' },
          _react2.default.createElement(
            'div',
            { className: 'tabs-content', style: {/*{width: count * 100 + '%'}*/} },
            tabs.contents
          )
        ),
        child
      );
    }
  }, {
    key: 'index',
    set: function set(active) {
      var _this6 = this;

      //const { active } = this.state;
      var i = 0,
          w = 0,
          scrollWidth = 0,
          labelsWidth = this.labels.offsetWidth,
          titlesWidth = this.titles.offsetWidth,
          translate = {
        min: 0,
        max: titlesWidth - labelsWidth
      };

      this.range = active;

      new Array(active + 1).join().split(',').map(function (tab, index) {
        scrollWidth += (0, _reactDom.findDOMNode)(_this6.refs['li' + index]).offsetWidth;
      });

      var translateX = translate.min;

      if (scrollWidth - labelsWidth > 0) {
        while (++i) {
          w += (0, _reactDom.findDOMNode)(this.refs['li' + (i - 1)]).offsetWidth;
          if (w > scrollWidth - labelsWidth) {
            translateX = w;
            break;
          }
        }
      }

      translateX > translate.max && (translateX = translate.max);
      this.setState({ translateX: translateX });
    }
  }, {
    key: 'range',
    set: function set(active) {
      var _this7 = this;

      var visibleWidth = 0;
      var labelsWidth = this.labels.offsetWidth;
      var range = this.state.range;
      var length = this.props.children.length;

      range.min = active;
      new Array(length).join().split(',').map(function (i, index) {
        return index;
      }).slice(active).map(function (i) {

        visibleWidth += (0, _reactDom.findDOMNode)(_this7.refs['li' + i]).offsetWidth;
        if (visibleWidth < labelsWidth) {
          range.max = i;
        }
      });

      // console.log(visibleWidth);
      // console.log(range);

      this.setState({ range: range });
    }
  }, {
    key: 'active',
    set: function set(props) {
      var _this8 = this;

      //const { translateX, translateI } = this.state;

      this.setState({
        hasArrows: this.titles.offsetWidth > this.labels.offsetWidth
      }, function () {
        var active = props.active;

        active = parseInt(active);
        var TAB = props.children[active];
        if (TAB) {
          if (TAB.props.disabled) {
            active = _this8.state.active;
          }

          /*const offsetWidth = {
            titles: this.titles.offsetWidth,
            labels: this.labels.offsetWidth
          };
           const translate = {
            min: 0,
            max: offsetWidth.titles - offsetWidth.labels
          };
           //let index = ;
          let length = props.children.length - 1, index;
          if ( active > this.state.active || translateI > active ) {
             index = active - 1;
            index = index < 0 ? 0 : index;
             this.setState({
              translateX: ((translateX)=>{
                return translateX > translate.max ? translate.max : translateX;
              })(translateX + findDOMNode(this.refs['li' + index]).offsetWidth)
            })
          } else if ( active < this.state.active || translateI < active ) {
            index = active + 1;
            index = index > length ? length : index;
             this.setState({
              translateX: ((translateX)=>{
                return translateX < translate.min ? translate.min : translateX;
              })(translateX - findDOMNode(this.refs['li' + index]).offsetWidth)
            })
          }*/

          var DOM = (0, _reactDom.findDOMNode)(_this8.refs['li' + active]);
          _this8.setState({
            active: active,
            translateI: active,
            last: _this8.state.active,
            inkBar: {
              width: DOM.offsetWidth,
              left: DOM.offsetLeft
            }
          }, function () {

            _this8.index = _this8.state.active;

            _this8.props.onChange(_this8.state.active);
          });
        }

        //this.translateX('right');
      });
    }
  }]);
  return Tabs;
}(_react.Component);

Tabs.propTypes = {
  active: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  onChange: _react.PropTypes.func
};
Tabs.defaultProps = {
  active: 0,
  onChange: function onChange() {}
};
exports.default = Tabs;
exports.Tab = _Tab2.default;

/**
 *
 * [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
 *
 * offsetWidth = 20;
 * translateX = 0;
 *
 * default range = [ 0, 3 ]
 * [ 0, 1, 2, 3 ], 4, 5, 6, 7, 8, 9
 *
 * set active(index) {
*
 *   let min =  Math.min(range)
 *   let max =  Math.max(range)
 *
 *   let { translateX } = this.state;
 *
 *   if ( index >= max ) {
 *
 *    translateX = this.offsetWidth(index) - this.offsetWidth(max);
 *
 *   }
 *
 *   else if ( index <= min ) {
 *
 *
 *
 *   }
 *
 * }
 *
 * get offsetWidth(length){
 *   return new Array(length).join().split(',').map((i, index)=>index).offsetWidth;
 * }
 *
 *
 *
 * // =============== 4
 * <- range = [ 0, 3 ]
 * active = 4
 *
 * call set active(index = 4){
 *
 *  let translateX;
 *
 *  if ( 4 > 3 ) {
 *
 *    translateX = this.offsetWidth(4) - this.offsetWidth(3) = 20;
 *
 *  }
 *
 *  -> range = [ 1, 2, 3, 4 ]
 *
 * }
 *
 * // =============== 6
 * <- range = [ 0, 3 ]
 * active = 6
 *
 * call set active(index = 6){
 *
 *  if ( 6 > 3 ) {
 *    translateX = this.offsetWidth(6) - this.offsetWidth(3);
 *  }
 *
 *  -> range = [ 3, 4, 5, 6 ]
 *
 * }
 *
 * // =============== 6
 * <- range = [ 3, 6 ]
 * active = 6
 *
 * call set active(index = 6){
 *
 *  if ( 6 > 3 ) {
 *    translateX = this.offsetWidth(6) - this.offsetWidth(3);
 *  }
 *
 *  -> range = [ 3, 4, 5, 6 ]
 * }
 */

/**
 *
 * active = 0
 *
 * set range(index){
 *
 *  let visibleWidth
 *    , { range } = this.state;
 *
*   range.min = index;
*
 *  new Array(this.props.children.length).join().split(',').map((i, index)=>index)
 *  .map(i=>{
 *
 *    visibleWidth += findDOMNode(this.refs['li' + i]).offsetWidth;
 *
 *
 *
 *  })
 *
 * }
 *
 */