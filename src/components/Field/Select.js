import React, {Component, PropTypes, Children} from 'react'
import { findDOMNode } from 'react-dom'
import DropDown, { Item } from 'components/DropDown/DropDown'
import Field from 'components/Field/Field'

class Select extends Component {
	static propTypes = {
		...Field.propTypes,
		onChange: PropTypes.func,
		onBlur: PropTypes.func,
	};

	static defaultProps = {
		...Field.defaultProps,
		type: 'select',
		onChange: (e, selected)=>{},
		onBlur: e=>{}
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
			<Field {...{...fieldProps, name: '', required: false, ref: 'input', value: value.input, readOnly:true}} />
		);

		return (
			<div>
				<DropDown control={control} onChange={(e, selected)=>{
					let value = {
						select: selected.value,
						input: selected.text
					};
					this.setState({value}, ()=>{
						this.props.onChange(e, selected);
						this.props.onBlur({
							target: {
								value: value.select
							}
						});
					});
				}}>
					{ this.props.children }
				</DropDown>
				<select hidden {...{name, required}} ref="select"
								value={value.select}>
					<option value="" hidden>Select...</option>
					{ ((options)=>{
						let value, text;
						return Children.map(options, option=>{
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