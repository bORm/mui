'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _objectKeys = require('helpers/objectKeys');

var _objectKeys2 = _interopRequireDefault(_objectKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};
function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

// get successful control from form and assemble into object
// http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2

// types which indicate a submit action and are not successful controls
// these will be ignored
var k_r_submitter = /^(?:submit|button|image|reset)$/i;

// node names which could be successful controls
var k_r_success_contrls = /^(?:input|select|textarea|keygen)/i;

// Matches bracket notation.
var brackets = /(\[[^\[\]]*\])/g;

var Form = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Form, _Component);

  function Form(props) {
    (0, _classCallCheck3.default)(this, Form);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || (0, _getPrototypeOf2.default)(Form)).call(this, props));

    _this.form = {
      data: {},
      validation: {}
    };
    _this.state = (0, _extends4.default)({}, _this.form, {
      rules: props.rules,
      names: props.names
    });
    return _this;
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


  (0, _createClass3.default)(Form, [{
    key: 'onSubmit',
    value: function onSubmit() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (validate) {
        e.preventDefault && e.preventDefault();
        //return false;
      }
      var _props = this.props,
          validate = _props.validate,
          onSubmit = _props.onSubmit,
          disabled = _props.disabled;


      if (!disabled) {
        this.form = this.getFormData();
        var _form = this.form,
            data = _form.data,
            validation = _form.validation;

        console.log(validation, data);
        if (validate && (0, _objectKeys2.default)(validation).length) {
          onSubmit && onSubmit(e, data, validation);
        }
      }

      /*if ( validate ) {
        e.preventDefault();
        return false;
      }*/
    }
  }, {
    key: 'submit',
    value: function submit() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      e.preventDefault && e.preventDefault();
      var _props2 = this.props,
          validate = _props2.validate,
          onSubmit = _props2.onSubmit;

      this.form = this.getFormData();
      var _form2 = this.form,
          data = _form2.data,
          validation = _form2.validation;


      if (validate && (0, _objectKeys2.default)(validation).length) {
        onSubmit && onSubmit(event, data, validation);
      }

      console.log(1);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { className: this.props.className, ref: 'form',
          method: this.props.method, action: this.props.action,
          onSubmit: this.onSubmit.bind(this),
          noValidate: this.props.validate },
        this.getFormElements(this.props.children)
      );
    }
  }, {
    key: 'getFormElements',
    value: function getFormElements(children) {
      var _this2 = this;

      var _state = this.state,
          validation = _state.validation,
          rules = _state.rules,
          names = _state.names;
      var disabled = this.props.disabled;


      return _react2.default.Children.map(children, function (child) {
        // If the child has its own children, traverse through them also...
        // in the search for elements

        if (child !== null) {
          var props = child.props;


          if (props && (0, _keys2.default)(props).length) {
            var _ret = function () {
              children = props && props.children;

              var name = props.name,
                  required = props.required,
                  value = props.value,
                  type = props.type,
                  min = props.min,
                  max = props.max,
                  minLength = props.minLength,
                  maxLength = props.maxLength,
                  danger = props.danger,
                  warning = props.warning;


              var childProps = {
                onBlur: function onBlur(e) {
                  _this2.setState({
                    validation: Form.isValidElement(validation, {
                      required: required, name: name, value: e.target.value, type: type, min: min, max: max, minLength: minLength, maxLength: maxLength
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

              var isInvalid = validation[name] || names[name];

              if (props.hasOwnProperty('danger')) {
                childProps['danger'] = !!(required || danger) && isInvalid || danger;
              }
              if (props.hasOwnProperty('warning')) {
                childProps['warning'] = !!(!required || warning) && isInvalid || warning;
              }

              if (name) {
                return {
                  v: (0, _react.cloneElement)(child, childProps, _this2.getFormElements(children))
                };
              } else if (children) {
                if (typeof children === 'string') {
                  return {
                    v: (0, _react.cloneElement)(child, {}, children)
                  };
                }
                return {
                  v: (0, _react.cloneElement)(child, {}, _this2.getFormElements(children))
                };
              } else {
                return {
                  v: (0, _react.cloneElement)(child, childProps)
                };
              }
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
          }
        }

        return child;
      });
    }
  }, {
    key: 'getFormData',


    /**
     *
     * @returns {{data: {}, validation: {}}}
     */
    value: function getFormData() {
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
      var form = (0, _reactDom.findDOMNode)(this.refs['form']);
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

  }, {
    key: 'serialize',
    value: function serialize(form, options) {
      if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) != 'object') {
        options = { hash: !!options };
      } else if (options.hash === undefined) {
        options.hash = true;
      }

      var result = options.hash ? {} : '',
          validation = {};

      var rules = this.state.rules;


      var serializer = options.serializer || (options.hash ? Form.hash_serializer : Form.str_serialize);

      var elements = form && form.elements ? form.elements : [];

      //Object store each radio and set if it's empty or not
      var radio_store = (0, _create2.default)(null);

      for (var i = 0; i < elements.length; ++i) {
        var element = elements[i];

        // ingore disabled fields
        if (!options.disabled && element.disabled || !element.name) {
          continue;
        }
        // ignore anyhting that is not considered a success field
        if (!k_r_success_contrls.test(element.nodeName) || k_r_submitter.test(element.type)) {
          continue;
        }

        var key = element.name;
        var val = element.value;

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
            } else if (element.checked) {
              radio_store[element.name] = true;
            }
          }

          // if options empty is true, continue only if its radio
          if (val == undefined && element.type == 'radio') {
            continue;
          }
        } else {
          // value-less fields are ignored unless options.empty is true
          if (!val) {
            continue;
          }
        }

        // multi select boxes
        if (element.type === 'select-multiple') {
          val = [];

          var selectOptions = element.options;
          var isSelectedOptions = false;
          for (var j = 0; j < selectOptions.length; ++j) {
            var option = selectOptions[j];
            var allowedEmpty = options.empty && !option.value;
            var hasValue = option.value || allowedEmpty;
            if (option.selected && hasValue) {
              isSelectedOptions = true;

              // If using a hash serializer be sure to add the
              // correct notation for an array in the multi-select
              // context. Here the name attribute on the select element
              // might be missing the trailing bracket pair. Both names
              // "foo" and "foo[]" should be arrays.
              if (options.hash && key.slice(key.length - 2) !== '[]') {
                result = serializer(result, key + '[]', option.value);
              } else {
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

        var isValid = Form.validate(element, rules);
        if (isValid !== false) {
          validation[element.name] = Form.validate(element, rules);
        }

        result = serializer(result, key, val);
      }

      // Check for all empty radio buttons and serialize them with key=""
      if (options.empty) {
        for (var _key in radio_store) {
          if (!radio_store[_key]) {
            result = serializer(result, _key, '');
          }
        }
      }

      validation = (0, _extends4.default)({}, this.state.validation, validation);

      //return result;
      this.setState({ data: result, validation: validation });
      return { data: result, validation: validation };
    }
  }], [{
    key: 'isValidElement',
    value: function isValidElement(validation, element, rules) {
      var isValid = Form.validate(element, rules);
      var name = element.name;

      if (!isValid) {
        delete validation[name];
      } else {
        validation[name] = isValid;
      }
      return validation;
    }
  }, {
    key: 'parse_keys',
    value: function parse_keys(string) {
      var keys = [];
      var prefix = /^([^\[\]]*)/;
      var children = new RegExp(brackets);
      var match = prefix.exec(string);

      if (match[1]) {
        keys.push(match[1]);
      }

      while ((match = children.exec(string)) !== null) {
        keys.push(match[1]);
      }

      return keys;
    }
  }, {
    key: 'hash_assign',
    value: function hash_assign(result, keys, value) {
      if (keys.length === 0) {
        result = value;
        return result;
      }

      var key = keys.shift();
      var between = key.match(/^\[(.+?)\]$/);

      if (key === '[]') {
        result = result || [];

        if (Array.isArray(result)) {
          result.push(Form.hash_assign(null, keys, value));
        } else {
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
      } else {
        var string = between[1];
        // +var converts the variable into a number
        // better than parseInt because it doesn't truncate away trailing
        // letters and actually fails if whole thing is not a number
        var index = +string;

        // If the characters between the brackets is not a number it is an
        // attribute name and can be assigned directly.
        if (isNaN(index)) {
          result = result || {};
          result[string] = Form.hash_assign(result[string], keys, value);
        } else {
          result = result || [];
          result[index] = Form.hash_assign(result[index], keys, value);
        }
      }

      return result;
    }

    // Object/hash encoding serializer.

  }, {
    key: 'hash_serializer',
    value: function hash_serializer(result, key, value) {
      var matches = key.match(brackets);

      // Has brackets? Use the recursive assignment function to walk the keys,
      // construct any missing objects in the result tree and make the assignment
      // at the end of the chain.
      if (matches) {
        var keys = Form.parse_keys(key);
        Form.hash_assign(result, keys, value);
      } else {
        // Non bracket notation can make assignments directly.
        var existing = result[key];

        // If the value has been assigned already (for instance when a radio and
        // a checkbox have the same name attribute) convert the previous value
        // into an array before pushing into it.
        //
        // NOTE: If this requirement were removed all hash creation and
        // assignment could go through `hash_assign`.
        if (existing) {
          if (!Array.isArray(existing)) {
            result[key] = [existing];
          }

          result[key].push(value);
        } else {
          result[key] = value;
        }
      }

      return result;
    }

    // urlform encoding serializer

  }, {
    key: 'str_serialize',
    value: function str_serialize(result, key, value) {
      // encode newlines as \r\n cause the html spec says so
      value = value.replace(/(\r)?\n/g, '\r\n');
      value = encodeURIComponent(value);

      // spaces should be '+' rather than '%20'.
      value = value.replace(/%20/g, '+');
      return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;
    }
  }, {
    key: 'validate',
    value: function validate(element, rules) {
      var required = element.required,
          value = element.value,
          type = element.type,
          min = element.min,
          max = element.max,
          minLength = element.minLength,
          maxLength = element.maxLength;

      var message = void 0;
      if (required) {
        if (!value) {
          message = rules.required;
        } else {
          var isValid = void 0,
              re = void 0;

          var length = value.length;
          if (minLength !== -1 && length < parseInt(minLength)) {
            message = typeof rules.minLength === 'function' ? rules.minLength({ minLength: minLength }) : rules.minLength;
          }

          if (maxLength !== -1 && length > parseInt(maxLength)) {
            message = typeof rules.maxLength === 'function' ? rules.maxLength({ maxLength: maxLength }) : rules.maxLength;
          }

          switch (type) {
            case 'email':
              // after read this https://habrahabr.ru/post/175375/
              //let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              // i`ve changed
              re = /.+@.+\..+/i;
              isValid = re.test(value);
              //return !isValid && rules.email;
              if (!isValid) {
                message = rules.email;
              }
              break;
            case 'tel':
              //let re = /.+@.+\..+/i;
              re = /^\+380\d{9}$/;
              isValid = re.test(value);
              if (!isValid) {
                message = rules.tel;
              }
              break;
            case 'number':
              var int = parseInt(value);
              if (!!min && !(parseInt(min) <= int)) {
                message = typeof rules.min === 'function' ? rules.min({ min: min }) : rules.min;
              }

              if (!!max && !(parseInt(max) >= int)) {
                message = typeof rules.max === 'function' ? rules.max({ max: max }) : rules.max;
              }
              break;
          }
        }
      }

      return !!message ? message : false;
    }
  }]);
  return Form;
}(_react.Component), _class.propTypes = {
  id: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),
  action: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool]),
  onSubmit: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.bool]),
  validate: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.object]),
  rules: _react.PropTypes.object,
  names: _react.PropTypes.object,
  disabled: _react.PropTypes.bool
}, _class.defaultProps = {
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
    maxLength: 'Value is`t valid'
  },
  names: {},
  onSubmit: function onSubmit() {},
  ref: 'form',
  disabled: false
}, _temp);
exports.default = Form;
//# sourceMappingURL=Form.js.map
