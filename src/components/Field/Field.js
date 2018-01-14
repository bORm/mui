import React, {Component, createElement, cloneElement} from 'react'
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom'
import { classNames, inArray } from 'helpers'

class Field extends Component {

	defaultCharsRules = {
		"9": "[0-9]",
		"a": "[A-Za-z]",
		"А": "[A-ZА-Яa-zа-я]",
		"*": "[A-Za-z0-9]"
	};
	defaultMaskChar = "_";
	lastCaretPos = null;

	static isAndroidBrowser() {
		let windows = new RegExp("windows", "i");
		let firefox = new RegExp("firefox", "i");
		let android = new RegExp("android", "i");
		let ua = navigator.userAgent;
		return !windows.test(ua)
			&&
			!firefox.test(ua)
			&&
			android.test(ua);
	}
	static isWindowsPhoneBrowser() {
		let windows = new RegExp("windows", "i");
		let phone = new RegExp("phone", "i");
		let ua = navigator.userAgent;
		return windows.test(ua) && phone.test(ua);
	}
	static isAndroidFirefox() {
		let windows = new RegExp("windows", "i");
		let firefox = new RegExp("firefox", "i");
		let android = new RegExp("android", "i");
		let ua = navigator.userAgent;
		return !windows.test(ua)
			&&
			firefox.test(ua)
			&&
			android.test(ua);
	}

	static isDOMElement(element) {
		return typeof HTMLElement === "object"
			? element instanceof HTMLElement // DOM2
			: element.nodeType === 1 && typeof element.nodeName === "string";
	}

	getInputDOMNode(){
		let input = this.refs['entry'];

		if (!input) {
			return null;
		}

		// React 0.14
		if (Field.isDOMElement(input)) {
			return input;
		}

		return findDOMNode(input);
	}

	enableValueAccessors() {
		if (this.canUseAccessors) {
			let input = this.getInputDOMNode();
			this.valueDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'value');
			Object.defineProperty(input, 'value', {
				configurable: true,
				enumerable: true,
				get: () => this.value,
				set: (val) => {
					this.value = val;
					this.valueDescriptor.set.call(input, val);
				}
			});
		}
	}
	disableValueAccessors() {
		let { valueDescriptor } = this;
		if (!valueDescriptor) {
			return;
		}
		this.valueDescriptor = null;
		let input = this.getInputDOMNode();
		Object.defineProperty(input, 'value', valueDescriptor);
	}
	getInputValue() {
		let input = this.getInputDOMNode();
		let { valueDescriptor } = this;

		let value;
		if (valueDescriptor) {
			value = valueDescriptor.get.call(input);
		}
		else {
			value = input.value;
		}

		return value;
	}
	setInputValue(val) {
		let input = this.getInputDOMNode();
		this.value = val;
		input.value = val;
	}
	getPrefix() {
		let prefix = "";
		let { mask } = this;
		for (let i = 0; i < mask.length && this.isPermanentChar(i); ++i) {
			prefix += mask[i];
		}
		return prefix;
	}
	getFilledLength(value = this.state.value) {
		let i;
		let { maskChar } = this;

		if (!maskChar) {
			return value.length;
		}

		for (i = value.length - 1; i >= 0; --i) {
			let character = value[i];
			if (!this.isPermanentChar(i) && this.isAllowedChar(character, i)) {
				break;
			}
		}

		return ++i || this.getPrefix().length;
	}
	getLeftEditablePos(pos) {
		for (let i = pos; i >= 0; --i) {
			if (!this.isPermanentChar(i)) {
				return i;
			}
		}
		return null;
	}
	getRightEditablePos(pos) {
		let { mask } = this;
		for (let i = pos; i < mask.length; ++i) {
			if (!this.isPermanentChar(i)) {
				return i;
			}
		}
		return null;
	}
	isEmpty(value = this.state.value) {
		return !value.split("").some((character, i) =>
			!this.isPermanentChar(i) && this.isAllowedChar(character, i)
		);
	}
	isFilled(value = this.state.value) {
		return this.getFilledLength(value) === this.mask.length;
	}
	createFilledArray(length, val) {
		let array = [];
		for (let i = 0; i < length; i++) {
			array[i] = val;
		}
		return array;
	}
	formatValue(value) {
		let { maskChar, mask } = this;
		if (!maskChar) {
			let prefix = this.getPrefix();
			let prefixLen = prefix.length;
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
			let emptyValue = this.formatValue("");
			return this.insertRawSubstr(emptyValue, value, 0);
		}
		return value.split("")
		.concat(this.createFilledArray(mask.length - value.length, null))
		.map((character, pos) => {
			if (this.isAllowedChar(character, pos)) {
				return character;
			}
			else if (this.isPermanentChar(pos)) {
				return mask[pos];
			}
			return maskChar;
		})
		.join("");
	}
	clearRange(value, start, len) {
		let end = start + len;
		let { maskChar, mask } = this;
		if (!maskChar) {
			let prefixLen = this.getPrefix().length;
			value = value.split("")
			.filter((character, i) => i < prefixLen || i < start || i >= end)
			.join("");
			return this.formatValue(value);
		}
		return value.split("")
		.map((character, i) => {
			if (i < start || i >= end) {
				return character;
			}
			if (this.isPermanentChar(i)) {
				return mask[i];
			}
			return maskChar;
		})
		.join("");
	}
	replaceSubstr(value, newSubstr, pos) {
		return value.slice(0, pos) + newSubstr + value.slice(pos + newSubstr.length);
	}
	insertRawSubstr(value, substr, pos) {
		let { mask, maskChar } = this;
		let isFilled = this.isFilled(value);
		let prefixLen = this.getPrefix().length;
		substr = substr.split("");

		if (!maskChar && pos > value.length) {
			value += mask.slice(value.length, pos);
		}

		for (let i = pos; i < mask.length && substr.length; ) {
			let isPermanent = this.isPermanentChar(i);
			if (!isPermanent || mask[i] === substr[0]) {
				let character = substr.shift();
				if (this.isAllowedChar(character, i, true)) {
					if (i < value.length) {
						if (maskChar || isFilled || i < prefixLen) {
							value = this.replaceSubstr(value, character, i);
						}
						else {
							value = this.formatValue(value.substr(0, i) + character + value.substr(i));
						}
					}
					else if (!maskChar) {
						value += character;
					}
					++i;
				}
			}
			else {
				if (!maskChar && i >= value.length) {
					value += mask[i];
				}
				else if (maskChar && isPermanent && substr[0] === maskChar) {
					substr.shift();
				}
				++i;
			}
		}
		return value;
	}
	getRawSubstrLength(value, substr, pos) {
		let { mask, maskChar } = this;
		substr = substr.split("");
		let i = pos;
		for (; i < mask.length && substr.length; ) {
			if (!this.isPermanentChar(i) || mask[i] === substr[0]) {
				let character = substr.shift();
				if (this.isAllowedChar(character, i, true)) {
					++i;
				}
			}
			else {
				++i;
			}
		}
		return i - pos;
	}
	isAllowedChar(character, pos, allowMaskChar = false) {
		let { mask, maskChar } = this;
		if (this.isPermanentChar(pos)) {
			return mask[pos] === character;
		}
		let ruleChar = mask[pos];
		let charRule = this.charsRules[ruleChar];
		return (new RegExp(charRule)).test(character || "") || (allowMaskChar && character === maskChar);
	}
	isPermanentChar(pos) {
		return this.permanents.indexOf(pos) !== -1;
	}
	setCaretToEnd() {
		if ( !!(this.mask) ) {
			let filledLen = this.getFilledLength();
			let pos = this.getRightEditablePos(filledLen);
			if (pos !== null) {
				this.setCaretPos(pos);
			}
		}
	}
	setSelection(start, len = 0) {
		let input = this.getInputDOMNode();
		if (!input) {
			return;
		}

		let end = start + len;
		if ("selectionStart" in input && "selectionEnd" in input) {
			input.selectionStart = start;
			input.selectionEnd = end;
		}
		else {
			let range = input.createTextRange();
			range.collapse(true);
			range.moveStart("character", start);
			range.moveEnd("character", end - start);
			range.select();
		}
	}
	getSelection() {
		let input = this.getInputDOMNode();
		let start = 0;
		let end = 0;

		if ("selectionStart" in input && "selectionEnd" in input) {
			start = input.selectionStart;
			end = input.selectionEnd;
		}
		else {
			let range = document.selection.createRange();
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
	getCaretPos() {
		return this.getSelection().start;
	}
	setCaretPos(pos) {
		let raf = window.requestAnimationFrame
			||
			window.webkitRequestAnimationFrame
			||
			window.mozRequestAnimationFrame
			||
			((fn) => setTimeout(fn, 0));

		let setPos = this.setSelection.bind(this, pos, 0);

		setPos();
		raf(setPos);

		this.lastCaretPos = pos;
	}
	isFocused() {
		return document.activeElement === this.getInputDOMNode();
	}
	parseMask(mask) {
		if (!mask || typeof mask !== "string") {
			return {
				mask: null,
				lastEditablePos: null,
				permanents: []
			};
		}
		let str = "";
		let permanents = [];
		let isPermanent = false;
		let lastEditablePos = null;

		mask.split("").forEach((character) => {
			if (!isPermanent && character === "\\") {
				isPermanent = true;
			}
			else {
				if (isPermanent || !this.charsRules[character]) {
					permanents.push(str.length);
				}
				else {
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
	getStringValue(value) {
		return !value && value !== 0 ? "" : value + "";
	}
	componentWillMount() {
		this.hasValue(this.props);
		let { mask } = this;
		let { value } = this.state;
		if (mask && value) {
			this.setState({ value });
		}
	}
	componentWillReceiveProps(nextProps) {

		if ( nextProps.hasOwnProperty('value') ) {
			this.hasValue(nextProps);
		}
		const { required, disabled } = this.props;
		required !== nextProps.required && this.setState({required: nextProps.required});
		disabled !== nextProps.disabled && this.setState({disabled: nextProps.disabled});

		this.haveValue = this.props.value != null;
		this.charsRules = "formatChars" in nextProps ? nextProps.formatChars : this.defaultCharsRules;

		let oldMask = this.mask;
		let mask = this.parseMask(nextProps.mask);
		let isMaskChanged = mask.mask && mask.mask !== this.mask;

		this.mask = mask.mask;
		this.permanents = mask.permanents;
		this.lastEditablePos = mask.lastEditablePos;
		this.maskChar = "maskChar" in nextProps ? nextProps.maskChar : this.defaultMaskChar;

		if (!this.mask) {
			return;
		}

		let newValue = nextProps.value != null
			? this.getStringValue(nextProps.value)
			: this.state.value;

		if (!oldMask && nextProps.value == null) {
			newValue = this.getInputDOMNode().value;
		}

		let showEmpty = nextProps.alwaysShowMask || this.isFocused();
		if (isMaskChanged || (mask.mask && (newValue || (showEmpty && !this.haveValue)))) {
			newValue = this.formatValue(newValue);

			if (isMaskChanged) {
				let pos = this.lastCaretPos;
				let filledLen = this.getFilledLength(newValue);
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
	componentDidUpdate(prevProps, prevState) {
		if ((this.mask || prevProps.mask) && this.props.value == null) {
			this.updateUncontrolledInput();
		}
		if (this.valueDescriptor && this.getInputValue() !== this.state.value) {
			this.setInputValue(this.state.value);
		}
	}
	updateUncontrolledInput() {
		if (this.getInputValue() !== this.state.value) {
			this.setInputValue(this.state.value);
		}
	}
	onKeyDown(event) {
		let hasHandler = typeof this.props.onKeyDown === "function";
		if (event.ctrlKey || event.metaKey) {
			if (hasHandler) {
				this.props.onKeyDown(event);
			}
			return;
		}

		let caretPos = this.getCaretPos();
		let value = this.state.value;
		let key = event.key;
		let preventDefault = false;
		switch (key) {
			case "Backspace":
			case "Delete":
				let prefixLen = this.getPrefix().length;
				let deleteFromRight = key === "Delete";
				let selectionRange = this.getSelection();
				if (selectionRange.length) {
					value = this.clearRange(value, selectionRange.start, selectionRange.length);
				}
				else if (caretPos < prefixLen || (!deleteFromRight && caretPos === prefixLen)) {
					caretPos = prefixLen;
				}
				else {
					let editablePos = deleteFromRight ? this.getRightEditablePos(caretPos) : this.getLeftEditablePos(caretPos - 1);
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
	onKeyPress(event) {
		let key = event.key;
		let hasHandler = typeof this.props.onKeyPress === "function";
		if (key === "Enter" || event.ctrlKey || event.metaKey) {
			if (hasHandler) {
				this.props.onKeyPress(event);
			}
			return;
		}

		if (this.isWindowsPhoneBrowser) {
			return;
		}

		let caretPos = this.getCaretPos();
		let selection = this.getSelection();
		let { value } = this.state;
		let { mask, maskChar, lastEditablePos } = this;
		let maskLen = mask.length;
		let prefixLen = this.getPrefix().length;

		if (this.isPermanentChar(caretPos) && mask[caretPos] === key) {
			value = this.insertRawSubstr(value, key, caretPos);
			++caretPos;
		}
		else {
			let editablePos = this.getRightEditablePos(caretPos);
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

		const {defaultValue} = this.props;
		this.hasValue({defaultValue, value: event.target.value});
	}
	onChange(event) {
		const {defaultValue} = this.props;
		this.hasValue({defaultValue, value: event.target.value});

		let { pasteSelection, mask, maskChar, lastEditablePos, preventEmptyChange } = this;
		let target = event.target;
		let value = this.getInputValue();
		if (!value && this.preventEmptyChange) {
			this.disableValueAccessors();
			this.preventEmptyChange = false;
			this.setInputValue(this.state.value);
			return;
		}
		let oldValue = this.state.value;
		if (pasteSelection) {
			this.pasteSelection = null;
			this.pasteText(oldValue, value, pasteSelection, event);
			return;
		}
		let selection = this.getSelection();
		let caretPos = selection.end;
		let maskLen = mask.length;
		let valueLen = value.length;
		let oldValueLen = oldValue.length;
		let prefixLen = this.getPrefix().length;
		let clearedValue;

		if (valueLen > oldValueLen) {
			let substrLen = valueLen - oldValueLen;
			let startPos = selection.end - substrLen;
			let enteredSubstr = value.substr(startPos, substrLen);

			if (startPos < lastEditablePos && (substrLen !== 1 || enteredSubstr !== mask[startPos])) {
				caretPos = this.getRightEditablePos(startPos);
			}
			else {
				caretPos = startPos;
			}

			value = value.substr(0, startPos) + value.substr(startPos + substrLen);

			clearedValue = this.clearRange(value, startPos, maskLen - startPos);
			clearedValue = this.insertRawSubstr(clearedValue, enteredSubstr, caretPos);

			value = this.insertRawSubstr(oldValue, enteredSubstr, caretPos);

			if (substrLen !== 1 || (caretPos >= prefixLen && caretPos < lastEditablePos)) {
				caretPos = this.getFilledLength(clearedValue);
			}
			else if (caretPos < lastEditablePos) {
				caretPos++;
			}
		}
		else if (valueLen < oldValueLen) {
			let removedLen = maskLen - valueLen;
			clearedValue = this.clearRange(oldValue, selection.end, removedLen);
			let substr = value.substr(0, selection.end);
			let clearOnly = substr === oldValue.substr(0, selection.end);

			if (maskChar) {
				value = this.insertRawSubstr(clearedValue, substr, 0);
			}

			clearedValue = this.clearRange(clearedValue, selection.end, maskLen - selection.end);
			clearedValue = this.insertRawSubstr(clearedValue, substr, 0);

			if (!clearOnly) {
				caretPos = this.getFilledLength(clearedValue);
			}
			else if (caretPos < prefixLen) {
				caretPos = prefixLen;
			}
		}
		value = this.formatValue(value);

		// prevent android autocomplete insertion on backspace
		// prevent hanging after first entered character on Windows 10 Mobile
		if (!this.canUseAccessors || (!this.isAndroidBrowser && !this.isWindowsPhoneBrowser)) {
			this.setInputValue(value);
		}

		if (this.canUseAccessors && ((this.isAndroidFirefox && value && !this.getInputValue()) || this.isAndroidBrowser || this.isWindowsPhoneBrowser)) {
			this.value = value;
			this.enableValueAccessors();
			if (this.isAndroidFirefox) {
				this.preventEmptyChange = true;
			}
			setTimeout(() => {
				this.preventEmptyChange = false;
				this.disableValueAccessors();
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
	onFocus(event) {
		this.setState({isFocused: true});
		if (!this.state.value) {
			let prefix = this.getPrefix();
			let value = this.formatValue(prefix);
			let inputValue = this.formatValue(value);

			// do not use this.getInputValue and this.setInputValue as this.refs.input
			// can be undefined at this moment if autoFocus attribute is set
			let isInputValueChanged = inputValue !== event.target.value;

			if (isInputValueChanged) {
				event.target.value = inputValue;
			}

			this.setState({
				value: this.haveValue ? this.state.value : inputValue
			}, this.setCaretToEnd);

			if (isInputValueChanged && typeof this.props.onChange === "function") {
				this.props.onChange(event);
			}
		}
		else if (this.getFilledLength() < this.mask.length) {
			this.setCaretToEnd();
		}

		if (typeof this.props.onFocus === "function") {
			this.props.onFocus(event);
		}
	}
	onBlur(event) {
		this.setState({isFocused: false});
		if (!this.props.alwaysShowMask && this.isEmpty(this.state.value)) {
			let inputValue = "";
			let isInputValueChanged = inputValue !== this.getInputValue();
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

		let { value } = event.target;
		const {defaultValue, type} = this.props;
		if (type === 'number') {
			value = parseFloat(value).toFixed(2);
		}

		this.hasValue({defaultValue, value});
	}
	onPaste(event) {
		if (this.isAndroidBrowser) {
			this.pasteSelection = this.getSelection();
			this.setInputValue("");
			return;
		}
		let text;
		if (window.clipboardData && window.clipboardData.getData) { // IE
			text = window.clipboardData.getData("Text");
		}
		else if (event.clipboardData && event.clipboardData.getData) {
			text = event.clipboardData.getData("text/plain");
		}
		if (text) {
			let value = this.state.value;
			let selection = this.getSelection();
			this.pasteText(value, text, selection, event);
		}
		event.preventDefault();
	}
	pasteText(value, text, selection, event) {
		let caretPos = selection.start;
		if (selection.length) {
			value = this.clearRange(value, caretPos, selection.length);
		}
		let textLen = this.getRawSubstrLength(value, text, caretPos);
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
	componentDidMount() {
		this.isAndroidBrowser = Field.isAndroidBrowser();
		this.isWindowsPhoneBrowser = Field.isWindowsPhoneBrowser();
		this.isAndroidFirefox = Field.isAndroidFirefox();

		if (Object.getOwnPropertyDescriptor && Object.getPrototypeOf && Object.defineProperty) {
			let input = this.getInputDOMNode();
			let valueDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'value');
			this.canUseAccessors = !!(valueDescriptor && valueDescriptor.get && valueDescriptor.set);
		}

		if (this.mask && this.props.value == null) {
			this.updateUncontrolledInput();
		}
	}

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
		min: PropTypes.oneOfType([
			PropTypes.string, PropTypes.number
		]),
		max: PropTypes.oneOfType([
			PropTypes.string, PropTypes.number
		]),
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
		danger: PropTypes.oneOfType([
			PropTypes.string, PropTypes.bool
		])
	};

	static defaultProps = {
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

	constructor(props){
		super(props);

		this.haveValue = this.props.value != null;
		this.charsRules = "formatChars" in this.props ? this.props.formatChars : this.defaultCharsRules;

		let mask = this.parseMask(this.props.mask);
		let defaultValue = this.props.defaultValue != null
			? this.props.defaultValue
			: '';
		let value = this.props.value != null
			? this.props.value
			: defaultValue;

		value = this.getStringValue(value);

		this.mask = mask.mask;
		this.permanents = mask.permanents;
		this.lastEditablePos = mask.lastEditablePos;
		this.maskChar = "maskChar" in this.props ? this.props.maskChar : this.defaultMaskChar;

		if (this.mask && (this.props.alwaysShowMask || value)) {
			value = this.formatValue(value);
		}

		this.state = {
			hasValue: false,
			isFocused: false,
			value
		};
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
	hasValue(props){
		const {value, defaultValue} = props;
		const hasValue = Field.isValidValue(value)
			? value
			: Field.isValidValue(defaultValue)
				? defaultValue
				: '';

		this.setState({
			value: hasValue,
			hasValue: !!(typeof hasValue === 'number' ? JSON.stringify(hasValue) : hasValue)
		});
		return hasValue;
	}

	/**
	 * Check if a value is valid to be displayed inside an input.
	 *
	 * @param value
	 * @returns boolean if the string provided is valid, false otherwise.
	 */
	static isValidValue(value){
		return value !== '' && value !== undefined && value !== null;
	}

	render(){
		const {
			/**
			 * defaultValue for disable conflict value && defaultValue
			 * and value can be null
			 * see hasValue function
			 */
			defaultValue,
			floating, placeholder, autoComplete, type, min, max,
			onChange, onFocus, onBlur,
			name, required, readOnly, disabled,
			large, small, block,
			success,	warning,	danger,
			className,
			...other
		} = this.props;

		const valid = success || warning || danger;

		let icon = null;
		const { value, hasValue, isFocused } = this.state;

		const inputProps = {
			...other, defaultValue,
			onChange: e=>{
				const { value } = e.target;
				this.hasValue({defaultValue, value});
				onChange && onChange(e);
			},
			onFocus: e=>{
				this.setState({isFocused: true}, ::this.setCaretToEnd);
				onFocus && onFocus(e);
			},
			onBlur: e=>{
        onBlur && onBlur(e);
				this.setState({isFocused: false});
				let { value } = e.target;
				/*if (type === 'number') {
					value = !!(value) ? parseFloat(value).toFixed(2) : value;
					console.log(value)
				}*/
				this.hasValue({defaultValue, value});
			},
			name, readOnly,
			autoComplete: autoComplete.toString(),
			ref: 'entry',
			className: 'field-entry',
			required, disabled, //value,
			min, max
		};

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

		if ( !!(max) ) {
			const maxLength = parseInt(max);
			inputProps.onInput = (e)=>{
				let { value } = e.target;
				if ( value.toString().length > maxLength ) {
					value = value.slice(0, maxLength);
					e.target.value = value;
					this.hasValue({
						defaultValue, value
					});
					e.preventDefault();
				}
			}
		}

		/*inputProps.onChange = (e)=>{
			this.setState({
				value: e.target.value
			})
		};*/

		let { mask, alwaysShowMask, maskChar, formatChars, ...props } = this.props;
		if (this.mask) {
			let handlersKeys = ["onFocus", "onBlur", "onChange", "onKeyDown", "onKeyPress", "onPaste"];
			handlersKeys.forEach((key) => {
				inputProps[key] = ::this[key];
			});

			if (props.value != null) {
				inputProps.value = this.state.value;
			}
		}

		return (
			<label className={classNames('field', {
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
				required, disabled,
			}, className)}>
				<div className="field-control">
					{(() => {
            switch (type) {
							case 'textarea':
								return <textarea {...inputProps} />;
              case 'select':
                return (
                	<span {...inputProps}>
										{ inputProps.value }
									</span>
								);
							default:
								return <input type={type} {...inputProps} />;
            }
					})()}
					{ placeholder && (
						<span className="field-label"
						      onClick={()=>this.refs.entry.getDOMNode().focus()}
						>{ placeholder } { required && <sup>*</sup> }</span>
					) }
					<hr className="field-border field-border-focus"/>
					<hr className="field-border"/>
				</div>
				{ typeof ( valid ) === 'string' && createElement('span', {
					className: 'field-valid'
				}, [icon, <span key="message">{ valid }</span>] ) }
			</label>
		);
	}
}

export default Field;