import React, { Component, PropTypes, cloneElement, createElement } from 'react'
import { findDOMNode } from 'react-dom'
import { objectKeys } from 'helpers/index'

class Form extends Component {
	static propTypes = {
		action: PropTypes.oneOfType([
			PropTypes.string, PropTypes.bool
		]),
		onSubmit: PropTypes.oneOfType([
			PropTypes.func, PropTypes.bool
		]),
		validate: PropTypes.bool
	};

	static defaultProps = {
		action: '#',
		onSubmit: false,
		validate: true
	};

	constructor(props) {
		super(props);
		this.state = {
			formData: {},
			formValidation: {}
		};
	}

	render() {
		const { action, children, validate, ...other } = this.props;
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
	 * <button onClick={(e)=>{
			this.refs[ this.form.ref ].onSubmit(e);
		}}>Submit</button>
	 * @param e
	 * @returns {*}
	 */
	onSubmit(e){
		const { validate } = this.props;
		this.getFormData();
		if ( validate && objectKeys(this.state.formValidation).length ) {
			e.preventDefault();
			return false;
		}
		console.log(this.state);
		return this.props.onSubmit(e);
	}

	static getFormElements(children, formValidation){
		//debugger;
		return React.Children.map(children, (child)=>{
			//console.log(child.type);
			//debugger;
			/*console.log(child.type);
			 console.log(Field);
			 console.log(child.type === Field);*/

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
	 * getFormData
	 * @returns {{formData}}
	 */
	getFormData() {
		const elements = findDOMNode(this).elements,
			length = elements.length;
		const formData = {}, formValidation = {};

		for ( let i=0, element, name, type, value; i<length; i++ ) {
			element = elements[i];
			name = element.name;
			type = element.type;
			value = element.value;
			if ( !name ) break;
			// Create formData obj
			formData[name] = value;
			// Validate it
			formValidation[name] = Form.validate(element);
		}

		// console.log(formData);
		// console.log(formValidation);

		this.setState({formValidation});
		return formData;

	}

	static validate(element) {

		const { required, name, value, type } = element;

		if ( required && !value ) {
			return 'Field is`nt be empty!';
		} else {
			let isValid;
			switch (type) {
				case 'email':
					let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					isValid = re.test(value);
					return !isValid && 'Not valid email';
					break;
			}
		}

		return false;
	}

}

export default Form