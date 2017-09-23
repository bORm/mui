import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { render, unmountComponentAtNode } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {EventEmitter} from 'fbemitter';
const emitter = new EventEmitter();
const renderSubtreeIntoContainer = require("react-dom").unstable_renderSubtreeIntoContainer;
import { classNames } from 'helpers'

class Portal extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		mountTo: PropTypes.string,
		isOpen: PropTypes.bool,
		toggle: PropTypes.shape({
			before: PropTypes.func,
			after: PropTypes.func
		}),
		componentWillUnmount: PropTypes.func
	};

	static defaultProps = {
		mountTo: 'portals',
		isOpen: false,
		toggle: {
			before: ()=>{},
			after: ()=>{}
		}
	};

	static isOpen = false;

	static isBool(boolean) {
		return typeof boolean === 'boolean' ? boolean : false;
	}

	static toggle = (id, isOpen)=> {
		emitter.emit('toggle', id, Portal.isBool(isOpen));
	};

	constructor(props) {
		super(props);
		this.portal = null;
		//this.shouldComponentUpdate = ::PureRenderMixin.shouldComponentUpdate;
		this.componentWillUnmount = props.componentWillUnmount || ::this.unMount;
	}

	componentDidMount() {
		const { id, isOpen } = this.props;
		this.toggle(id, Portal.isBool(isOpen));
	}

	toggle(id, isOpen) {
		const { toggle } = this.props;
		emitter.once('toggle', ::this.toggle);
		if ( id !== this.props.id ) return;
		toggle.before(id, isOpen);
		Portal.isOpen = isOpen;
		this.mount(id, isOpen);
		toggle.after(id, isOpen);
	}

	mount(id, isOpen = false) {

		this.portal = document.getElementById(id);
		const { className } = this.props;

		if ( !this.portal ) {
			this.portal = document.createElement('div');
			this.portal.id = id;
			document.getElementById(this.props.mountTo).appendChild(this.portal);
		}
		if ( isOpen && !!(this.portal) ) {
			this.child();
			// Fix portal is null
			const portal = this.portal;
			this.timer = setTimeout(()=>{
				portal.className = classNames(className, {
					open: isOpen
				});
				this.timer && clearTimeout(this.timer);
			}, 100);
		}

		( !isOpen && this.portal ) && this.unMount();
	}

	child() {
		const { children } = this.props;
		renderSubtreeIntoContainer(this, children, this.portal);
	}

	componentDidUpdate(props) {
		if (this.portal && Portal.isOpen && props.id === this.props.id) {
			return this.child();
		}
	}
	unMount()  {
		Portal.isOpen = false;
		if ( this.portal ) {
			unmountComponentAtNode(this.portal);
			document.getElementById(this.props.mountTo).removeChild(this.portal);
			this.portal = null;
		}
	}

	render() {return null}

}

export default Portal;
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
