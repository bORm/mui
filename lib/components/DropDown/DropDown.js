'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Item = undefined;

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

var _reactDom = require('react-dom');

var _Button = require('components/Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _classNames = require('helpers/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _isMounted = require('helpers/isMounted');

var _isMounted2 = _interopRequireDefault(_isMounted);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropDown = function (_Component) {
	(0, _inherits3.default)(DropDown, _Component);

	function DropDown(props) {
		(0, _classCallCheck3.default)(this, DropDown);

		var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DropDown).call(this, props));

		_this.state = {
			isOpen: props.isOpen || false,
			rect: {},
			maxHeight: 0,
			placement: 'top-left'
		};

		_this.control = null;
		_this.handleClickOutside = _this.handleClickOutside.bind(_this);
		_this.debounceFn = (0, _lodash2.default)(_this.getHiddenMenuOffset.bind(_this), 250);
		return _this;
	}

	(0, _createClass3.default)(DropDown, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(props) {
			if (this.state.isOpen !== props.isOpen) {
				this.setState({
					isOpen: props.isOpen
				}, this.handleMenuToggle.bind(this));
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var control = _props.control;
			var _onChange = _props.onChange;
			var autoClose = _props.autoClose;
			var children = _props.children;
			var className = _props.className;
			var toggle = _props.toggle;
			var other = (0, _objectWithoutProperties3.default)(_props, ['control', 'onChange', 'autoClose', 'children', 'className', 'toggle']);
			var _state = this.state;
			var isOpen = _state.isOpen;
			var maxHeight = _state.maxHeight;
			var placement = _state.placement;


			return _react2.default.createElement(
				'div',
				{ className: (0, _classNames2.default)('drop', className, {
						isOpen: isOpen
					}) },
				(0, _react.cloneElement)(control, {
					ref: 'control',
					className: 'drop-control',
					onMouseDown: function onMouseDown(e) {
						_this2.setState({
							isOpen: toggle ? !isOpen : true
						}, _this2.handleMenuToggle.bind(_this2));
					}
				}),
				_react2.default.createElement(
					'div',
					{ ref: 'container', className: (0, _classNames2.default)('drop-container', placement) },
					_react2.default.createElement(
						_Menu2.default,
						{ ref: 'menu', className: 'drop-menu', style: { maxHeight: maxHeight }, onChange: function onChange(e, value) {
								isOpen && _onChange && _onChange(e, value);
								var timeOut = null;
								timeOut = setTimeout(function () {
									if ((0, _isMounted2.default)(_this2)) {
										autoClose && _this2.setState({ isOpen: false });
									}
									clearTimeout(timeOut);
								}, 250);
							} },
						children
					)
				)
			);
		}
	}, {
		key: 'handleMenuToggle',
		value: function handleMenuToggle(e) {
			var isOpen = this.state.isOpen;

			return isOpen ? this.handleMenuExpand(e) : this.handleMenuCollapse(e);
		}
	}, {
		key: 'handleClickOutside',
		value: function handleClickOutside(e) {
			var isOpen = this.state.isOpen;

			if (isOpen && this.props.handleClickOutside) {
				this.setState({ isOpen: !isOpen });
			}
		}
	}, {
		key: 'handleMenuExpand',
		value: function handleMenuExpand() {
			this.getHiddenMenuOffset();
		}
	}, {
		key: 'handleMenuCollapse',
		value: function handleMenuCollapse() {}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.control = (0, _reactDom.findDOMNode)(this.refs.control);
			this.getHiddenMenuOffset();
			window.addEventListener('resize', this.debounceFn);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('resize', this.debounceFn);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			var isOpen = this.props.isOpen;

			if (isOpen !== prevProps.isOpen) {
				this.handleMenuToggle();
			}
		}
	}, {
		key: 'getHiddenMenuOffset',
		value: function getHiddenMenuOffset() {
			var rect = this.control.getBoundingClientRect();

			var cords = {
				top: rect.top,
				left: rect.left,
				bottom: document.documentElement.clientHeight - rect.top,
				right: document.documentElement.clientWidth - rect.left
			};

			var maxHeight = cords.bottom,
			    maxWidth = cords.left,
			    placement = void 0;

			// Decide if place the dropdown below or above the input
			if (maxHeight < (0, _reactDom.findDOMNode)(this.refs.menu).clientHeight + 20 && cords.top > cords.bottom) {
				maxHeight = cords.top;
				placement = "top-";
			} else {
				placement = "bottom-";
			}

			// Decide if place the dropdown below or above the input
			if (maxWidth < (0, _reactDom.findDOMNode)(this.refs.menu).clientWidth + 20 && cords.left > cords.right) {
				placement += "left";
			} else {
				placement += "right";
			}

			this.setState({ rect: rect, maxHeight: maxHeight, placement: placement });
		}
	}]);
	return DropDown;
}(_react.Component);

DropDown.propTypes = {
	control: _react.PropTypes.element,
	isOpen: _react.PropTypes.bool,
	autoClose: _react.PropTypes.bool,
	handleClickOutside: _react.PropTypes.bool,
	toggle: _react.PropTypes.bool,
	onChange: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func])
};
DropDown.defaultProps = {
	control: _react2.default.createElement(_Button2.default, { icon: 'more_vert' }),
	isOpen: false,
	autoClose: true,
	handleClickOutside: true,
	toggle: true,
	onChange: false
};
exports.default = (0, _reactOnclickoutside2.default)(DropDown, 'react-datepicker__tether-element');
exports.Item = _Menu.Item;