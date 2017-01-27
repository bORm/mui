import React, { Component, PropTypes } from 'react';
import ReactDOM, { render, findDOMNode, unmountComponentAtNode } from 'react-dom';
const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

import EventEmitter from 'fbemitter/lib/BaseEventEmitter';
const emitter = new EventEmitter();

import ExecutionEnvironment from 'exenv';
const { canUseDOM } = ExecutionEnvironment;
import { classNames } from 'helpers'
// import isMounted from 'util/isMounted'
// import Modal from 'react-modal'

/*class Portal extends Component {

	static propTypes = {
		onClickOut: PropTypes.func,
		isOpen: PropTypes.bool
	};

	static defaultProps = {
		isOpen: false
	};

	static node = null;
	constructor(props, context) {
		super(props, context);
		this.state = {
			isOpen: props.isOpen
		};

		if (canUseDOM) {

			if ( !document.getElementById(props.id) ) {
				Portal.node = document.createElement('div');
				Portal.node.id = props.id;
				document.body.appendChild(Portal.node);
			}

			this.handleClickOut = e => {
				if (typeof this.props.onClickOut === 'function') {
					const root = findDOMNode(this.element);
					if (!root.contains(e.target)) {
						this.props.onClickOut(e, Portal.node, this.element);
					}
				}
			};

			document.addEventListener('click', this.handleClickOut);
		}
		this.componentWillUnmount = props.componentWillUnmount || ::this.unMount;
	}

	componentDidMount() {
		const { id, isOpen } = this.props;
		this.toggle(id, Portal.isBool(isOpen));
	}

	static isBool(boolean) {
		return typeof boolean === 'boolean' ? boolean : false;
	}
	static toggle = (id, isOpen)=> {
		Portal.isOpen[id] = Portal.isBool(isOpen);
		emitter.emit('toggle', id, isOpen);
	};

	static isOpen = {};
	toggle(id, isOpen){
		debugger
		emitter.once('toggle', ::this.toggle);
		Portal.isOpen[id] = Portal.isBool(isOpen);
		this.mount(this.props, Portal.isOpen);
	}

	componentDidUpdate(props, state) { // eslint-disable-line
		// console.log(props, state);
		console.log(Portal.isOpen);
		Portal.isOpen[props.id] && this.mount(props, Portal.isOpen);
	}
	mount(props, isOpen){
		props = props || this.props;
		if ( isOpen[props.id] ) {

			if ( !this.element ) {
				this.element = renderSubtreeIntoContainer(
					this,
					<div/>,
					Portal.node
				);
				render(
					<div {...((props)=>{
						delete props.isOpen;
						delete props.id;
						return props;
					})({...props, ...{}})} style={{
						position: 'fixed',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						margin: 'auto',
						width: 400,
						height: 400,
						backgroundColor: '#fff',
						boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
						padding: 16
					}} />,
					this.element
				)
			}	else {
				render(
					<div {...((props)=>{
						delete props.isOpen;
						return props;
					})({...props, ...{}})} style={{
						position: 'fixed',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						margin: 'auto',
						width: 400,
						height: 400,
						backgroundColor: '#fff',
						boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
						padding: 16
					}} />,
					this.element
				)
			}

			/!*this.element = renderSubtreeIntoContainer(
				this,
				<div {...((props)=>{
					delete props.isOpen;
					return props;
				})({...props, ...{}})} style={{
					position: 'fixed',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					margin: 'auto',
					width: 400,
					height: 400,
					backgroundColor: '#fff',
					boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
					padding: 16
				}} />,
				this.node
			);*!/
		}	else {
			this.element && this.unMount();
		}
	}

	unMount(){
		if (canUseDOM) {
			document.removeEventListener('click', this.handleClickOut);
			//document.body.removeChild(this.node);
			if (this.element) {
				Portal.node.removeChild(this.element);
				this.element = null;
			}
		}
	}

	handleClickOut() {
		if (this.props.onClickOut) {
			this.props.onClickOut();
		}
	}

	/!*constructor(props, context) {
		super(props, context);
		this.state = {
			isOpen: props.isOpen
		};

		if (canUseDOM) {

			if ( !document.getElementById(props.id) ) {
				this.node = document.createElement('div');
				this.node.id = props.id;
				document.body.appendChild(this.node);
			}

			this.handleClickOut = e => {
				if (typeof this.props.onClickOut === 'function') {
					const root = findDOMNode(this.element);
					if (!root.contains(e.target)) {
						this.props.onClickOut(e, this.node, this.element);
					}
				}
			};

			document.addEventListener('click', this.handleClickOut);
		}
		this.componentWillUnmount = props.componentWillUnmount || ::this.unMount;
	}

	handleClickOut() {
		if (this.props.onClickOut) {
			this.props.onClickOut();
		}
	}

	componentDidMount() {
		const { id, isOpen } = this.props;
		this.toggle(id, isOpen);
	}

	unMount(){
		if (canUseDOM) {
			document.removeEventListener('click', this.handleClickOut);
			//document.body.removeChild(this.node);
			if (this.element) {
				this.node.removeChild(this.element);
				this.element = null;
			}
		}
	}

	static isOpen = false;
	static toggle = (id, isOpen)=> {
		console.log(isOpen);
		emitter.emit('toggle', id, isOpen);
	};

	toggle(id, isOpen){
		console.log(id, isOpen);
		emitter.once('toggle', ::this.toggle);
		if ( id === this.props.id ) {
			//this.setState({isOpen});
			Portal.isOpen = isOpen;
		}
	}

	componentWillUpdate(props, state) { // eslint-disable-line
		console.log(props, state);
		console.log(Portal.isOpen);
		(props.id === this.props.id) && this.mount(props, Portal.isOpen);
	}

	mount(props, isOpen){
		props = props || this.props;
		if ( isOpen ) {
			this.element = renderSubtreeIntoContainer(
				this,
				<div {...((props)=>{
					delete props.isOpen;
					return props;
				})({...props, ...{}})} style={{
					position: 'fixed',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					margin: 'auto',
					width: 400,
					height: 400,
					backgroundColor: '#fff',
					boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
					padding: 16
				}} />,
				this.node
			);
		}	else {
			this.element && this.unMount();
		}
	}*!/

	render() {
		return null;
	}

}*/

/*
export default class extends Modal {

	static defaultProps = {
		style: {
			overlay: {
				position        : 'fixed',
				top             : 0,
				left            : 0,
				right           : 0,
				bottom          : 0,
				backgroundColor : 'rgba(255, 255, 255, 0.75)'
			},
			content: {
				position                : 'absolute',
				top                     : '40px',
				left                    : '40px',
				right                   : '40px',
				bottom                  : '40px',
				border                  : '1px solid #ccc',
				background              : '#fff',
				overflow                : 'auto',
				WebkitOverflowScrolling : 'touch',
				borderRadius            : '4px',
				outline                 : 'none',
				padding                 : '20px'
			}
		},
		defaultStyles : {
			overlay: {
				position        : 'fixed',
				top             : 0,
				left            : 0,
				right           : 0,
				bottom          : 0,
				backgroundColor : 'rgba(255, 255, 255, 0.75)'
			},
			content: {
				position                : 'absolute',
				top                     : '40px',
				left                    : '40px',
				right                   : '40px',
				bottom                  : '40px',
				border                  : '1px solid #ccc',
				background              : '#fff',
				overflow                : 'auto',
				WebkitOverflowScrolling : 'touch',
				borderRadius            : '4px',
				outline                 : 'none',
				padding                 : '20px'
			}
		}
	};

	componentWillMount(){
		const { id, isOpen } = this.props;
		this.toggle(id, isOpen);
	}

	static isBool(boolean) {
		return typeof boolean === 'boolean' ? boolean : false;
	}
	static toggle = (id, isOpen)=> {
		Portal.isOpen[id] = Portal.isBool(isOpen);
		emitter.emit('toggle', id, isOpen);
	};

	static isOpen = {};
	toggle(id, isOpen){
		debugger
		emitter.once('toggle', ::this.toggle);
		/!*this.renderPortal({
			...this.props,
			isOpen
		});*!/
		isOpen ? this.open() : this.close();
	}
}*/

/*export default class ModalPortal extends React.Component {
	static propTypes = {
		onClose: PropTypes.func, // This is called when the dialog should close
		children: PropTypes.node,
		onModalDidMount: PropTypes.func, // optional, called on mount
		onModalWillUnmount: PropTypes.func, // optional, called on unmount
		isOpen: PropTypes.bool
	};

	static defaultProps = {
		isOpen: false
	};

	constructor(props) {
		super(props);
		this.componentWillUnmount = props.componentWillUnmount || ::this.unMount;
	}

	componentDidMount(){
		// Create a div and append it to the body
		this._target = document.body.appendChild(document.createElement('div'));

		// A handler call in case you want to do something when a modal opens, like add a class to the body or something
		if (typeof this.props.onModalDidMount === 'function') {
			this.props.onModalDidMount();
		}
	};
	componentDidUpdate(){
		// When the child component updates, we have to make sure the content rendered to the DOM is updated to
		//this.component(this.props);
		const { id, isOpen } = this.props;
		this.toggle(id, Portal.isBool(isOpen));
	};

	static isBool(boolean) {
		return typeof boolean === 'boolean' ? boolean : false;
	}
	static toggle = (id, isOpen)=> {
		emitter.emit('toggle', id, isOpen);
	};

	static isOpen = {};
	toggle(id, isOpen){
		emitter.once('toggle', ::this.toggle);
		// Mount a component on that div
		console.log(isOpen)
		!isOpen && this.unMount();
	}

	component(props){
		this._component = renderSubtreeIntoContainer(this, <div>{props.children}</div>, this._target);
	}

	unMount(){
		const done = () => {
			// Modal will unmount now
			// Call a handler, like onModalDidMount
			if (typeof this.props.onModalWillUnmount === 'function') {
				this.props.onModalWillUnmount();
			}

			// Remove the node and clean up after the target
			ReactDOM.unmountComponentAtNode(this._target);
			document.body.removeChild(this._target);
			this._component = null;
		};

		// A similar API to react-transition-group
		if ( !!(this._component) ) {
			if (typeof this._component.componentWillLeave == 'function') {
				// Pass the callback to be called on completion
				this._component.componentWillLeave(done);
			} else {
				// Call completion immediately
				done();
			}
		}
	}

	_target = null; // HTMLElement, a div that is appended to the body
	_component = null; // ReactComponent, which is mounted on the target
	render = () => null; // This doesn't actually return anything to render
}*/


/*
export default class Portal extends Component {

	static propTypes = {
		id: PropTypes.string,
		isOpen: PropTypes.bool
	};

	static defaultProps = {
		isOpen: false
	};

	target = null;
	portal = null;
	constructor(props){
		super(props);
		this.state = {
			isOpen: props.isOpen
		};
		// Create a div and append it to the body
		this.target = document.body.appendChild(document.createElement('div'));
		this.target.id = props.id;
	}

	componentWillMount(){// this.toggle();
		this.toggle(this.props.id, this.props.isOpen);
	}
	componentDidUpdate(props){// this.toggle();
		console.log(props);
		if( props.id === this.props.id ) {
			this.mount(props.id, this.state.isOpen)
		}
	}

	static toggle(id, isOpen){
		emitter.emit('toggle', id, isOpen);
	}

	toggle(id, isOpen){
		if ( id === this.props.id ) {
			this.setState({isOpen})
		}
		emitter.once('toggle', ::this.toggle);
	}

	static counter = 1;
	mount(id, isOpen){
		//console.log(Portal.counter, this.props, id, isOpen);
		Portal.counter++;
		switch (isOpen) {
			case true:
				this.portal = renderSubtreeIntoContainer(this, <div>{this.props.children}</div>, this.target);
				break;
			case false:
				unmountComponentAtNode(this.target);
				break;
		}
	}

	render(){return null}
}*/

/*const Portal =  (props = {access:{}}) => (Component) => {


	return class extends React.Component {

	}

};*/

class PortalContent extends Component {
	static propTypes = {
		onClose: PropTypes.func, // This is called when the dialog should close
		children: PropTypes.node,
		onModalDidMount: PropTypes.func, // optional, called on mount
		onModalWillUnmount: PropTypes.func, // optional, called on unmount
	};
	static defaultProps = {
		mountTo: 'modals',
		isOpen: false,
		toggle: {
			before: ()=>{},
			after: ()=>{}
		}
	};
	componentDidMount(){
		/*// Create a div and append it to the body
		const { id } = this.props;
		this.portal = document.getElementById(id);
		this.portal = document.createElement('div');
		this.portal.id = id;
		this._target = document.getElementById(this.props.mountTo).appendChild(this.portal);

		//this._target = document.body.appendChild(document.createElement('div'));

		// Mount a component on that div
		this.component(this.props);

		// A handler call in case you want to do something when a modal opens, like add a class to the body or something
		if (typeof this.props.onModalDidMount === 'function') {
			this.props.onModalDidMount();
		}*/
		// Mount a component on that div
		this.component(this.props);
	};

	constructor(props)
	{
		super(props);
		this.componentWillUnmount = ::this.unMount;
		//this.componentWillReceiveProps = ::this.component;
	}

	componentDidUpdate(){
		// When the child component updates, we have to make sure the content rendered to the DOM is updated to
		this.component(this.props);
	};

	component(props){
		const { id, className, isOpen } = props;
		/*this._component = renderSubtreeIntoContainer(this, <div>{props.children}</div>, this._target);
		const portal = this.portal;
		this.timer = setTimeout(()=>{
			portal.className = classNames(className, {
				open: isOpen
			});
			this.timer && clearTimeout(this.timer);
		}, 100);*/
		this.portal = document.getElementById(id);
		//const { className } = this.props;

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

	/*componentWillUnmount(){
		this.unMount();
	};*/

	unMount(){
		if ( !!(this.portal) ) {
			// Remove the node and clean up after the target
			unmountComponentAtNode(this.portal);
			document.getElementById(this.props.mountTo).removeChild(this.portal);
			this.portal = null;
		}
	}

	/*unMount()  {
		Portal.isOpen = false;
		if ( this.portal ) {
			unmountComponentAtNode(this.portal);
			document.getElementById(this.props.mountTo).removeChild(this.portal);
			this.portal = null;
		}
	}*/

	_target = null; // HTMLElement, a div that is appended to the body
	_component = null; // ReactComponent, which is mounted on the target
	render = () => null; // This doesn't actually return anything to render
}

export default class Portal extends Component {

	static propTypes = {
		isOpen: PropTypes.bool
	};

	static defaultProps = {
		isOpen: false
	};

	static isOpen = false;
	constructor(props){
		super(props);
		const { isOpen } = props;
		this.state = {isOpen};
		this.emitter = false
	}

	/*componentDidMount(){
		this.toggle(this.props.id, this.props.isOpen);
	}

	componentDidUpdate(props, state){
		console.log(props, state);
		console.log(this.props, this.state);
		console.log(Portal.isOpen);
		emitter.removeAllListeners();
		this.toggle(this.props.id, this.state.isOpen);
		/!*if ( !!(this.emitter) ) {
			this.emitter = null;
			this.toggle(this.props.id, this.props.isOpen);
		}*!/
	}*/

	componentDidMount() {
		const { id, isOpen } = this.props;
		this.toggle(id, isOpen);
	}

	static toggle(id, isOpen){
		emitter.emit('toggle', id, isOpen);
		Portal.isOpen = isOpen;
	}

	toggle(id, isOpen){
		emitter.once('toggle', ::this.toggle);
		if ( id !== this.props.id ) return;
		if ( isOpen !== this.state.isOpen ) {
			this.setState({isOpen})
		}
	}

	render(){
		const { id, ...other } = this.props;
		//console.log(id, this.state);
		return (
			<PortalContent id={id} { ...other } isOpen={this.state.isOpen}>
				{ this.props.children }
			</PortalContent>
		);
	}
}


