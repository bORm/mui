import React, {Component, PropTypes} from 'react'

const isMouseControlInverted = (axis) => axis === 'x-reverse' || axis === 'y';
const mainAxisClientOffsetProperty = {
	x: 'clientX',
	'x-reverse': 'clientX',
	y: 'clientY',
	'y-reverse': 'clientY',
};

const mainAxisOffsetProperty = {
	x: 'left',
	'x-reverse': 'right',
	y: 'bottom',
	'y-reverse': 'top',
};

const mainAxisClientProperty = {
	x: 'clientWidth',
	'x-reverse': 'clientWidth',
	y: 'clientHeight',
	'y-reverse': 'clientHeight',
};

class Slider extends Component {

	constructor(props) {
		super(props);
		this.state = {
			percent: 0,
			value: 0
		}
	}

	static propTypes = {
		axis:     PropTypes.oneOf([
			'x', 'x-reverse',
			'y', 'y-reverse'
		]),
		disabled: PropTypes.bool,
		step:     PropTypes.number,
		max:      PropTypes.number,
		min:      PropTypes.number,
		required: PropTypes.bool,
	};

	static defaultProps = {
		axis: 'x',
		disabled: false,
		step: 0.01,
		max: 1,
		min: 0,
		required: true,
	};

	render(){

		const { disabled } = this.props;

		let handleDragProps;
		if (!disabled) {
			handleDragProps = {
				onTouchStart: ::this.handleTouchStart,
				onMouseDown: ::this.handleMouseStart
			};
		}

		const { percent, value } = this.state;

		const left = percent === 0 ? '0%' : (percent * 100) + '%';

		return (
			<div className="slider" ref={'track'} {...handleDragProps}>
				<div className="slider-thumb" ref={'thumb'} style={{
					left: left
				}}>
					<div className="slider-thumb-discrete">
						<span>{value}</span>
					</div>
				</div>
				<span className="slider-fill" ref={'fill'} style={{
					width: left
				}}/>
				<input type="hidden" value={value} onChange={()=>{}} />
			</div>
		);
	}

	/**
	 * Start
	 * @param event
	 */
	handleTouchStart(event){
		if (document) {
			document.addEventListener('touchmove', this.dragHandler, false);
			document.addEventListener('touchup', ::this.dragTouchEndHandler, false);
			document.addEventListener('touchend', ::this.dragTouchEndHandler, false);
			document.addEventListener('touchcancel', ::this.dragTouchEndHandler, false);
		}
		this.dragHandler(event);
		this.onDragStart(event);
	}

	handleMouseStart(event){
		if (document) {
			document.addEventListener('mousemove', this.dragHandler, false);
			document.addEventListener('mouseup', this.dragMouseEndHandler, false);
		}
		console.log(event);
		this.dragHandler(event);
		this.onDragStart(event);
	}

	onDragStart(event) {
		// Cancel scroll and context menu
		event.preventDefault();

		// Set focus manually since we called preventDefault()
		this.refs.thumb.focus();

		this.setState({
			dragging: true,
			active: true,
		});

		if (this.props.onDragStart) {
			this.props.onDragStart(event);
		}
	}

	/**
	 * Drag requestAnimationFrame
	 * @param event
	 */
	dragHandler = (event) => {

		if (this.dragRunning) {
			return;
		}
		this.dragRunning = true;

		const eventName = event.constructor.name;

		let clientOffset;
		switch (eventName) {
			case 'MouseEvent':
			case 'SyntheticMouseEvent':
				clientOffset = event[mainAxisClientOffsetProperty[this.props.axis]];
				break;
			case 'TouchEvent':
			case 'SyntheticTouchEvent':
				clientOffset = event.touches[0][mainAxisClientOffsetProperty[this.props.axis]];
		}

		requestAnimationFrame(() => {
			let pos;
			if (isMouseControlInverted(this.props.axis)) {
				pos = this.getTrackOffset() - clientOffset;
			} else {
				pos = clientOffset - this.getTrackOffset();
			}
			this.onDragUpdate(event, pos);
			this.dragRunning = false;
		});

	};

	getTrackOffset() {
		return this.refs.track.getBoundingClientRect()[mainAxisOffsetProperty[this.props.axis]];
	}

	onDragUpdate(event, pos) {
		if (!this.state.dragging) {
			return;
		}
		if (!this.props.disabled) {
			this.dragTo(event, pos);
		}
	}

	dragTo(event, pos){
		const max = this.refs.track[mainAxisClientProperty[this.props.axis]];
		if (pos < 0) {
			pos = 0;
		} else if (pos > max) {
			pos = max;
		}

		//console.log(pos);
		//this.setState({pos})
		this.updateWithChangeEvent(event, pos / max);
	}

	updateWithChangeEvent(event, percent) {
		this.setPercent(percent, () => {
			if (this.props.onChange) {
				this.props.onChange(event, this.state.value);
			}
		});
	}

	/**
	 *
	 * @param percent
	 * @param callback
	 */
	setPercent(percent, callback) {
		const value = this.alignValue(this.percentToValue(percent));
		const {min, max} = this.props;
		const alignedPercent = (value - min) / (max - min);
		if (this.state.value !== value) {
			this.setState({value: value, percent: alignedPercent}, callback);
		}
	}

	alignValue(val) {
		const {step, min} = this.props;
		const alignValue = Math.round((val - min) / step) * step + min;
		return parseFloat(alignValue.toFixed(5));
	}

	percentToValue(percent) {
		return percent * (this.props.max - this.props.min) + this.props.min;
	}

	clearValue() {
		this.setValue(this.props.min);
	}

	/**
	 * End
	 * @param event
	 */
	dragTouchEndHandler(event) {
		if (document) {
			document.removeEventListener('touchmove', this.dragHandler, false);
			document.removeEventListener('touchup', ::this.dragTouchEndHandler, false);
			document.removeEventListener('touchend', ::this.dragTouchEndHandler, false);
			document.removeEventListener('touchcancel', ::this.dragTouchEndHandler, false);
		}

		this.onDragEnd(event);
	};


	dragMouseEndHandler = (event) => {
		if (document) {
			document.removeEventListener('mousemove', this.dragHandler, false);
			document.removeEventListener('mouseup', this.dragMouseEndHandler, false);
		}

		this.onDragEnd(event);
	};

	onDragEnd(event) {
		this.setState({
			dragging: false,
			active: false,
		});

		if (this.props.onDragStop) {
			this.props.onDragStop(event);
		}
	}

}

export default Slider

// react-DefinitelyTyped