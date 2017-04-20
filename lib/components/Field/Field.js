'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _helpers = require('helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Field = function (_Component) {
	(0, _inherits3.default)(Field, _Component);
	(0, _createClass3.default)(Field, [{
		key: 'getInputDOMNode',
		value: function getInputDOMNode() {
			var input = this.refs['entry'];

			if (!input) {
				return null;
			}

			// React 0.14
			if (Field.isDOMElement(input)) {
				return input;
			}

			return (0, _reactDom.findDOMNode)(input);
		}
	}, {
		key: 'enableValueAccessors',
		value: function enableValueAccessors() {
			var _this2 = this;

			if (this.canUseAccessors) {
				(function () {
					var input = _this2.getInputDOMNode();
					_this2.valueDescriptor = (0, _getOwnPropertyDescriptor2.default)((0, _getPrototypeOf2.default)(input), 'value');
					Object.defineProperty(input, 'value', {
						configurable: true,
						enumerable: true,
						get: function get() {
							return _this2.value;
						},
						set: function set(val) {
							_this2.value = val;
							_this2.valueDescriptor.set.call(input, val);
						}
					});
				})();
			}
		}
	}, {
		key: 'disableValueAccessors',
		value: function disableValueAccessors() {
			var valueDescriptor = this.valueDescriptor;

			if (!valueDescriptor) {
				return;
			}
			this.valueDescriptor = null;
			var input = this.getInputDOMNode();
			Object.defineProperty(input, 'value', valueDescriptor);
		}
	}, {
		key: 'getInputValue',
		value: function getInputValue() {
			var input = this.getInputDOMNode();
			var valueDescriptor = this.valueDescriptor;


			var value = void 0;
			if (valueDescriptor) {
				value = valueDescriptor.get.call(input);
			} else {
				value = input.value;
			}

			return value;
		}
	}, {
		key: 'setInputValue',
		value: function setInputValue(val) {
			var input = this.getInputDOMNode();
			this.value = val;
			input.value = val;
		}
	}, {
		key: 'getPrefix',
		value: function getPrefix() {
			var prefix = "";
			var mask = this.mask;

			for (var i = 0; i < mask.length && this.isPermanentChar(i); ++i) {
				prefix += mask[i];
			}
			return prefix;
		}
	}, {
		key: 'getFilledLength',
		value: function getFilledLength() {
			var value = arguments.length <= 0 || arguments[0] === undefined ? this.state.value : arguments[0];

			var i = void 0;
			var maskChar = this.maskChar;


			if (!maskChar) {
				return value.length;
			}

			for (i = value.length - 1; i >= 0; --i) {
				var character = value[i];
				if (!this.isPermanentChar(i) && this.isAllowedChar(character, i)) {
					break;
				}
			}

			return ++i || this.getPrefix().length;
		}
	}, {
		key: 'getLeftEditablePos',
		value: function getLeftEditablePos(pos) {
			for (var i = pos; i >= 0; --i) {
				if (!this.isPermanentChar(i)) {
					return i;
				}
			}
			return null;
		}
	}, {
		key: 'getRightEditablePos',
		value: function getRightEditablePos(pos) {
			var mask = this.mask;

			for (var i = pos; i < mask.length; ++i) {
				if (!this.isPermanentChar(i)) {
					return i;
				}
			}
			return null;
		}
	}, {
		key: 'isEmpty',
		value: function isEmpty() {
			var _this3 = this;

			var value = arguments.length <= 0 || arguments[0] === undefined ? this.state.value : arguments[0];

			return !value.split("").some(function (character, i) {
				return !_this3.isPermanentChar(i) && _this3.isAllowedChar(character, i);
			});
		}
	}, {
		key: 'isFilled',
		value: function isFilled() {
			var value = arguments.length <= 0 || arguments[0] === undefined ? this.state.value : arguments[0];

			return this.getFilledLength(value) === this.mask.length;
		}
	}, {
		key: 'createFilledArray',
		value: function createFilledArray(length, val) {
			var array = [];
			for (var i = 0; i < length; i++) {
				array[i] = val;
			}
			return array;
		}
	}, {
		key: 'formatValue',
		value: function formatValue(value) {
			var _this4 = this;

			var maskChar = this.maskChar;
			var mask = this.mask;

			if (!maskChar) {
				var prefix = this.getPrefix();
				var prefixLen = prefix.length;
				value = this.insertRawSubstr("", value, 0);
				while (value.length > prefixLen && this.isPermanentChar(value.length - 1)) {
					value = value.slice(0, value.length - 1);
				}

				if (value.length < prefixLen) {
					value = prefix;
				}

				return value;
			}
			if (value) {
				var emptyValue = this.formatValue("");
				return this.insertRawSubstr(emptyValue, value, 0);
			}
			return value.split("").concat(this.createFilledArray(mask.length - value.length, null)).map(function (character, pos) {
				if (_this4.isAllowedChar(character, pos)) {
					return character;
				} else if (_this4.isPermanentChar(pos)) {
					return mask[pos];
				}
				return maskChar;
			}).join("");
		}
	}, {
		key: 'clearRange',
		value: function clearRange(value, start, len) {
			var _this5 = this;

			var end = start + len;
			var maskChar = this.maskChar;
			var mask = this.mask;

			if (!maskChar) {
				var _ret2 = function () {
					var prefixLen = _this5.getPrefix().length;
					value = value.split("").filter(function (character, i) {
						return i < prefixLen || i < start || i >= end;
					}).join("");
					return {
						v: _this5.formatValue(value)
					};
				}();

				if ((typeof _ret2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret2)) === "object") return _ret2.v;
			}
			return value.split("").map(function (character, i) {
				if (i < start || i >= end) {
					return character;
				}
				if (_this5.isPermanentChar(i)) {
					return mask[i];
				}
				return maskChar;
			}).join("");
		}
	}, {
		key: 'replaceSubstr',
		value: function replaceSubstr(value, newSubstr, pos) {
			return value.slice(0, pos) + newSubstr + value.slice(pos + newSubstr.length);
		}
	}, {
		key: 'insertRawSubstr',
		value: function insertRawSubstr(value, substr, pos) {
			var mask = this.mask;
			var maskChar = this.maskChar;

			var isFilled = this.isFilled(value);
			var prefixLen = this.getPrefix().length;
			substr = substr.split("");

			if (!maskChar && pos > value.length) {
				value += mask.slice(value.length, pos);
			}

			for (var i = pos; i < mask.length && substr.length;) {
				var isPermanent = this.isPermanentChar(i);
				if (!isPermanent || mask[i] === substr[0]) {
					var character = substr.shift();
					if (this.isAllowedChar(character, i, true)) {
						if (i < value.length) {
							if (maskChar || isFilled || i < prefixLen) {
								value = this.replaceSubstr(value, character, i);
							} else {
								value = this.formatValue(value.substr(0, i) + character + value.substr(i));
							}
						} else if (!maskChar) {
							value += character;
						}
						++i;
					}
				} else {
					if (!maskChar && i >= value.length) {
						value += mask[i];
					} else if (maskChar && isPermanent && substr[0] === maskChar) {
						substr.shift();
					}
					++i;
				}
			}
			return value;
		}
	}, {
		key: 'getRawSubstrLength',
		value: function getRawSubstrLength(value, substr, pos) {
			var mask = this.mask;
			var maskChar = this.maskChar;

			substr = substr.split("");
			var i = pos;
			for (; i < mask.length && substr.length;) {
				if (!this.isPermanentChar(i) || mask[i] === substr[0]) {
					var character = substr.shift();
					if (this.isAllowedChar(character, i, true)) {
						++i;
					}
				} else {
					++i;
				}
			}
			return i - pos;
		}
	}, {
		key: 'isAllowedChar',
		value: function isAllowedChar(character, pos) {
			var allowMaskChar = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
			var mask = this.mask;
			var maskChar = this.maskChar;

			if (this.isPermanentChar(pos)) {
				return mask[pos] === character;
			}
			var ruleChar = mask[pos];
			var charRule = this.charsRules[ruleChar];
			return new RegExp(charRule).test(character || "") || allowMaskChar && character === maskChar;
		}
	}, {
		key: 'isPermanentChar',
		value: function isPermanentChar(pos) {
			return this.permanents.indexOf(pos) !== -1;
		}
	}, {
		key: 'setCaretToEnd',
		value: function setCaretToEnd() {
			if (!!this.mask) {
				var filledLen = this.getFilledLength();
				var pos = this.getRightEditablePos(filledLen);
				if (pos !== null) {
					this.setCaretPos(pos);
				}
			}
		}
	}, {
		key: 'setSelection',
		value: function setSelection(start) {
			var len = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

			var input = this.getInputDOMNode();
			if (!input) {
				return;
			}

			var end = start + len;
			if ("selectionStart" in input && "selectionEnd" in input) {
				input.selectionStart = start;
				input.selectionEnd = end;
			} else {
				var range = input.createTextRange();
				range.collapse(true);
				range.moveStart("character", start);
				range.moveEnd("character", end - start);
				range.select();
			}
		}
	}, {
		key: 'getSelection',
		value: function getSelection() {
			var input = this.getInputDOMNode();
			var start = 0;
			var end = 0;

			if ("selectionStart" in input && "selectionEnd" in input) {
				start = input.selectionStart;
				end = input.selectionEnd;
			} else {
				var range = document.selection.createRange();
				if (range.parentElement() === input) {
					start = -range.moveStart("character", -input.value.length);
					end = -range.moveEnd("character", -input.value.length);
				}
			}

			return {
				start: start,
				end: end,
				length: end - start
			};
		}
	}, {
		key: 'getCaretPos',
		value: function getCaretPos() {
			return this.getSelection().start;
		}
	}, {
		key: 'setCaretPos',
		value: function setCaretPos(pos) {
			var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (fn) {
				return setTimeout(fn, 0);
			};

			var setPos = this.setSelection.bind(this, pos, 0);

			setPos();
			raf(setPos);

			this.lastCaretPos = pos;
		}
	}, {
		key: 'isFocused',
		value: function isFocused() {
			return document.activeElement === this.getInputDOMNode();
		}
	}, {
		key: 'parseMask',
		value: function parseMask(mask) {
			var _this6 = this;

			if (!mask || typeof mask !== "string") {
				return {
					mask: null,
					lastEditablePos: null,
					permanents: []
				};
			}
			var str = "";
			var permanents = [];
			var isPermanent = false;
			var lastEditablePos = null;

			mask.split("").forEach(function (character) {
				if (!isPermanent && character === "\\") {
					isPermanent = true;
				} else {
					if (isPermanent || !_this6.charsRules[character]) {
						permanents.push(str.length);
					} else {
						lastEditablePos = str.length + 1;
					}
					str += character;
					isPermanent = false;
				}
			});

			return {
				mask: str,
				lastEditablePos: lastEditablePos,
				permanents: permanents
			};
		}
	}, {
		key: 'getStringValue',
		value: function getStringValue(value) {
			return !value && value !== 0 ? "" : value + "";
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.hasValue(this.props);
			var mask = this.mask;
			var value = this.state.value;

			if (mask && value) {
				this.setState({ value: value });
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {

			if (nextProps.hasOwnProperty('value')) {
				this.hasValue(nextProps);
			}
			var _props = this.props;
			var required = _props.required;
			var disabled = _props.disabled;

			required !== nextProps.required && this.setState({ required: nextProps.required });
			disabled !== nextProps.disabled && this.setState({ disabled: nextProps.disabled });

			this.haveValue = this.props.value != null;
			this.charsRules = "formatChars" in nextProps ? nextProps.formatChars : this.defaultCharsRules;

			var oldMask = this.mask;
			var mask = this.parseMask(nextProps.mask);
			var isMaskChanged = mask.mask && mask.mask !== this.mask;

			this.mask = mask.mask;
			this.permanents = mask.permanents;
			this.lastEditablePos = mask.lastEditablePos;
			this.maskChar = "maskChar" in nextProps ? nextProps.maskChar : this.defaultMaskChar;

			if (!this.mask) {
				return;
			}

			var newValue = nextProps.value != null ? this.getStringValue(nextProps.value) : this.state.value;

			if (!oldMask && nextProps.value == null) {
				newValue = this.getInputDOMNode().value;
			}

			var showEmpty = nextProps.alwaysShowMask || this.isFocused();
			if (isMaskChanged || mask.mask && (newValue || showEmpty && !this.haveValue)) {
				newValue = this.formatValue(newValue);

				if (isMaskChanged) {
					var pos = this.lastCaretPos;
					var filledLen = this.getFilledLength(newValue);
					if (filledLen < pos) {
						this.setCaretPos(this.getRightEditablePos(filledLen));
					}
				}
			}
			if (mask.mask && this.isEmpty(newValue) && !showEmpty && !this.haveValue) {
				newValue = "";
			}
			this.value = newValue;
			if (this.state.value !== newValue) {
				this.setState({ value: newValue });
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if ((this.mask || prevProps.mask) && this.props.value == null) {
				this.updateUncontrolledInput();
			}
			if (this.valueDescriptor && this.getInputValue() !== this.state.value) {
				this.setInputValue(this.state.value);
			}
		}
	}, {
		key: 'updateUncontrolledInput',
		value: function updateUncontrolledInput() {
			if (this.getInputValue() !== this.state.value) {
				this.setInputValue(this.state.value);
			}
		}
	}, {
		key: 'onKeyDown',
		value: function onKeyDown(event) {
			var hasHandler = typeof this.props.onKeyDown === "function";
			if (event.ctrlKey || event.metaKey) {
				if (hasHandler) {
					this.props.onKeyDown(event);
				}
				return;
			}

			var caretPos = this.getCaretPos();
			var value = this.state.value;
			var key = event.key;
			var preventDefault = false;
			switch (key) {
				case "Backspace":
				case "Delete":
					var prefixLen = this.getPrefix().length;
					var deleteFromRight = key === "Delete";
					var selectionRange = this.getSelection();
					if (selectionRange.length) {
						value = this.clearRange(value, selectionRange.start, selectionRange.length);
					} else if (caretPos < prefixLen || !deleteFromRight && caretPos === prefixLen) {
						caretPos = prefixLen;
					} else {
						var editablePos = deleteFromRight ? this.getRightEditablePos(caretPos) : this.getLeftEditablePos(caretPos - 1);
						if (editablePos !== null) {
							value = this.clearRange(value, editablePos, 1);
							caretPos = editablePos;
						}
					}
					preventDefault = true;
					break;
				default:
					break;
			}

			if (hasHandler) {
				this.props.onKeyDown(event);
			}

			if (value !== this.state.value) {
				this.setInputValue(value);
				this.setState({
					value: this.haveValue ? this.state.value : value
				});
				preventDefault = true;
				if (typeof this.props.onChange === "function") {
					this.props.onChange(event);
				}
			}
			if (preventDefault) {
				event.preventDefault();
				this.setCaretPos(caretPos);
			}
		}
	}, {
		key: 'onKeyPress',
		value: function onKeyPress(event) {
			var key = event.key;
			var hasHandler = typeof this.props.onKeyPress === "function";
			if (key === "Enter" || event.ctrlKey || event.metaKey) {
				if (hasHandler) {
					this.props.onKeyPress(event);
				}
				return;
			}

			if (this.isWindowsPhoneBrowser) {
				return;
			}

			var caretPos = this.getCaretPos();
			var selection = this.getSelection();
			var value = this.state.value;
			var mask = this.mask;
			var maskChar = this.maskChar;
			var lastEditablePos = this.lastEditablePos;

			var maskLen = mask.length;
			var prefixLen = this.getPrefix().length;

			if (this.isPermanentChar(caretPos) && mask[caretPos] === key) {
				value = this.insertRawSubstr(value, key, caretPos);
				++caretPos;
			} else {
				var editablePos = this.getRightEditablePos(caretPos);
				if (editablePos !== null && this.isAllowedChar(key, editablePos)) {
					value = this.clearRange(value, selection.start, selection.length);
					value = this.insertRawSubstr(value, key, editablePos);
					caretPos = editablePos + 1;
				}
			}

			if (value !== this.state.value) {
				this.setInputValue(value);
				this.setState({
					value: this.haveValue ? this.state.value : value
				});
				if (typeof this.props.onChange === "function") {
					this.props.onChange(event);
				}
			}
			event.preventDefault();
			if (caretPos < lastEditablePos && caretPos > prefixLen) {
				caretPos = this.getRightEditablePos(caretPos);
			}
			this.setCaretPos(caretPos);

			var defaultValue = this.props.defaultValue;

			this.hasValue({ defaultValue: defaultValue, value: event.target.value });
		}
	}, {
		key: 'onChange',
		value: function onChange(event) {
			var _this7 = this;

			var defaultValue = this.props.defaultValue;

			this.hasValue({ defaultValue: defaultValue, value: event.target.value });

			var pasteSelection = this.pasteSelection;
			var mask = this.mask;
			var maskChar = this.maskChar;
			var lastEditablePos = this.lastEditablePos;
			var preventEmptyChange = this.preventEmptyChange;

			var target = event.target;
			var value = this.getInputValue();
			if (!value && this.preventEmptyChange) {
				this.disableValueAccessors();
				this.preventEmptyChange = false;
				this.setInputValue(this.state.value);
				return;
			}
			var oldValue = this.state.value;
			if (pasteSelection) {
				this.pasteSelection = null;
				this.pasteText(oldValue, value, pasteSelection, event);
				return;
			}
			var selection = this.getSelection();
			var caretPos = selection.end;
			var maskLen = mask.length;
			var valueLen = value.length;
			var oldValueLen = oldValue.length;
			var prefixLen = this.getPrefix().length;
			var clearedValue = void 0;

			if (valueLen > oldValueLen) {
				var substrLen = valueLen - oldValueLen;
				var startPos = selection.end - substrLen;
				var enteredSubstr = value.substr(startPos, substrLen);

				if (startPos < lastEditablePos && (substrLen !== 1 || enteredSubstr !== mask[startPos])) {
					caretPos = this.getRightEditablePos(startPos);
				} else {
					caretPos = startPos;
				}

				value = value.substr(0, startPos) + value.substr(startPos + substrLen);

				clearedValue = this.clearRange(value, startPos, maskLen - startPos);
				clearedValue = this.insertRawSubstr(clearedValue, enteredSubstr, caretPos);

				value = this.insertRawSubstr(oldValue, enteredSubstr, caretPos);

				if (substrLen !== 1 || caretPos >= prefixLen && caretPos < lastEditablePos) {
					caretPos = this.getFilledLength(clearedValue);
				} else if (caretPos < lastEditablePos) {
					caretPos++;
				}
			} else if (valueLen < oldValueLen) {
				var removedLen = maskLen - valueLen;
				clearedValue = this.clearRange(oldValue, selection.end, removedLen);
				var substr = value.substr(0, selection.end);
				var clearOnly = substr === oldValue.substr(0, selection.end);

				if (maskChar) {
					value = this.insertRawSubstr(clearedValue, substr, 0);
				}

				clearedValue = this.clearRange(clearedValue, selection.end, maskLen - selection.end);
				clearedValue = this.insertRawSubstr(clearedValue, substr, 0);

				if (!clearOnly) {
					caretPos = this.getFilledLength(clearedValue);
				} else if (caretPos < prefixLen) {
					caretPos = prefixLen;
				}
			}
			value = this.formatValue(value);

			// prevent android autocomplete insertion on backspace
			// prevent hanging after first entered character on Windows 10 Mobile
			if (!this.canUseAccessors || !this.isAndroidBrowser && !this.isWindowsPhoneBrowser) {
				this.setInputValue(value);
			}

			if (this.canUseAccessors && (this.isAndroidFirefox && value && !this.getInputValue() || this.isAndroidBrowser || this.isWindowsPhoneBrowser)) {
				this.value = value;
				this.enableValueAccessors();
				if (this.isAndroidFirefox) {
					this.preventEmptyChange = true;
				}
				setTimeout(function () {
					_this7.preventEmptyChange = false;
					_this7.disableValueAccessors();
				}, 0);
			}

			this.setState({
				value: this.haveValue ? this.state.value : value
			});

			if (typeof this.props.onChange === "function") {
				this.props.onChange(event);
			}

			this.setCaretPos(caretPos);
		}
	}, {
		key: 'onFocus',
		value: function onFocus(event) {
			this.setState({ isFocused: true });
			if (!this.state.value) {
				var prefix = this.getPrefix();
				var value = this.formatValue(prefix);
				var inputValue = this.formatValue(value);

				// do not use this.getInputValue and this.setInputValue as this.refs.input
				// can be undefined at this moment if autoFocus attribute is set
				var isInputValueChanged = inputValue !== event.target.value;

				if (isInputValueChanged) {
					event.target.value = inputValue;
				}

				this.setState({
					value: this.haveValue ? this.state.value : inputValue
				}, this.setCaretToEnd);

				if (isInputValueChanged && typeof this.props.onChange === "function") {
					this.props.onChange(event);
				}
			} else if (this.getFilledLength() < this.mask.length) {
				this.setCaretToEnd();
			}

			if (typeof this.props.onFocus === "function") {
				this.props.onFocus(event);
			}
		}
	}, {
		key: 'onBlur',
		value: function onBlur(event) {
			this.setState({ isFocused: false });
			if (!this.props.alwaysShowMask && this.isEmpty(this.state.value)) {
				var inputValue = "";
				var isInputValueChanged = inputValue !== this.getInputValue();
				if (isInputValueChanged) {
					this.setInputValue(inputValue);
				}
				this.setState({
					value: this.haveValue ? this.state.value : ""
				});
				if (isInputValueChanged && typeof this.props.onChange === "function") {
					this.props.onChange(event);
				}
			}

			if (typeof this.props.onBlur === "function") {
				this.props.onBlur(event);
			}

			var value = event.target.value;
			var _props2 = this.props;
			var defaultValue = _props2.defaultValue;
			var type = _props2.type;

			if (type === 'number') {
				value = parseFloat(value).toFixed(2);
			}

			this.hasValue({ defaultValue: defaultValue, value: value });
		}
	}, {
		key: 'onPaste',
		value: function onPaste(event) {
			if (this.isAndroidBrowser) {
				this.pasteSelection = this.getSelection();
				this.setInputValue("");
				return;
			}
			var text = void 0;
			if (window.clipboardData && window.clipboardData.getData) {
				// IE
				text = window.clipboardData.getData("Text");
			} else if (event.clipboardData && event.clipboardData.getData) {
				text = event.clipboardData.getData("text/plain");
			}
			if (text) {
				var value = this.state.value;
				var selection = this.getSelection();
				this.pasteText(value, text, selection, event);
			}
			event.preventDefault();
		}
	}, {
		key: 'pasteText',
		value: function pasteText(value, text, selection, event) {
			var caretPos = selection.start;
			if (selection.length) {
				value = this.clearRange(value, caretPos, selection.length);
			}
			var textLen = this.getRawSubstrLength(value, text, caretPos);
			value = this.insertRawSubstr(value, text, caretPos);
			caretPos += textLen;
			caretPos = this.getRightEditablePos(caretPos) || caretPos;
			if (value !== this.getInputValue()) {
				if (event) {
					this.setInputValue(value);
				}
				this.setState({
					value: this.haveValue ? this.state.value : value
				});
				if (event && typeof this.props.onChange === "function") {
					this.props.onChange(event);
				}
			}
			this.setCaretPos(caretPos);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.isAndroidBrowser = Field.isAndroidBrowser();
			this.isWindowsPhoneBrowser = Field.isWindowsPhoneBrowser();
			this.isAndroidFirefox = Field.isAndroidFirefox();

			if (_getOwnPropertyDescriptor2.default && _getPrototypeOf2.default && _defineProperty2.default) {
				var input = this.getInputDOMNode();
				var valueDescriptor = (0, _getOwnPropertyDescriptor2.default)((0, _getPrototypeOf2.default)(input), 'value');
				this.canUseAccessors = !!(valueDescriptor && valueDescriptor.get && valueDescriptor.set);
			}

			if (this.mask && this.props.value == null) {
				this.updateUncontrolledInput();
			}
		}
	}], [{
		key: 'isAndroidBrowser',
		value: function isAndroidBrowser() {
			var windows = new RegExp("windows", "i");
			var firefox = new RegExp("firefox", "i");
			var android = new RegExp("android", "i");
			var ua = navigator.userAgent;
			return !windows.test(ua) && !firefox.test(ua) && android.test(ua);
		}
	}, {
		key: 'isWindowsPhoneBrowser',
		value: function isWindowsPhoneBrowser() {
			var windows = new RegExp("windows", "i");
			var phone = new RegExp("phone", "i");
			var ua = navigator.userAgent;
			return windows.test(ua) && phone.test(ua);
		}
	}, {
		key: 'isAndroidFirefox',
		value: function isAndroidFirefox() {
			var windows = new RegExp("windows", "i");
			var firefox = new RegExp("firefox", "i");
			var android = new RegExp("android", "i");
			var ua = navigator.userAgent;
			return !windows.test(ua) && firefox.test(ua) && android.test(ua);
		}
	}, {
		key: 'isDOMElement',
		value: function isDOMElement(element) {
			return (typeof HTMLElement === 'undefined' ? 'undefined' : (0, _typeof3.default)(HTMLElement)) === "object" ? element instanceof HTMLElement // DOM2
			: element.nodeType === 1 && typeof element.nodeName === "string";
		}
	}]);

	function Field(props) {
		(0, _classCallCheck3.default)(this, Field);

		var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Field).call(this, props));

		_this.defaultCharsRules = {
			"9": "[0-9]",
			"a": "[A-Za-z]",
			"А": "[A-ZА-Яa-zа-я]",
			"*": "[A-Za-z0-9]"
		};
		_this.defaultMaskChar = "_";
		_this.lastCaretPos = null;


		_this.haveValue = _this.props.value != null;
		_this.charsRules = "formatChars" in _this.props ? _this.props.formatChars : _this.defaultCharsRules;

		var mask = _this.parseMask(_this.props.mask);
		var defaultValue = _this.props.defaultValue != null ? _this.props.defaultValue : '';
		var value = _this.props.value != null ? _this.props.value : defaultValue;

		value = _this.getStringValue(value);

		_this.mask = mask.mask;
		_this.permanents = mask.permanents;
		_this.lastEditablePos = mask.lastEditablePos;
		_this.maskChar = "maskChar" in _this.props ? _this.props.maskChar : _this.defaultMaskChar;

		if (_this.mask && (_this.props.alwaysShowMask || value)) {
			value = _this.formatValue(value);
		}

		_this.state = {
			hasValue: false,
			isFocused: false,
			value: value
		};
		return _this;
	}

	/*componentWillReceiveProps(props) {
 	if ( props.hasOwnProperty('value') ) {
 		this.hasValue(props);
 	}
 	const { required, disabled } = this.props;
 	required !== props.required && this.setState({required: props.required});
 	disabled !== props.disabled && this.setState({disabled: props.disabled});
 }*/

	/**
  * Check isValid oneOf([value, defaultValue])
  * @param props
  * value = value || defaultValue
  * setState({value});
  */


	(0, _createClass3.default)(Field, [{
		key: 'hasValue',
		value: function hasValue(props) {
			var value = props.value;
			var defaultValue = props.defaultValue;

			var hasValue = Field.isValidValue(value) ? value : Field.isValidValue(defaultValue) ? defaultValue : '';

			this.setState({
				value: hasValue,
				hasValue: !!(typeof hasValue === 'number' ? (0, _stringify2.default)(hasValue) : hasValue)
			});
			return hasValue;
		}

		/**
   * Check if a value is valid to be displayed inside an input.
   *
   * @param value
   * @returns boolean if the string provided is valid, false otherwise.
   */

	}, {
		key: 'render',
		value: function render() {
			var _this8 = this;

			var _props3 = this.props;
			var defaultValue = _props3.defaultValue;
			var floating = _props3.floating;
			var placeholder = _props3.placeholder;
			var autoComplete = _props3.autoComplete;
			var type = _props3.type;
			var min = _props3.min;
			var max = _props3.max;
			var _onChange = _props3.onChange;
			var _onFocus = _props3.onFocus;
			var _onBlur = _props3.onBlur;
			var name = _props3.name;
			var required = _props3.required;
			var readOnly = _props3.readOnly;
			var disabled = _props3.disabled;
			var large = _props3.large;
			var small = _props3.small;
			var block = _props3.block;
			var success = _props3.success;
			var warning = _props3.warning;
			var danger = _props3.danger;
			var className = _props3.className;
			var other = (0, _objectWithoutProperties3.default)(_props3, ['defaultValue', 'floating', 'placeholder', 'autoComplete', 'type', 'min', 'max', 'onChange', 'onFocus', 'onBlur', 'name', 'required', 'readOnly', 'disabled', 'large', 'small', 'block', 'success', 'warning', 'danger', 'className']);


			var valid = success || warning || danger;

			var icon = null;
			var _state = this.state;
			var value = _state.value;
			var hasValue = _state.hasValue;
			var isFocused = _state.isFocused;


			var inputProps = (0, _extends3.default)({}, other, { defaultValue: defaultValue,
				onChange: function onChange(e) {
					var value = e.target.value;

					_this8.hasValue({ defaultValue: defaultValue, value: value });
					_onChange && _onChange(e);
				},
				onFocus: function onFocus(e) {
					_this8.setState({ isFocused: true }, _this8.setCaretToEnd.bind(_this8));
					_onFocus && _onFocus(e);
				},
				onBlur: function onBlur(e) {
					_onBlur && _onBlur(e);
					_this8.setState({ isFocused: false });
					var value = e.target.value;
					/*if (type === 'number') {
     	value = !!(value) ? parseFloat(value).toFixed(2) : value;
     	console.log(value)
     }*/

					_this8.hasValue({ defaultValue: defaultValue, value: value });
				},
				name: name, readOnly: readOnly, autoComplete: autoComplete,
				ref: 'entry',
				className: 'field-entry',
				required: required, disabled: disabled, //value,
				min: min, max: max
			});

			switch (true) {
				case type === 'number':
				/*inputProps.onKeyDown = (e)=>{
    	console.log(e.keyCode)
    	// Allow: backspace, delete, tab, escape, enter and . and ,
    	let ctrlKey = (e.ctrlKey || e.metaKey) === true;
    	if (inArray(e.keyCode, [46, 8, 9, 27, 13, 110/!*, 190*!/, 188]) !== -1 ||
    		// Allow: Ctrl+A
    		(e.keyCode == 65 && ctrlKey) ||
    		// Allow: Ctrl+C
    		(e.keyCode == 67 && ctrlKey) ||
    		// Allow: Ctrl+X
    		(e.keyCode == 88 && ctrlKey) ||
    		// Allow: Ctrl+V
    		(e.keyCode == 86 && ctrlKey) ||
    		// Allow: home, end, left, right
    		(e.keyCode >= 35 && e.keyCode <= 39)) {
    		// let it happen, don't do anything
    		return;
    	}
    	// Ensure that it is a number and stop the keypress
    	if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    		e.preventDefault();
    	}
    }*/
			}

			if (!!max) {
				(function () {
					var maxLength = parseInt(max);
					inputProps.onInput = function (e) {
						var value = e.target.value;

						if (value.toString().length > maxLength) {
							value = value.slice(0, maxLength);
							e.target.value = value;
							_this8.hasValue({
								defaultValue: defaultValue, value: value
							});
							e.preventDefault();
						}
					};
				})();
			}

			/*inputProps.onChange = (e)=>{
   	this.setState({
   		value: e.target.value
   	})
   };*/

			var _props4 = this.props;
			var mask = _props4.mask;
			var alwaysShowMask = _props4.alwaysShowMask;
			var maskChar = _props4.maskChar;
			var formatChars = _props4.formatChars;
			var props = (0, _objectWithoutProperties3.default)(_props4, ['mask', 'alwaysShowMask', 'maskChar', 'formatChars']);

			if (this.mask) {
				var handlersKeys = ["onFocus", "onBlur", "onChange", "onKeyDown", "onKeyPress", "onPaste"];
				handlersKeys.forEach(function (key) {
					inputProps[key] = _this8[key].bind(_this8);
				});

				if (props.value != null) {
					inputProps.value = this.state.value;
				}
			}

			return _react2.default.createElement(
				'label',
				{ className: (0, _helpers.classNames)('field', {
						floating: floating,
						isFocused: isFocused && !readOnly && !disabled,
						hasValue: hasValue,
						fieldBlock: block,
						fieldLg: large,
						fieldMd: !(large || small),
						fieldSm: small,
						success: success !== false,
						warning: warning !== false,
						danger: danger !== false,
						hidden: type === 'hidden',
						required: required, disabled: disabled
					}, className) },
				_react2.default.createElement(
					'div',
					{ className: 'field-control' },
					type !== 'textarea' ? _react2.default.createElement('input', (0, _extends3.default)({ type: type }, inputProps)) : _react2.default.createElement('textarea', inputProps),
					placeholder && _react2.default.createElement(
						'span',
						{ className: 'field-label',
							onClick: function onClick() {
								return _this8.refs.entry.getDOMNode().focus();
							}
						},
						placeholder,
						' ',
						required && _react2.default.createElement(
							'sup',
							null,
							'*'
						)
					),
					_react2.default.createElement('hr', { className: 'field-border field-border-focus' }),
					_react2.default.createElement('hr', { className: 'field-border' })
				),
				typeof valid === 'string' && (0, _react.createElement)('span', {
					className: 'field-valid'
				}, [icon, _react2.default.createElement(
					'span',
					{ key: 'message' },
					valid
				)])
			);
		}
	}], [{
		key: 'isValidValue',
		value: function isValidValue(value) {
			return value !== '' && value !== undefined && value !== null;
		}
	}]);
	return Field;
}(_react.Component);

Field.propTypes = {
	floating: _react.PropTypes.bool,

	placeholder: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool]),
	autoComplete: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool]),
	value: _react.PropTypes.any,
	defaultValue: _react.PropTypes.any,
	type: _react.PropTypes.string,
	min: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	max: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	name: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool]),

	large: _react.PropTypes.bool,
	small: _react.PropTypes.bool,

	block: _react.PropTypes.bool,

	required: _react.PropTypes.bool,
	readOnly: _react.PropTypes.bool,
	disabled: _react.PropTypes.bool,

	success: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool]),
	warning: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool]),
	danger: _react2.default.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool])
};
Field.defaultProps = {
	mask: '',
	floating: true,

	placeholder: false,
	autoComplete: false,
	// value: '',
	// defaultValue: '',
	type: 'text',
	//name: false,

	large: false,
	small: false,

	block: false,

	required: false,
	readOnly: false,
	disabled: false,

	success: false,
	warning: false,
	danger: false
};
exports.default = Field;