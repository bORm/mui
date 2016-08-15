import React, {Component, PropTypes, createElement} from 'react'
import { classNames, isMobile } from 'helpers'

class Field extends Component {
	static propTypes = {
		floating: PropTypes.bool,

		placeholder: PropTypes.oneOfType([
			PropTypes.string, PropTypes.bool
		]),
		value: PropTypes.string,
		type: PropTypes.string,
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
			value: ''
		};
	}

	componentDidMount() {
		const { value } = this.props;
		this.setState({value});
	}

	componentWillReceiveProps(props){
		const { value } = this.props;

		value !== props.value && this.setState({value: props.value});
	}

	render(){
		const {
			floating, placeholder, type,
			onChange, onFocus, onBlur,
			name, required, readOnly, disabled,
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
			}
		};

		if ( name ) {
			inputProps.name = name;
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
					<input type={type} ref="entry"
					       required={required} readOnly={readOnly} disabled={disabled}
					       className="field-entry" value={value}
					       {...inputProps}
					/>
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