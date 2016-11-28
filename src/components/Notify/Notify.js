import React, { Component, PropTypes } from 'react';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Portal from 'components/Portal'
import Paper from 'components/Paper'
import classNames from 'helpers/classNames';

class Notify extends Modal {

	static defaultProps = {
		...Modal.defaultProps,
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
		mountTo: 'notifies'
	};

	render() {
		const {
			id, size, className, style, displayName
			, header, desc, children, footer
			, isOpen, onClose, closeButton, modal, mountTo
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
			<Portal id={id} mountTo={mountTo} isOpen={isOpen} {...toggle} className={className}>
				<div className={classNames("notify", {
					[size]: true
				})}>
					<Paper zDepth={2} style={style}>
						{ this.props.children }
					</Paper>
				</div>
			</Portal>
		);
	}
}

export default Notify;