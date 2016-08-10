import React, { Component, PropTypes, cloneElement, createElement } from 'react'
import { findDOMNode } from 'react-dom'
import objectKeys from 'helpers/objectKeys'

class Form extends Component {
	static propTypes = {
		id: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.string
		]),
		action: PropTypes.oneOfType([
			PropTypes.string, PropTypes.bool
		]),
		onSubmit: PropTypes.oneOfType([
			PropTypes.func, PropTypes.bool
		]),
		validate: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.object
		]),
		rules: PropTypes.object
	};

	static defaultProps = {
		id: false,
		action: '#',
		onSubmit: false,
		validate: true,
		rules: {
			required: 'Field is`nt be empty!',
			email: 'Not valid email'
		}
	};

	constructor(props) {
		super(props);
		this.formInfo = {
			formData: {},
			formValidation: {}
		};
		this.state = {...this.formInfo, ...{
			rules: this.props.rules
		}};
	}

	render() {
		const { action, children, validate, rules, ...other } = this.props;
		const { formValidation } = this.state;
		return (
			<form {...other}
			      method="post" action={action}
			      onSubmit={::this.onSubmit}
			      noValidate={validate}>
				{ Form.getFormElements(children, formValidation) }
			</form>
		);
	}

	/**
	* Used if submit button out of the form
		<button onClick={(e)=>{
			this.refs[ this.form.ref ].onSubmit(e);
		}}>Submit</button>
	* @param e
	* @returns {*}
	*/
	onSubmit(e){
		const { validate } = this.props;
		this.formInfo = this.getFormData(e);
		if ( validate && objectKeys(this.formInfo.formValidation).length ) {
			this.props.onSubmit(e, this.formInfo);
			e.preventDefault();
			return false;
		}
	}

	static getFormElements(children, formValidation){

		return React.Children.map(children, (child)=>{
			// If the child has its own children, traverse through them also...
			// in the search for elements

			let {props} = child;

			if ( props && Object.keys(props).length ) {
				children = props && props.children;
				if (children) {
					return cloneElement(child, {

					}, Form.getFormElements(children, formValidation));
				}

				let { name, required, danger, warning } = props;
				let isInvalid = formValidation[name];

				return cloneElement(child, {
					danger: !!(required || danger) && isInvalid || danger,
					warning: !!(!required || warning) && isInvalid || warning
				});
			}

			return createElement('span', {}, child);

		})
	}

	/**
	 *
	 * @returns {{formData: {}, formValidation: {}}}
	 */
	getFormData() {
		const elements = findDOMNode(this).elements,
			length = elements.length;
		const formData = {}, formValidation = {};

		const { rules } = this.state;

		for ( let i=0, element, name, type, value; i<length; i++ ) {
			element = elements[i];
			name = element.name;
			type = element.type;
			value = element.value;
			if ( !name ) break;
			// Create formData obj
			formData[name] = value;
			// Validate it
			formValidation[name] = Form.validate(element, rules);
		}

		// console.log(formData);
		// console.log(formValidation);

		this.setState({formData, formValidation});
		return {formData, formValidation}
	}

	static validate(element, rules) {

		const { required, name, value, type } = element;

		if ( required && !value ) {
			return rules.required;
		} else {
			let isValid;
			switch (type) {
				case 'email':
					// after read this https://habrahabr.ru/post/175375/
					//let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					// i`ve changed
					let re = /.+@.+\..+/i;
					isValid = re.test(value);
					return !isValid && rules.email;
					break;
			}
		}

		return false;
	}

}

export default Form