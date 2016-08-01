import React, {Component, PropTypes, createElement} from 'react'
import { classNames, isMobile } from 'helpers'

class Field extends Component {
	static propTypes = {
		floating: React.PropTypes.bool,
		placeholder: React.PropTypes.oneOfType([
			React.PropTypes.string, React.PropTypes.bool
		]),
		value: React.PropTypes.string,
		type: React.PropTypes.string,
		success: React.PropTypes.oneOfType([
			React.PropTypes.string, React.PropTypes.bool
		]),
		warning: React.PropTypes.oneOfType([
			React.PropTypes.string, React.PropTypes.bool
		]),
		danger: React.PropTypes.oneOfType([
			React.PropTypes.string, React.PropTypes.bool
		])
	};

	static defaultProps = {
		floating: false,
		placeholder: false,
		value: '',
		type: 'text',
		success: false,
		warning: false,
		danger: false
	};

	state = {
		isFocused: false,
		value: ''
	};

	componentDidMount() {
		const { value } = this.props;
		this.setState({value});
	}

	render(){
		const {
			floating, placeholder, type,
			onChange, onFocus, onBlur,
			...other
		} = this.props;
		const { success,	warning,	danger } = this.props;
		const valid = success || warning || danger;

		let icon = null;
		const { isFocused, value } = this.state;

		const inputProps = {
			onChange: e=>{
				this.setState({value: e.target.value});
				onChange && onChange(e);
			},
			onFocus: e=>{
				this.setState({isFocused: true});
				onFocus && onFocus(e);

				/*setTimeout(()=>{
				 alert(document.body.scrollHeight);
				 },1000);*/

				isMobile && (()=>{
					//console.log(e.target.offsetTop)
				})()

			},
			onBlur: e=>{
				this.setState({isFocused: false});
				onBlur && onBlur(e);
			},

		};

		return (
			<label className={classNames('field', {
				floating: floating,
				'is-focused': isFocused,
				'has-value': value !== '',
				success: success !== false,
				warning: warning !== false,
				danger: danger !== false
			})}>
				<input type={type} ref="entry"
				       className="field-entry" value={value}
				       {...inputProps}
				/>
				{ placeholder && (
					<span className="field-label"
					      onClick={()=>this.refs.entry.getDOMNode().focus()}
					>{ placeholder }</span>
				) }
				<hr className="field-border field-border-focus"/>
				<hr className="field-border"/>
				{ typeof ( valid ) === 'string' && createElement('span', {
					className: 'field-valid'
				}, [icon, <span key="message">{ valid }</span>] ) }
			</label>
		);
	}
}

export default Field