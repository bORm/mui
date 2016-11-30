import React, { Component, PropTypes } from 'react'
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
		this.shouldComponentUpdate = ::PureRenderMixin.shouldComponentUpdate;
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
		if ( this.portal ) {
			Portal.isOpen = false;
			unmountComponentAtNode(this.portal);
			document.getElementById(this.props.mountTo).removeChild(this.portal);
			this.portal = null;
		}
	}

	render() {return null}

}

export default Portal;