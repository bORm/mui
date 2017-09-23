import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Portal from 'components/Portal'
import Paper from 'components/Paper'
import classNames from 'helpers/classNames';

class Notify extends Modal {

	static propTypes = {
		...Modal.propTypes,
		wait: PropTypes.number.isRequired
	};

	static defaultProps = {
		...Modal.defaultProps,
		mountTo: 'notifies',
		wait: 5000
	};

	static wait = null;

	render() {
		const {
			id, size, className, style
			, closeButton, header
			, isOpen, onClose, mountTo
			, ...other
		} = this.props;

		const toggle = {
			before: (id, isOpen)=>{
				Notify.wait && clearTimeout(Notify.wait);
			},
			after: (id, isOpen)=>{
				isOpen && ( Notify.wait = setTimeout(()=>{
					Notify.toggle(id, false);
					clearTimeout(Notify.wait);
				}, parseInt(this.props.wait)) )
			}
		};

		const portalProps = {id, mountTo, isOpen, toggle, className};

		return (
			<Portal {...portalProps}>
				<div className={classNames("notify", {
					[size]: true
				})}>
					<Paper zDepth={2} style={style}>
						<header className="clearfix">
							{ closeButton && (()=>{
								return (
									<div className="notify-close">
										<i className="icon material-icons" onClick={e=>{
											Portal.toggle(id, false);
											onClose && onClose(e, id);
										}}>close</i>
									</div>
								)
							})() }
							{header && (
								<div className="notify-header">
									{ header }
								</div>
							)}
						</header>
						{ this.props.children }
					</Paper>
				</div>
			</Portal>
		);
	}
}

export default Notify;