import React, {Component, PropTypes} from 'react'
import Portal from 'components/Portal/Portal'
import Paper from 'components/Paper'
import classNames from 'helpers/classNames'

class Modal extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		size: PropTypes.oneOf(['large', 'medium', 'small', 'mini']),
		header: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.array, PropTypes.element, PropTypes.string
		]),
		body: PropTypes.oneOfType([
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
		onClose: PropTypes.oneOfType([
			PropTypes.bool, PropTypes.func
		]),
		isMount: PropTypes.bool,
		closeButton: PropTypes.bool,
		onClickOutside: PropTypes.shape({
			close: PropTypes.bool,
			callback: PropTypes.func
		}),
		modal: PropTypes.bool
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
		onClose: false,
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

	/*componentDidUpdate(props){
		const { id, isOpen } = this.props;
		if(!isOpen && props.isOpen){
			Modal.toggle(id, false);
		}else if(isOpen && !props.isOpen){
			Modal.toggle(id, true);
		}
	}*/

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
		let scrollDiv = document.createElement("div");
		scrollDiv.style.cssText = 'width:100px;height:100px;overflow:scroll !important;position:absolute;top:-9999px';
		document.body.appendChild(scrollDiv);
		let result = scrollDiv.offsetWidth - scrollDiv.clientWidth;
		//console.log(result);
		document.body.removeChild(scrollDiv);
		let hasScroll = window.innerWidth > document.documentElement.clientWidth;
		return hasScroll ? result : 0;
	}

	render() {
		const {
			id, size, className, style
			, closeButton, header
			, isOpen, onClose, modal, mountTo
			, ...other
		} = this.props;

		const toggle = {
			before: (id, isOpen)=>{
				modal && Modal.bodyStyle(isOpen, modal);
			},
			after: (id, isOpen)=>{

			}
		};

		return (
			<Portal id={id} mountTo={mountTo} isOpen={isOpen} {...toggle} className={className}>
				<div className={classNames("modal", {
					[size]: true
				})}>
					<Paper zDepth={2} style={style}>
						<header className="clearfix">
							{ closeButton && (()=>{
								return (
									<div className="modal-close">
										<i className="icon material-icons" onClick={e=>{
											Portal.toggle(id, false);
											onClose && onClose(e, id);
										}}>close</i>
									</div>
								)
							})() }
							{header && (
								<div className="modal-header">
									{ header }
								</div>
							)}
						</header>
						<div className="modal-body">
							{ this.props.children }
						</div>
					</Paper>
				</div>
			</Portal>
		);
	}
}

export default Modal