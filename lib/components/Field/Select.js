'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _DropDown = require('../DropDown/DropDown');

var _DropDown2 = _interopRequireDefault(_DropDown);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var Select = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(Select, _Component);

  function Select() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Select);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: '',
      field: ''
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Select, [{
    key: 'hasValue',


    /**
     * Check isValid oneOf([value, defaultValue])
     * @param props
     * @param callback
     * value = value || defaultValue
     * setState({value});
     */
    value: function hasValue(props) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var value = props.value,
          defaultValue = props.defaultValue;

      var hasValue = _Field2.default.isValidValue(value) ? value : _Field2.default.isValidValue(defaultValue) ? defaultValue : '';

      var field = '';
      if (hasValue !== '') {
        _react2.default.Children.forEach(props.children, function (child) {
          if (child && child.props.value == hasValue) {
            field = child.props.text;
          }
        });
      }

      this.setState({
        value: hasValue,
        field: field,
        hasValue: !!(typeof hasValue === 'number' ? (0, _stringify2.default)(hasValue) : hasValue)
      }, callback);
      return hasValue;
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.hasValue(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {

      if (props.hasOwnProperty('value')) {
        this.hasValue(props);
      } else {
        this.hasValue((0, _extends3.default)({}, props, {
          value: this.state.value
        }));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          floating = _props.floating,
          placeholder = _props.placeholder,
          autoComplete = _props.autoComplete,
          defaultValue = _props.defaultValue,
          type = _props.type,
          name = _props.name,
          large = _props.large,
          small = _props.small,
          block = _props.block,
          required = _props.required,
          disabled = _props.disabled,
          success = _props.success,
          warning = _props.warning,
          danger = _props.danger;
      var _state = this.state,
          value = _state.value,
          field = _state.field;


      var inputProps = {
        floating: floating,
        placeholder: placeholder,
        autoComplete: autoComplete,
        // value: '',
        // defaultValue: '',
        type: type, disabled: disabled, value: field,
        large: large, small: small, block: block,
        success: success, warning: warning, danger: danger,
        name: '', required: false,
        ref: 'input', readOnly: true
      };

      var control = _react2.default.createElement(_Field2.default, inputProps);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _DropDown2.default,
          { control: control, onChange: function onChange(e, selected) {
              var value = selected.value;

              _this2.hasValue({ defaultValue: defaultValue, value: value }, function () {
                _this2.props.onChange(e, selected);
                _this2.props.onBlur({ target: { value: value } });
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
            } },
          this.props.children
        ),
        _react2.default.createElement(
          'select',
          (0, _extends3.default)({ hidden: true }, { name: name, required: required }, { ref: 'select', value: value, onChange: function onChange(e) {} }),
          _react2.default.createElement(
            'option',
            { value: '', hidden: true },
            'Select'
          ),
          function (options) {
            var value = void 0,
                text = void 0;
            return _react.Children.map(options, function (option) {
              text = !!option.props.text ? option.props.text : option.props.children;
              value = option.props.value ? option.props.value : text;
              return _react2.default.createElement(
                'option',
                { key: option.key, value: value },
                text
              );
            });
            {/*let value, text;
              return options.map(option=>{
               text = !!(option.props.text) ? option.props.text : option.props.children;
               value = option.props.value ? option.props.value : text;
               return <option key={option.key} value={value}>{text}</option>;
              })*/}
          }(this.props.children)
        )
      );
    }
  }]);
  return Select;
}(_react.Component), _class.propTypes = (0, _extends3.default)({}, _Field2.default.propTypes, {
  onChange: _react.PropTypes.func,
  onBlur: _react.PropTypes.func
}), _class.defaultProps = (0, _extends3.default)({}, _Field2.default.defaultProps, {
  type: 'select',
  onChange: function onChange(e, selected) {},
  onBlur: function onBlur(e) {}
}), _temp2);
exports.default = Select;
//# sourceMappingURL=Select.js.map
