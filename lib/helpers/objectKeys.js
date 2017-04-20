"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * IE8-safe wrapper for `Object.keys()`.
 *
 * @param {Object} object A JavaScript object.
 * @return {Array} Returns the keys of the object as an array.
 */
function objectKeys(object) {
	if (_keys2.default) {
		return (0, _keys2.default)(object);
	}
	var result = [];

	forEach(object, function (val, key) {
		result.push(key);
	});
	return result;
}

exports.default = objectKeys;