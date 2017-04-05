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

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Modal2 = require('../Modal/Modal');

var _Modal3 = _interopRequireDefault(_Modal2);

var _Portal = require('../Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _classNames2 = require('helpers/classNames');

var _classNames3 = _interopRequireDefault(_classNames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notify = (_temp = _class = function (_Modal) {
	(0, _inherits3.default)(Notify, _Modal);

	function Notify() {
		(0, _classCallCheck3.default)(this, Notify);
		return (0, _possibleConstructorReturn3.default)(this, (Notify.__proto__ || (0, _getPrototypeOf2.default)(Notify)).apply(this, arguments));
	}

	(0, _createClass3.default)(Notify, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    id = _props.id,
			    size = _props.size,
			    className = _props.className,
			    style = _props.style,
			    closeButton = _props.closeButton,
			    header = _props.header,
			    isOpen = _props.isOpen,
			    onClose = _props.onClose,
			    mountTo = _props.mountTo,
			    other = (0, _objectWithoutProperties3.default)(_props, ['id', 'size', 'className', 'style', 'closeButton', 'header', 'isOpen', 'onClose', 'mountTo']);


			var toggle = {
				before: function before(id, isOpen) {
					Notify.wait && clearTimeout(Notify.wait);
				},
				after: function after(id, isOpen) {
					isOpen && (Notify.wait = setTimeout(function () {
						Notify.toggle(id, false);
						clearTimeout(Notify.wait);
					}, parseInt(_this2.props.wait)));
				}
			};

			var portalProps = { id: id, mountTo: mountTo, isOpen: isOpen, toggle: toggle, className: className };

			return _react2.default.createElement(
				_Portal2.default,
				portalProps,
				_react2.default.createElement(
					'div',
					{ className: (0, _classNames3.default)("notify", (0, _defineProperty3.default)({}, size, true)) },
					_react2.default.createElement(
						_Paper2.default,
						{ zDepth: 2, style: style },
						_react2.default.createElement(
							'header',
							{ className: 'clearfix' },
							closeButton && function () {
								return _react2.default.createElement(
									'div',
									{ className: 'notify-close' },
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
								{ className: 'notify-header' },
								header
							)
						),
						this.props.children
					)
				)
			);
		}
	}]);
	return Notify;
}(_Modal3.default), _class.propTypes = (0, _extends3.default)({}, _Modal3.default.propTypes, {
	wait: _react.PropTypes.number.isRequired
}), _class.defaultProps = (0, _extends3.default)({}, _Modal3.default.defaultProps, {
	mountTo: 'notifies',
	wait: 5000
}), _class.wait = null, _temp);
exports.default = Notify;
//# sourceMappingURL=Notify.js.map
