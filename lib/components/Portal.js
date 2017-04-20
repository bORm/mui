'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _fbemitter = require('fbemitter');

var _helpers = require('helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = new _fbemitter.EventEmitter();
var renderSubtreeIntoContainer = require("react-dom").unstable_renderSubtreeIntoContainer;

var Portal = function (_Component) {
	(0, _inherits3.default)(Portal, _Component);
	(0, _createClass3.default)(Portal, null, [{
		key: 'isBool',
		value: function isBool(boolean) {
			return typeof boolean === 'boolean' ? boolean : false;
		}
	}]);

	function Portal(props) {
		(0, _classCallCheck3.default)(this, Portal);

		var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Portal).call(this, props));

		_this.portal = null;
		//this.shouldComponentUpdate = ::PureRenderMixin.shouldComponentUpdate;
		_this.componentWillUnmount = props.componentWillUnmount || _this.unMount.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(Portal, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props;
			var id = _props.id;
			var isOpen = _props.isOpen;

			this.toggle(id, Portal.isBool(isOpen));
		}
	}, {
		key: 'toggle',
		value: function toggle(id, isOpen) {
			var toggle = this.props.toggle;

			emitter.once('toggle', this.toggle.bind(this));
			if (id !== this.props.id) return;
			toggle.before(id, isOpen);
			Portal.isOpen = isOpen;
			this.mount(id, isOpen);
			toggle.after(id, isOpen);
		}
	}, {
		key: 'mount',
		value: function mount(id) {
			var _this2 = this;

			var isOpen = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];


			this.portal = document.getElementById(id);
			var className = this.props.className;


			if (!this.portal) {
				this.portal = document.createElement('div');
				this.portal.id = id;
				document.getElementById(this.props.mountTo).appendChild(this.portal);
			}
			if (isOpen && !!this.portal) {
				(function () {
					_this2.child();
					// Fix portal is null
					var portal = _this2.portal;
					_this2.timer = setTimeout(function () {
						portal.className = (0, _helpers.classNames)(className, {
							open: isOpen
						});
						_this2.timer && clearTimeout(_this2.timer);
					}, 100);
				})();
			}

			!isOpen && this.portal && this.unMount();
		}
	}, {
		key: 'child',
		value: function child() {
			var children = this.props.children;

			renderSubtreeIntoContainer(this, children, this.portal);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(props) {
			if (this.portal && Portal.isOpen && props.id === this.props.id) {
				return this.child();
			}
		}
	}, {
		key: 'unMount',
		value: function unMount() {
			Portal.isOpen = false;
			if (this.portal) {
				(0, _reactDom.unmountComponentAtNode)(this.portal);
				document.getElementById(this.props.mountTo).removeChild(this.portal);
				this.portal = null;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);
	return Portal;
}(_react.Component);

Portal.propTypes = {
	id: _react.PropTypes.string.isRequired,
	mountTo: _react.PropTypes.string,
	isOpen: _react.PropTypes.bool,
	toggle: _react.PropTypes.shape({
		before: _react.PropTypes.func,
		after: _react.PropTypes.func
	}),
	componentWillUnmount: _react.PropTypes.func
};
Portal.defaultProps = {
	mountTo: 'portals',
	isOpen: false,
	toggle: {
		before: function before() {},
		after: function after() {}
	}
};
Portal.isOpen = false;

Portal.toggle = function (id, isOpen) {
	emitter.emit('toggle', id, Portal.isBool(isOpen));
};

exports.default = Portal;
/*

import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import {EventEmitter} from 'fbemitter';
import { classNames } from 'helpers'
const emitter = new EventEmitter();
const KEYCODES = {
	ESCAPE: 27,
};

export default class Portal extends React.Component {

	static propTypes = {
		children: React.PropTypes.element.isRequired,
		openByClickOn: React.PropTypes.element,
		closeOnEsc: React.PropTypes.bool,
		closeOnOutsideClick: React.PropTypes.bool,
		isOpened: React.PropTypes.bool,
		onOpen: React.PropTypes.func,
		onClose: React.PropTypes.func,
		beforeClose: React.PropTypes.func,
		onUpdate: React.PropTypes.func,
		toggle: React.PropTypes.shape({
			before: React.PropTypes.func,
			after: React.PropTypes.func
		}),
	};

	static defaultProps = {
		onOpen: () => {},
		onClose: () => {},
		onUpdate: () => {},
		toggle: {
			before: ()=>{},
			after: ()=>{}
		}
	};

	static isBool(boolean) {
		return typeof boolean === 'boolean' ? boolean : false;
	}

	static toggle = (id, isOpen)=> {
		emitter.emit('toggle', id, Portal.isBool(isOpen));
	};

	toggle(id, isOpen) {
		const { toggle } = this.props;
		emitter.once('toggle', ::this.toggle);
		if ( id !== this.props.id ) return;
		toggle.before(id, isOpen);
		Portal.isOpen = isOpen;
		//this.mount(id, isOpen);
		if ( isOpen ) {
			if (this.state.isOpen) {
				this.renderPortal(this.props);
			} else {
				this.openPortal(this.props);
			}
		}	else {
			this.closePortal();
		}
		toggle.after(id, isOpen);
	}

	constructor() {
		super();
		this.state = { isOpen: false };
		this.handleWrapperClick = this.handleWrapperClick.bind(this);
		this.closePortal = this.closePortal.bind(this);
		this.handleOutsideMouseClick = this.handleOutsideMouseClick.bind(this);
		this.handleKeydown = this.handleKeydown.bind(this);
		this.portal = null;
		this.node = null;
	}

	componentDidMount() {
		if (this.props.closeOnEsc) {
			document.addEventListener('keydown', this.handleKeydown);
		}

		if (this.props.closeOnOutsideClick) {
			document.addEventListener('mouseup', this.handleOutsideMouseClick);
			document.addEventListener('touchstart', this.handleOutsideMouseClick);
		}

		const { id, isOpen } = this.props;
		this.toggle(id, Portal.isBool(isOpen));
		/!*if (this.props.isOpened) {
			this.openPortal();
		}*!/
	}

	componentWillReceiveProps(newProps) {
		// portal's 'is open' state is handled through the prop isOpened
		if (typeof newProps.isOpened !== 'undefined') {
			if (newProps.isOpened) {
				if (this.state.isOpen) {
					this.renderPortal(newProps);
				} else {
					this.openPortal(newProps);
				}
			}
			if (!newProps.isOpened && this.state.isOpen) {
				this.closePortal();
			}
		}

		// portal handles its own 'is open' state
		if (typeof newProps.isOpened === 'undefined' && this.state.isOpen) {
			this.renderPortal(newProps);
		}
	}

	componentWillUnmount() {
		if (this.props.closeOnEsc) {
			document.removeEventListener('keydown', this.handleKeydown);
		}

		if (this.props.closeOnOutsideClick) {
			document.removeEventListener('mouseup', this.handleOutsideMouseClick);
			document.removeEventListener('touchstart', this.handleOutsideMouseClick);
		}

		this.closePortal(true);
	}

	handleWrapperClick(e) {
		e.preventDefault();
		e.stopPropagation();
		if (this.state.isOpen) { return; }
		this.openPortal();
	}

	openPortal(props = this.props) {
		this.setState({ isOpen: true });
		this.renderPortal(props);
		this.props.onOpen(this.node);
	}

	closePortal(isUnmounted = false) {
		const resetPortalState = () => {
			if (this.node) {
				ReactDOM.unmountComponentAtNode(this.node);
				document.body.removeChild(this.node);
			}
			this.portal = null;
			this.node = null;
			if (isUnmounted !== true) {
				this.setState({ isOpen: false });
			}
		};

		if (this.state.isOpen) {
			if (this.props.beforeClose) {
				this.props.beforeClose(this.node, resetPortalState);
			} else {
				resetPortalState();
			}

			this.props.onClose();
		}
	}

	handleOutsideMouseClick(e) {
		if (!this.state.isOpen) { return; }

		const root = findDOMNode(this.portal);
		if (root.contains(e.target) || (e.button && e.button !== 0)) { return; }

		e.stopPropagation();
		this.closePortal();
	}

	handleKeydown(e) {
		if (e.keyCode === KEYCODES.ESCAPE && this.state.isOpen) {
			this.closePortal();
		}
	}

	renderPortal(props) {
		if (!this.node) {
			this.node = document.createElement('div');
			document.body.appendChild(this.node);
		}

		let children = props.children;
		// https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
		if (typeof props.children.type === 'function') {
			children = React.cloneElement(props.children, { closePortal: this.closePortal });
		}

		this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
			this,
			children,
			this.node,
			this.props.onUpdate
		);

		this.timer = setTimeout(()=>{
			this.node.className = classNames(props.className, {
				open: true
			});
			this.timer && clearTimeout(this.timer);
		}, 100);
	}

	render() {
		if (this.props.openByClickOn) {
			return React.cloneElement(this.props.openByClickOn, { onClick: this.handleWrapperClick });
		}
		return null;
	}
}*/