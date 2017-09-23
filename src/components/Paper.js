import React, {Component, isValidElement, createElement, cloneElement} from 'react'
import PropTypes from 'prop-types';
import { classNames } from 'helpers'

class Paper extends Component {
	static propTypes = {
		zDepth: PropTypes.number,
		component: PropTypes.oneOfType([
			PropTypes.string, PropTypes.element
		])
	};

	static defaultProps = {
		zDepth: 1,
		component: 'div'
	};

	render() {
		const { zDepth, component, className, ...other } = this.props;
		const paperProps = {
			...other,
			...{
				className: classNames("paper", {
					['paper-shadow-z-'+ zDepth] : zDepth !== 0 && true,
				}, className)
			}
		};
		return isValidElement(component) ?
			cloneElement(component, paperProps) :
			createElement(component, paperProps);
	}
}

export default Paper