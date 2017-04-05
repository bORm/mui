'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Portal = require('../Portal/Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _classNames2 = require('helpers/classNames');

var _classNames3 = _interopRequireDefault(_classNames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = (_temp = _class = function (_Component) {
	(0, _inherits3.default)(Modal, _Component);

	function Modal() {
		(0, _classCallCheck3.default)(this, Modal);
		return (0, _possibleConstructorReturn3.default)(this, (Modal.__proto__ || (0, _getPrototypeOf2.default)(Modal)).apply(this, arguments));
	}

	(0, _createClass3.default)(Modal, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    id = _props.id,
			    size = _props.size,
			    className = _props.className,
			    style = _props.style,
			    closeButton = _props.closeButton,
			    header = _props.header,
			    isOpen = _props.isOpen,
			    onClose = _props.onClose,
			    modal = _props.modal,
			    mountTo = _props.mountTo,
			    other = (0, _objectWithoutProperties3.default)(_props, ['id', 'size', 'className', 'style', 'closeButton', 'header', 'isOpen', 'onClose', 'modal', 'mountTo']);


			var toggle = {
				before: function before(id, isOpen) {
					modal && Modal.bodyStyle(isOpen, modal);
				},
				after: function after(id, isOpen) {}
			};

			return _react2.default.createElement(
				_Portal2.default,
				(0, _extends3.default)({ id: id, mountTo: mountTo, isOpen: isOpen }, toggle, { className: className }),
				_react2.default.createElement(
					'div',
					{ className: (0, _classNames3.default)("modal", (0, _defineProperty3.default)({}, size, true)) },
					_react2.default.createElement(
						_Paper2.default,
						{ zDepth: 2, style: style },
						_react2.default.createElement(
							'header',
							{ className: 'clearfix' },
							closeButton && function () {
								return _react2.default.createElement(
									'div',
									{ className: 'modal-close' },
									_react2.default.createElement(
										'i',
										{ className: 'icon material-icons', onClick: function onClick(e) {
												_Portal2.default.toggle(id, false);
												onClose && onClose(e, id);
											} },
										'close'
									)
								);
							}(),
							header && _react2.default.createElement(
								'div',
								{ className: 'modal-header' },
								header
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'modal-body' },
							this.props.children
						)
					)
				)
			);
		}
	}], [{
		key: 'bodyStyle',


		/*componentDidUpdate(props){
  	const { id, isOpen } = this.props;
  	if(!isOpen && props.isOpen){
  		Modal.toggle(id, false);
  	}else if(isOpen && !props.isOpen){
  		Modal.toggle(id, true);
  	}
  }*/

		value: function bodyStyle(isOpen, modal) {
			if (isOpen && modal) {
				var scrollWidth = Modal.scrollWidth();
				document.body.style.cssText = 'overflow:hidden !important;' + 'padding-right:' + scrollWidth + 'px';
			} else {
				document.body.style.cssText = '';
			}
		}
	}, {
		key: 'scrollWidth',
		value: function scrollWidth() {
			var scrollDiv = document.createElement("div");
			scrollDiv.style.cssText = 'width:100px;height:100px;overflow:scroll !important;position:absolute;top:-9999px';
			document.body.appendChild(scrollDiv);
			var result = scrollDiv.offsetWidth - scrollDiv.clientWidth;
			//console.log(result);
			document.body.removeChild(scrollDiv);
			var hasScroll = window.innerWidth > document.documentElement.clientWidth;
			return hasScroll ? result : 0;
		}
	}]);
	return Modal;
}(_react.Component), _class.propTypes = {
	id: _react.PropTypes.string.isRequired,
	size: _react.PropTypes.oneOf(['large', 'medium', 'small', 'mini']),
	header: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.array, _react.PropTypes.element, _react.PropTypes.string]),
	body: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.element, _react.PropTypes.array]),
	footer: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.array, _react.PropTypes.element]),
	className: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),
	style: _react.PropTypes.object,
	isOpen: _react.PropTypes.bool,
	onClose: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func]),
	isMount: _react.PropTypes.bool,
	closeButton: _react.PropTypes.bool,
	onClickOutside: _react.PropTypes.shape({
		close: _react.PropTypes.bool,
		callback: _react.PropTypes.func
	}),
	modal: _react.PropTypes.bool
}, _class.defaultProps = {
	size: 'medium',
	header: [],
	body: false,
	desc: false,
	footer: false,
	className: false,
	style: {},
	isOpen: false,
	onClose: false,
	isMount: false,
	closeButton: true,
	onClickOutside: {
		close: true,
		callback: function callback() {}
	},
	modal: true,
	displayName: 'modal',
	mountTo: 'modals'
}, _class.toggle = _Portal2.default.toggle, _temp);
exports.default = Modal;
//# sourceMappingURL=Modal.js.map
