'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = classNames;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function classNames() {
	var classList = [];

	for (var i = 0; i < arguments.length; i++) {
		var arg = arguments[i];
		if (!arg) continue;
		var type = typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg);
		if (type === 'string') {
			classList.push(arg);
		} else if (type === 'object') {
			for (var className in arg) {
				if (arg.hasOwnProperty(className)) {
					arg[className] == true ? classList.push(className.replace(/[A-Z]/g, '-$&').toLowerCase()) : null;
				}
			}
		}
	}
	return classList.join(' ');
}
//# sourceMappingURL=classNames.js.map
