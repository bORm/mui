import React, {Component, PropTypes, createElement} from 'react'
import { classNames, inArray } from 'helpers'

class Field extends Component {
	static propTypes = {
		floating: PropTypes.bool,

		placeholder: PropTypes.oneOfType([
			PropTypes.string, PropTypes.bool
		]),
		value: PropTypes.string,
		defaultValue: PropTypes.string,
		type: PropTypes.string,
		min: PropTypes.string,
		max: PropTypes.string,
		name: PropTypes.oneOfType([
			PropTypes.string, PropTypes.bool
		]),

		large: PropTypes.bool,
		small: PropTypes.bool,

		block: PropTypes.bool,

		required: PropTypes.bool,
		readOnly: PropTypes.bool,
		disabled: PropTypes.bool,

		success: PropTypes.oneOfType([
			PropTypes.string, PropTypes.bool
		]),
		warning: PropTypes.oneOfType([
			PropTypes.string, PropTypes.bool
		]),
		danger: React.PropTypes.oneOfType([
			PropTypes.string, PropTypes.bool
		])
	};

	static defaultProps = {
		floating: false,

		placeholder: false,
		value: '',
		defaultValue: '',
		type: 'text',
		name: false,

		large: false,
		small: false,

		block: false,

		required: false,
		readOnly: false,
		disabled: false,

		success: false,
		warning: false,
		danger: false
	};

	constructor(props){
		super(props);
		this.state = {
			isFocused: false,
			value: props.defaultValue || ''
		};
	}

	componentDidMount() {
		const { value } = this.props;
		value && this.setState({value});
	}

	componentWillReceiveProps(props){
		const { value, required, disabled } = this.props;

		value !== props.value && this.setState({value: props.value});
		required !== props.required && this.setState({required: props.required});
		disabled !== props.disabled && this.setState({disabled: props.disabled});
	}

	render(){
		const {
			floating, placeholder, type, min, max,
			onChange, onFocus, onBlur,
			name, required, readOnly, disabled, defaultValue,
			large, small, block,
			success,	warning,	danger,
			className,
			...other
		} = this.props;

		const valid = success || warning || danger;

		let icon = null;
		const { isFocused, value } = this.state;

		const inputProps = {
			onChange: e=>{
				const { value } = e.target;
				this.setState({value});
				onChange && onChange(e);
			},
			onFocus: e=>{
				this.setState({isFocused: true});
				onFocus && onFocus(e);
			},
			onBlur: e=>{
				this.setState({isFocused: false});
				onBlur && onBlur(e);
			},
			name, readOnly,
			ref: 'entry',
			className: 'field-entry',
			required, disabled, value
		};

		switch (true) {
			case type === 'number':
				inputProps.onKeyDown = (e)=>{
					// Allow: backspace, delete, tab, escape, enter and .
					if (inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
						// Allow: Ctrl+A
						(e.keyCode == 65 && e.ctrlKey === true) ||
						// Allow: Ctrl+C
						(e.keyCode == 67 && e.ctrlKey === true) ||
						// Allow: Ctrl+X
						(e.keyCode == 88 && e.ctrlKey === true) ||
						// Allow: home, end, left, right
						(e.keyCode >= 35 && e.keyCode <= 39)) {
						// let it happen, don't do anything
						return;
					}
					// Ensure that it is a number and stop the keypress
					if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
						e.preventDefault();
					}
				}
		}

		if ( !!(max) ) {
			const maxLength = parseInt(max);
			inputProps.onInput = (e)=>{
				let { value } = e.target;
				if ( value.toString().length > maxLength ) {
					value = value.slice(0, maxLength);
					e.target.value = value;
					this.setState({value});
					e.preventDefault();
				}
			}
		}

		return (
			<label {...other} className={classNames('field', {
				floating: floating,
				'is-focused': isFocused && !readOnly && !disabled,
				'has-value': value !== '',
				fieldBlock: block,
				fieldLg: large,
				fieldMd: !(large || small),
				fieldSm: small,
				success: success !== false,
				warning: warning !== false,
				danger: danger !== false,
				hidden: type === 'hidden',
				required: required,
			}, className)}>
				<div className="field-control">
					{
						type !== 'textarea'
							? <input type={type} {...inputProps} />
							: <textarea {...inputProps} />
					}
					{ placeholder && (
						<span className="field-label"
						      onClick={()=>this.refs.entry.getDOMNode().focus()}
						>{ placeholder } { required && <sup>*</sup> }</span>
					) }
					<hr className="field-border field-border-focus"/>
				<hr className="field-border"/>
				</div>
				{ typeof ( valid ) === 'string' && createElement('span', {
					className: 'field-valid'
				}, [icon, <span key="message">{ valid }</span>] ) }
			</label>
		);
	}
}

export default Field