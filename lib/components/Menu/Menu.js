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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Paper = require('components/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Ripple = require('components/Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

var _classNames = require('helpers/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = function (_Component) {
	(0, _inherits3.default)(Menu, _Component);

	function Menu(props) {
		(0, _classCallCheck3.default)(this, Menu);

		var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Menu).call(this, props));

		_this.state = {
			isOpen: props.isOpen
		};
		_this.handleClickOutside = _this.handleClickOutside.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(Menu, [{
		key: 'handleClickOutside',
		value: function handleClickOutside(e) {
			var handleClickOutside = this.props.handleClickOutside;
			var isOpen = this.state.isOpen;

			if (isOpen && handleClickOutside) {
				this.setState({ isOpen: !isOpen });
			}
		}
	}, {
		key: 'handleToggle',
		value: function handleToggle(e) {
			var target = e.target;


			if (target === (0, _reactDom.findDOMNode)(this.refs.control)) {
				this.setState({
					isOpen: true
				});
			}

			if (target.parentElement.className === "list-item") {
				this.setState({
					isOpen: false
				});
			}
		}
	}, {
		key: 'handleControlClick',
		value: function handleControlClick(e) {
			var isOpen = this.state.isOpen;

			this.setState({
				isOpen: !isOpen
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var control = _props.control;
			var className = _props.className;
			var isOpen = _props.isOpen;
			var disableOnClickOutside = _props.disableOnClickOutside;
			var enableOnClickOutside = _props.enableOnClickOutside;
			var handleClickOutside = _props.handleClickOutside;
			var zDepth = _props.zDepth;
			var other = (0, _objectWithoutProperties3.default)(_props, ['control', 'className', 'isOpen', 'disableOnClickOutside', 'enableOnClickOutside', 'handleClickOutside', 'zDepth']);


			return _react2.default.createElement(
				'div',
				(0, _extends3.default)({ ref: 'menu', className: (0, _classNames2.default)('menu', className, {
						isOpen: this.state.isOpen || isOpen
					}) }, other, { onClick: this.handleToggle.bind(this) }),
				control && (0, _react.cloneElement)(control, {
					ref: 'control',
					onClick: this.handleControlClick.bind(this)
				}),
				_react2.default.createElement(
					_Paper2.default,
					{ zDepth: zDepth, className: 'menu-container' },
					this.props.children
				)
			);
		}

		/*render() {
  	const { onChange, children, ...other } = this.props;
  	return (
  		<Paper {...other}>
  			<div className={classNames("menu")}>
  				{ Children.map(children, (child)=>{
  					return cloneElement(child, {
  						onClick: (e, o)=>{
  							const { onClick } = child.props;
  							onClick && onClick(e);
  							onChange && onChange(e, o);
  						}
  					})
  				}) }
  			</div>
  		</Paper>
  	);
  }*/

	}]);
	return Menu;
}(_react.Component);

Menu.propTypes = {
	onChange: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.bool]),
	control: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.element]),
	mountTo: _react.PropTypes.any,
	isOpen: _react.PropTypes.bool,
	handleClickOutside: _react.PropTypes.bool
};
Menu.defaultProps = {
	onChange: false,
	control: false,
	isOpen: false,
	handleClickOutside: true
};

var Item = function (_Component2) {
	(0, _inherits3.default)(Item, _Component2);

	function Item() {
		(0, _classCallCheck3.default)(this, Item);
		return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Item).apply(this, arguments));
	}

	(0, _createClass3.default)(Item, [{
		key: 'render',
		value: function render() {
			var _props2 = this.props;
			var text = _props2.text;
			var value = _props2.value;
			var className = _props2.className;
			var children = _props2.children;
			var _onClick = _props2.onClick;
			var ripple = _props2.ripple;
			var other = (0, _objectWithoutProperties3.default)(_props2, ['text', 'value', 'className', 'children', 'onClick', 'ripple']);


			return _react2.default.createElement(
				_Ripple2.default,
				(0, _extends3.default)({ isCenter: ripple.isCenter, container: _react2.default.createElement('div', { className: (0, _classNames2.default)('menu-item', className),
						onClick: function onClick(e) {
							_onClick && _onClick(e, { value: value, text: text });
						} }) }, other),
				_react2.default.createElement(
					'div',
					{ className: 'menu-item-inner' },
					children ? children : text
				)
			);
		}
	}]);
	return Item;
}(_react.Component);

Item.propTypes = {
	value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.bool]),
	text: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	onClick: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.bool]),
	ripple: _react.PropTypes.object
};
Item.defaultProps = {
	value: false,
	text: '',
	onClick: false,
	ripple: {
		isCenter: false
	}
};

var Divider = function (_Component3) {
	(0, _inherits3.default)(Divider, _Component3);

	function Divider() {
		(0, _classCallCheck3.default)(this, Divider);
		return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Divider).apply(this, arguments));
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

exports.default = (0, _reactOnclickoutside2.default)(Menu);
exports.Item = Item;
exports.Divider = Divider;