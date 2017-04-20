import React, {Component, PropTypes, Children} from 'react'
import { findDOMNode } from 'react-dom'
import DropDown, { Item } from 'components/DropDown/DropDown'
import Field from 'components/Field/Field'

/*class Select extends Component {
	static propTypes = {
    ...Field.propTypes,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
	};

	static defaultProps = {
    ...Field.defaultProps,
    type: 'select',
    onChange: (e, selected)=>{},
    onBlur: e=>{},
		value: {
      select: '',
      input: ''
		}
	};

	constructor(props) {
		super(props);
		this.select = null;
		this.input = null;
		this.state = {
			//value: props.value
			inputValue: ''
		}
	}

	componentDidMount(){
		this.select = findDOMNode(this.refs['select']);
		this.input = findDOMNode(this.refs['input']);
		this.selected = this.state;
	}

	componentWillReceiveProps(props){

		const { value } = props;
		/!*if ( value.select != '' && value.input != '' ) {
      this.selected = props;
		}*!/
		console.log(value)
    this.selected = props;

	}

	set selected(props){
    const { value } = props;

    let selected = false;
    if ( value.select !== '' ) {
      React.Children.forEach(this.props.children, (child) => {
        if (child && child.props.value == value.select) {
          selected = true;
        }
      });
    }

    this.setState({
      value: !selected ? Select.defaultProps.value : value
    });
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

		const { inputValue } = this.state;

		const control = (
			<Field {...{...fieldProps, name: '', required: false, ref: 'input', value: inputValue, readOnly:true}} />
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
				<select hidden {...{name, required}} ref="select" value={value.select} onChange={e=>{}}>
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
}*/

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
    onBlur: e=>{},
  };

  /**
   * Check isValid oneOf([value, defaultValue])
   * @param props
   * @param callback
   * value = value || defaultValue
   * setState({value});
   */
  hasValue(props, callback = ()=>{}){
    const {value, defaultValue} = props;
    const hasValue = Field.isValidValue(value)
      ? value
      : Field.isValidValue(defaultValue)
        ? defaultValue
        : '';

    let field = '';
    if ( hasValue !== '' ) {
      React.Children.forEach(props.children, (child) => {
        if (child && child.props.value == hasValue) {
          field = child.props.text;
        }
      });
    }

    this.setState({
      value: hasValue,
      field: field,
      hasValue: !!(typeof hasValue === 'number' ? JSON.stringify(hasValue) : hasValue)
    }, callback);
    return hasValue;
  }

  state = {
  	value: '',
		field: ''
	};

  componentWillMount(){
  	this.hasValue(this.props);
	}

  componentWillReceiveProps(props){

    if ( props.hasOwnProperty('value') ) {
      this.hasValue(props);
    }	else {
      this.hasValue({
				...props,
				value: this.state.value
			});
		}

	}

  render(){
    const {
      floating,
      placeholder,
      autoComplete,
      // value: '',
      defaultValue,
      type, name,
      large, small, block,
      required, disabled,
      success, warning, danger,
      children
    } = this.props;

    const { value, field } = this.state;

    const inputProps = {
      floating,
      placeholder,
      autoComplete,
      // value: '',
      // defaultValue: '',
      type, disabled, value: field,
      large, small, block,
      success, warning, danger,
      name: '', required: false,
			ref: 'input', readOnly:true,
			...this.props.inputProps
    };

    const control = (
			<Field {...inputProps} />
    );

  	return (
			<div className="select">
				<DropDown control={control} onChange={(e, selected)=>{
					const { value } = selected;
          this.hasValue({children, defaultValue, value}, ()=>{
            this.props.onChange(e, selected);
            this.props.onBlur({target: {value}});
					});
          {/*let value = {
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
          });*/}
        }}>
          { this.props.children }
				</DropDown>
				<select hidden {...{name, required}} ref="select" value={value} onChange={e=>{}}>
					<option value="" hidden>Select</option>
          { ((options)=>{
            let value, text;
            return Children.map(options, (option)=>{
              text = !!(option.props.text) ? option.props.text : option.props.children;
              value = option.props.value ? option.props.value : text;
              return <option key={option.key} value={value}>{text}</option>;
            });
            {/*let value, text;
            return options.map(option=>{
              text = !!(option.props.text) ? option.props.text : option.props.children;
              value = option.props.value ? option.props.value : text;
              return <option key={option.key} value={value}>{text}</option>;
            })*/}
          })(children) }
				</select>
			</div>
		);
	}

}

export default Select