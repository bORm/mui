import React, {Component, PropTypes} from 'react'
import { findDOMNode } from 'react-dom'
import DropDown, { Item } from 'components/DropDown/DropDown'
import Field from 'components/Field/Field'

class Select extends Component {
	static propTypes = {
		floating: PropTypes.bool,

		placeholder: PropTypes.oneOfType([
			PropTypes.string, PropTypes.bool
		]),
		autoComplete: PropTypes.oneOfType([
			PropTypes.string, PropTypes.bool
		]),
		value: PropTypes.any,
		defaultValue: PropTypes.any,
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
		floating: true,

		placeholder: false,
		autoComplete: false,
		// value: '',
		// defaultValue: '',
		type: 'text',
		name: false,

		large: false,
		small: false,

		block: false,

		required: false,
		readOnly: true,
		disabled: false,

		success: false,
		warning: false,
		danger: false,
		onChange: (e, selected)=>{}
	};

	constructor(props) {
		super(props);
		this.select = null;
		this.input = null;
		this.state = {
			value: {
				select: '',
				input: ''
			}
		}
	}

	componentDidMount(){
		this.select = findDOMNode(this.refs['select']);
		this.input = findDOMNode(this.refs['input']);
	}

	componentWillReceiveProps(props){
		const { value } = this.state;

		let selected = false;
		if ( !!(value.select) ) {
			React.Children.forEach(props.children, (child) => {
				if (child && child.props.value === value.select) {
					selected = true;
				}
			});
		}

		if ( !selected ) {
			this.setState({
				value: {
					select: '',
					input: ''
				}
			});
		}

	}

	render() {

		const {
			floating,
			placeholder,
			autoComplete,
			// value: '',
			// defaultValue: '',
			type, name,
			large, small, block,
			required, readOnly, disabled,
			success, warning, danger
		} = this.props;

		const fieldProps = {
			floating,
			placeholder,
			autoComplete,
			// value: '',
			// defaultValue: '',
			type, name,
			large, small, block,
			required, readOnly, disabled,
			success, warning, danger
		};

		const { value } = this.state;

		const control = (
			<Field {...{...fieldProps, name: '', required: false, ref: 'input', value: value.input}} />
		);
		return (
			<div>
				<DropDown control={control} onChange={(e, selected)=>{
					let value = {
						select: selected.value,
						input: selected.text
					};
					this.setState({value}, ()=>{
						this.props.onChange(e, selected)
					});
				}}>
					{ this.props.children }
				</DropDown>
				<select hidden="hidden" {...{name, required}} ref="select" value={value.select}>
					<option value="" hidden>Select</option>
					{ ((options)=>{
						let value, text;
						return options.map(option=>{
							text = !!(option.props.text) ? option.props.text : option.props.children;
							value = option.props.value ? option.props.value : text;
							return <option key={option.key} value={value}>{text}</option>;
						})
					})(this.props.children) }
				</select>
			</div>
		);
	}
}

export default Select