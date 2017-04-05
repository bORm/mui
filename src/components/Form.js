import React, { Component, PropTypes, cloneElement, createElement } from 'react'
import { findDOMNode } from 'react-dom'
import objectKeys from 'helpers/objectKeys'

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// get successful control from form and assemble into object
// http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2

// types which indicate a submit action and are not successful controls
// these will be ignored
let k_r_submitter = /^(?:submit|button|image|reset)$/i;

// node names which could be successful controls
let k_r_success_contrls = /^(?:input|select|textarea|keygen)/i;

// Matches bracket notation.
let brackets = /(\[[^\[\]]*\])/g;


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
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    action: '#',
    method: 'post',
    //onSubmit: false,
    validate: true,
    rules: {
      required: 'Field is`nt be empty!',
      email: 'Not valid email',
      tel: 'Not valid phone number',
      min: 'Value is`t valid',
      max: 'Value is`t valid',
      minLength: 'Value is`t valid',
      maxLength: 'Value is`t valid',
    },
    names: {},
    onSubmit: function onSubmit() {},
    ref: 'form',
    disabled: false
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

	/*shouldComponentUpdate(nextProps, nextState) {
	 return nextState.rules !== this.state.rules;
	 }*/

  /**
   * Used if submit button out of the form
   <button onClick={(e)=>{
			this.refs[ REF_NAME ].onSubmit(e);
		}}>Submit</button>
   or
   findDOMNode(this.refs.[ REF_NAME ]).dispatchEvent(new Event("submit"));
   * @param e
   * @returns {*}
   */
  onSubmit(e = {}){
    if ( validate ) {
      e.preventDefault && e.preventDefault();
      //return false;
    }
    const { validate, onSubmit, disabled } = this.props;

    if ( !disabled ) {
      this.form = this.getFormData();
      const { data, validation } = this.form;
      console.log(validation, data)
      if ( validate && objectKeys(validation).length ) {
        onSubmit && onSubmit(e, data, validation);
      }
    }

    /*if ( validate ) {
      e.preventDefault();
      return false;
    }*/

  }

  submit(e = {}){
    e.preventDefault && e.preventDefault();
    const { validate, onSubmit } = this.props;
    this.form = this.getFormData();
    const { data, validation } = this.form;

    if ( validate && objectKeys(validation).length ) {
      onSubmit && onSubmit(event, data, validation);
    }

    console.log(1);
  }

  render() {
    return (
      <form className={this.props.className} ref={'form'}
            method={this.props.method} action={this.props.action}
            onSubmit={::this.onSubmit}
            noValidate={this.props.validate}>
        { this.getFormElements(this.props.children) }
      </form>
    );
  }

  getFormElements(children){
    const { validation, rules, names } = this.state;
    const { disabled } = this.props;

    return React.Children.map(children, child=>{
      // If the child has its own children, traverse through them also...
      // in the search for elements

      if ( child !== null ) {
        let {props} = child;

        if ( props && Object.keys(props).length ) {
          children = props && props.children;

          let {
            name, required,
            value, type,
            min, max,
            minLength, maxLength,
            danger, warning,
          } = props;

          let childProps = {
            onBlur: e=>{
              this.setState({
                validation: Form.isValidElement(validation, {
                  required, name, value: e.target.value, type, min, max, minLength, maxLength
                }, rules)
              });
            }, disabled: disabled ? disabled : props.disabled
          };

          /*if ( props.hasOwnProperty('onDrop') ) {
            childProps.onDrop = (e)=>{
              this.setState({
                validation: Form.isValidElement(validation, {
                  required, name, value: e.target.value, type, min, max, minLength, maxLength
                }, rules)
              });
              return childProps.onDrop;
            }
          }*/

					/*if ( type === 'select' ) {
					 //debugger
					 childProps.onChange = (e)=>{
					 console.log(e.target);
					 childProps.onBlur(e);
					 return child.props.onChange;
					 };
					 }*/

          let isInvalid = validation[name] || names[name];

          if ( props.hasOwnProperty('danger') ) {
            childProps['danger'] = !!(required || danger) && isInvalid || danger;
          }
          if ( props.hasOwnProperty('warning') ) {
            childProps['warning'] = !!(!required || warning) && isInvalid || warning;
          }

          if ( name ) {
            return cloneElement(child, childProps, this.getFormElements(children));
          }	else if ( children ) {
            if ( typeof children === 'string' ) {
              return cloneElement(child, {

              }, children);
            }
            return cloneElement(child, {

            }, this.getFormElements(children));
          }	else {
            return cloneElement(child, childProps);
          }

        }
      }

      return child;
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
		/*const { ref } = this.props;
		 const form = findDOMNode(this.refs[ref]);
		 console.log(this.serialize(form, { hash: true }));
		 const elements = findDOMNode(this.refs[ref]).elements,
		 length = elements.length;
		 const data = {}, validation = {};

		 const { rules } = this.state;

		 for ( let i=0, element, name, type, value; i<length; i++ ) {
		 element = elements[i];
		 name = element.name;
		 type = element.type;
		 value = element.value;
		 if ( !name ) continue;

		 if ( type === 'checkbox' || type === 'radio' ) {
		 if ( element.checked ) {
		 data[name] = value;
		 }	else if ( !data[name] ) {
		 data[name] = null;
		 }
		 }	else {
		 // Create data obj

		 var between = name.match(/^\[(.+?)\]$/);
		 console.log(between)

		 data[name] = value;
		 }
		 // Validate it
		 const isValid = Form.validate(element, rules);
		 if ( isValid !== false ) {
		 validation[name] = Form.validate(element, rules);
		 }
		 }

		 this.setState({data, validation});
		 return {data, validation}*/
    //const { ref } = this.props;

    //let form = findDOMNode(this.refs.form);

    //debugger
    //const form = findDOMNode(this.refs.form);
    //const { ref } = this.props;
    const form = findDOMNode(this.refs['form']);
    return this.serialize(form, { hash: true, empty: true, disabled: true });
  }

  /**
   * "name": "form-serialize",
   * "version": "0.7.1",
   * "repository": {
   * 		"type": "git",
   * 		"url": "git://github.com/shtylman/form-serialize.git"
   * }
   * @param form
   * @param options
   * @returns {{data: *, validation: {}}}
   */
  // serializes form fields
  // @param form MUST be an HTMLForm element
  // @param options is an optional argument to configure the serialization. Default output
  // with no options specified is a url encoded string
  //    - hash: [true | false] Configure the output type. If true, the output will
  //    be a js object.
  //    - serializer: [function] Optional serializer function to override the default one.
  //    The function takes 3 arguments (result, key, value) and should return new result
  //    hash and url encoded str serializers are provided with this module
  //    - disabled: [true | false]. If true serialize disabled fields.
  //    - empty: [true | false]. If true serialize empty fields
  serialize(form, options) {
    if (typeof options != 'object') {
      options = { hash: !!options };
    }
    else if (options.hash === undefined) {
      options.hash = true;
    }

    let result = (options.hash) ? {} : '', validation = {};

    const { rules } = this.state;

    let serializer = options.serializer || ((options.hash) ? Form.hash_serializer : Form.str_serialize);

    let elements = form && form.elements ? form.elements : [];

    //Object store each radio and set if it's empty or not
    let radio_store = Object.create(null);

    for (let i=0; i<elements.length; ++i) {
      let element = elements[i];

      // ingore disabled fields
      if ((!options.disabled && element.disabled) || !element.name) {
        continue;
      }
      // ignore anyhting that is not considered a success field
      if (!k_r_success_contrls.test(element.nodeName) ||
        k_r_submitter.test(element.type)) {
        continue;
      }

      let key = element.name;
      let val = element.value;

      // we can't just use element.value for checkboxes cause some browsers lie to us
      // they say "on" for value when the box isn't checked
      if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {
        val = undefined;
      }

      // If we want empty elements
      if (options.empty) {
        // for checkbox
        if (element.type === 'checkbox') {
          val = element.checked;
        }

        // for radio
        if (element.type === 'radio') {
          if (!radio_store[element.name] && !element.checked) {
            radio_store[element.name] = false;
          }
          else if (element.checked) {
            radio_store[element.name] = true;
          }
        }

        // if options empty is true, continue only if its radio
        if (val == undefined && element.type == 'radio') {
          continue;
        }
      }
      else {
        // value-less fields are ignored unless options.empty is true
        if (!val) {
          continue;
        }
      }

      // multi select boxes
      if (element.type === 'select-multiple') {
        val = [];

        let selectOptions = element.options;
        let isSelectedOptions = false;
        for (let j=0 ; j<selectOptions.length ; ++j) {
          let option = selectOptions[j];
          let allowedEmpty = options.empty && !option.value;
          let hasValue = (option.value || allowedEmpty);
          if (option.selected && hasValue) {
            isSelectedOptions = true;

            // If using a hash serializer be sure to add the
            // correct notation for an array in the multi-select
            // context. Here the name attribute on the select element
            // might be missing the trailing bracket pair. Both names
            // "foo" and "foo[]" should be arrays.
            if (options.hash && key.slice(key.length - 2) !== '[]') {
              result = serializer(result, key + '[]', option.value);
            }
            else {
              result = serializer(result, key, option.value);
            }
          }
        }

        // Serialize if no selected options and options.empty is true
        if (!isSelectedOptions && options.empty) {
          result = serializer(result, key, '');
        }

        continue;
      }

      const isValid = Form.validate(element, rules);
      if ( isValid !== false ) {
        validation[element.name] = Form.validate(element, rules);
      }

      result = serializer(result, key, val);
    }

    // Check for all empty radio buttons and serialize them with key=""
    if (options.empty) {
      for (let key in radio_store) {
        if (!radio_store[key]) {
          result = serializer(result, key, '');
        }
      }
    }

    validation = {
      ...this.state.validation,
      ...validation
    };

    //return result;
    this.setState({data: result, validation});
    return {data: result, validation}
  }

  static parse_keys(string) {
    let keys = [];
    let prefix = /^([^\[\]]*)/;
    let children = new RegExp(brackets);
    let match = prefix.exec(string);

    if (match[1]) {
      keys.push(match[1]);
    }

    while ((match = children.exec(string)) !== null) {
      keys.push(match[1]);
    }

    return keys;
  }

  static hash_assign(result, keys, value) {
    if (keys.length === 0) {
      result = value;
      return result;
    }

    let key = keys.shift();
    let between = key.match(/^\[(.+?)\]$/);

    if (key === '[]') {
      result = result || [];

      if (Array.isArray(result)) {
        result.push(Form.hash_assign(null, keys, value));
      }
      else {
        // This might be the result of bad name attributes like "[][foo]",
        // in this case the original `result` object will already be
        // assigned to an object literal. Rather than coerce the object to
        // an array, or cause an exception the attribute "_values" is
        // assigned as an array.
        result._values = result._values || [];
        result._values.push(Form.hash_assign(null, keys, value));
      }

      return result;
    }

    // Key is an attribute name and can be assigned directly.
    if (!between) {
      result[key] = Form.hash_assign(result[key], keys, value);
    }
    else {
      let string = between[1];
      // +var converts the variable into a number
      // better than parseInt because it doesn't truncate away trailing
      // letters and actually fails if whole thing is not a number
      let index = +string;

      // If the characters between the brackets is not a number it is an
      // attribute name and can be assigned directly.
      if (isNaN(index)) {
        result = result || {};
        result[string] = Form.hash_assign(result[string], keys, value);
      }
      else {
        result = result || [];
        result[index] = Form.hash_assign(result[index], keys, value);
      }
    }

    return result;
  }

  // Object/hash encoding serializer.
  static hash_serializer(result, key, value) {
    let matches = key.match(brackets);

    // Has brackets? Use the recursive assignment function to walk the keys,
    // construct any missing objects in the result tree and make the assignment
    // at the end of the chain.
    if (matches) {
      let keys = Form.parse_keys(key);
      Form.hash_assign(result, keys, value);
    }
    else {
      // Non bracket notation can make assignments directly.
      let existing = result[key];

      // If the value has been assigned already (for instance when a radio and
      // a checkbox have the same name attribute) convert the previous value
      // into an array before pushing into it.
      //
      // NOTE: If this requirement were removed all hash creation and
      // assignment could go through `hash_assign`.
      if (existing) {
        if (!Array.isArray(existing)) {
          result[key] = [ existing ];
        }

        result[key].push(value);
      }
      else {
        result[key] = value;
      }
    }

    return result;
  }

  // urlform encoding serializer
  static str_serialize(result, key, value) {
    // encode newlines as \r\n cause the html spec says so
    value = value.replace(/(\r)?\n/g, '\r\n');
    value = encodeURIComponent(value);

    // spaces should be '+' rather than '%20'.
    value = value.replace(/%20/g, '+');
    return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;
  }

  static validate(element, rules) {

    const { required, value, type, min, max, minLength, maxLength } = element;
    let message;
    if ( required ) {
      if ( !value ) {
        message = rules.required;
      } else {
        let isValid, re;

        let length = value.length;
        if ( minLength !== -1 && length < parseInt(minLength) ) {
          message = typeof rules.minLength === 'function' ? rules.minLength({minLength}) : rules.minLength;
        }

        if ( maxLength !== -1 && length > parseInt(maxLength) ) {
          message = typeof rules.maxLength === 'function' ? rules.maxLength({maxLength}) : rules.maxLength;
        }

        switch (type) {
          case 'email':
            // after read this https://habrahabr.ru/post/175375/
            //let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            // i`ve changed
            re = /.+@.+\..+/i;
            isValid = re.test(value);
            //return !isValid && rules.email;
            if ( !isValid ) {
              message = rules.email;
            }
            break;
          case 'tel':
            //let re = /.+@.+\..+/i;
            re = /^\+380\d{9}$/;
            isValid = re.test(value);
            if ( !isValid ) {
              message = rules.tel;
            }
            break;
          case 'number':
            let int = parseInt(value);
            if ( !!(min) && !(parseInt(min) <= int) ) {
              message = typeof rules.min === 'function' ? rules.min({min}) : rules.min;
            }

            if ( !!(max) && !(parseInt(max) >= int) ) {
              message = typeof rules.max === 'function' ? rules.max({max}) : rules.max;
            }
            break;
        }

      }
    }

    return !!(message) ? message : false;

  }

}

export default Form