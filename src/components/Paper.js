import React, {Component, PropTypes, createElement, cloneElement} from 'react'
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
		return React.isValidElement(component) ?
			React.cloneElement(component, paperProps) :
			React.createElement(component, paperProps);
	}
}

export default Paper