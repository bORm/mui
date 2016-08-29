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
		rules: PropTypes.object,
		names: PropTypes.object,
	};

	static defaultProps = {
		id: false,
		action: '#',
		onSubmit: false,
		validate: true,
		rules: {
			required: 'Field is`nt be empty!',
			email: 'Not valid email'
		},
		names: {}
	};

	constructor(props) {
		super(props);

		this.form = {
			data: {},
			validation: {}
		};
		this.state = {
			...this.form,
			rules: props.rules,
			names: props.names
		};
	}

	render() {
		const { action, children, validate, className } = this.props;
		return (
			<form className={className}
			      method="post" action={action}
			      onSubmit={::this.onSubmit}
			      noValidate={validate}>
				{ this.getFormElements(children) }
			</form>
		);
	}

	/**
	* Used if submit button out of the form
		<button onClick={(e)=>{
			this.refs[ REF_NAME ].onSubmit(e);
		}}>Submit</button>
	* @param e
	* @returns {*}
	*/
	onSubmit(e){
		const { validate, onSubmit } = this.props;
		this.form = this.getFormData();
		const { data, validation } = this.form;

		if ( validate && objectKeys(validation).length ) {
			onSubmit && onSubmit(e, data, validation);
		}

		if ( validate ) {
			e.preventDefault();
			return false;
		}

	}

	getFormElements(children){
		const { validation, rules, names } = this.state;

		return React.Children.map(children, (child)=>{
			// If the child has its own children, traverse through them also...
			// in the search for elements

			let {props} = child;

			if ( props && Object.keys(props).length ) {
				children = props && props.children;
				if (children) {
					return cloneElement(child, {

					}, this.getFormElements(children, validation, rules, names));
				}

				let {
					name, required,
					value, type,
					danger, warning
				} = props;
				let isInvalid = validation[name] || names[name];

				return cloneElement(child, {
					danger: !!(required || danger) && isInvalid || danger,
					warning: !!(!required || warning) && isInvalid || warning,
					onBlur: e=>{
						if ( required ) {
							this.setState({
								validation: Form.isValidElement(validation, {
									required, name, value: e.target.value, type
								}, rules)
							});
						}
					}
				});
			}

			return createElement('span', {}, child);

		})
	}

	static isValidElement(validation, element, rules) {
		const isValid = Form.validate(element, rules);
		const { name } = element;
		if ( !isValid ) {
			delete validation[name];
		}
		else {
			validation[name] = isValid;
		}
		return validation;
	}

	/**
	 *
	 * @returns {{data: {}, validation: {}}}
	 */
	getFormData() {
		const elements = findDOMNode(this).elements,
			length = elements.length;
		const data = {}, validation = {};

		const { rules } = this.state;

		for ( let i=0, element, name, type, value; i<length; i++ ) {
			element = elements[i];
			name = element.name;
			type = element.type;
			value = element.value;
			if ( !name ) break;
			// Create data obj
			data[name] = value;
			// Validate it
			const isValid = Form.validate(element, rules);
			if ( isValid !== false ) {
				validation[name] = Form.validate(element, rules);
			}
		}

		// console.log(data);
		// console.log(validation);

		this.setState({data, validation});
		return {data, validation}
	}

	static validate(element, rules) {

		const { required, value, type } = element;
		let message;
		if ( required && !value ) {
			message = rules.required;
		} else {
			let isValid;
			switch (type) {
				case 'email':
					// after read this https://habrahabr.ru/post/175375/
					//let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					// i`ve changed
					let re = /.+@.+\..+/i;
					isValid = re.test(value);
					//return !isValid && rules.email;
					if ( !isValid ) {
						message = rules.email;
					}
					break;
			}
		}

		return !!(message) ? message : false;

	}

}

export default Form