import React, {Component, PropTypes} from 'react'
import Portal from 'components/Portal'
import Paper from 'components/Paper'

class Modal extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		size: PropTypes.oneOf(['large', 'medium', 'small', 'mini']),
		header: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.array, PropTypes.element
		]),
		body: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.element, PropTypes.array
		]),
		desc: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.element, PropTypes.array
		]),
		footer: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.array, PropTypes.element
		]),
		className: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.string
		]),
		style: PropTypes.object,
		isOpen: PropTypes.bool,
		isMount: PropTypes.bool,
		closeButton: PropTypes.bool,
		onClickOutside: PropTypes.shape({
			close: PropTypes.bool,
			callback: PropTypes.func
		}),
		modal: PropTypes.bool,
		displayName: PropTypes.string
	};
	static defaultProps = {
		size: 'medium',
		header: [],
		body: false,
		desc: false,
		footer: false,
		className: false,
		style: {},
		isOpen: false,
		isMount: false,
		closeButton: true,
		onClickOutside: {
			close: true,
			callback: ()=>{}
		},
		modal: true,
		displayName: 'modal',
		mountTo: 'modals'
	};

	static toggle = Portal.toggle;

	componentDidUpdate(prevProps, prevState){
		if(!this.props.isOpen && prevProps.isOpen){
			Modal.toggle(this.props.id, false);
		}else if(this.props.isOpen && !prevProps.isOpen){
			Modal.toggle(this.props.id, true);
		}
	}

	static bodyStyle(isOpen, modal) {
		if (isOpen && modal) {
			const scrollWidth = Modal.scrollWidth();
			document.body.style.cssText =
				'overflow:hidden !important;'+
				'padding-right:' + scrollWidth + 'px';
		}	else {
			document.body.style.cssText = '';
		}
	}

	static scrollWidth() {
		var scrollDiv = document.createElement("div");
		scrollDiv.style.cssText = 'width:100px;height:100px;overflow:scroll !important;position:absolute;top:-9999px';
		document.body.appendChild(scrollDiv);
		var result = scrollDiv.offsetWidth - scrollDiv.clientWidth;
		//console.log(result);
		document.body.removeChild(scrollDiv);
		var hasScroll = window.innerWidth > document.documentElement.clientWidth;
		return hasScroll ? result : 0;
	}

	render() {
		const {
			id, size, className, style, displayName
			, header, desc, children, footer
			, isOpen, closeButton, modal, mountTo
			, ...other
		} = this.props;

		const body = this.props.body || children;
		const styles = {
			box: {},
			...style
		};

		const descLength = desc.length;

		const toggle = {
			beforeToggle: (id, isOpen)=>{
				modal && Modal.bodyStyle(isOpen, modal);
			},
			afterToggle: (id, isOpen)=>{

			}
		};


		return (
			<Portal id={id} mountTo={mountTo} isOpen={isOpen} {...toggle} { ...other }>
				<div className="modal">
					<Paper zDepth={2}>
						{ this.props.children }
					</Paper>
				</div>
			</Portal>
		);
	}
}

export default Modal