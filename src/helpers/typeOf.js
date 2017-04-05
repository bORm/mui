// typeOf.isArray([]); // true
// typeOf.isObject({}); // true
// typeOf.isString(''); // true
// typeOf.isDate(new Date()); // true
// typeOf.isRegExp(/test/i); // true
// typeOf.isFunction(function () {}); // true
// typeOf.isBoolean(true); // true
// typeOf.isNumber(1); // true
// typeOf.isNull(null); // true
// typeOf.isUndefined(); // true
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.typeOf = factory();
	}
}(this, function () {

	'use strict';

	var typeOf = {};

	var types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');

	function type() {
		return Object.prototype.toString.call(this).slice(8, -1);
	}

	for (var i = types.length; i--;) {
		typeOf['is' + types[i]] = (function (self) {
			return function (elem) {
				return type.call(elem) === self;
			};
		})(types[i]);
	}

	return typeOf;

}));