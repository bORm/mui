'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (component) {
	// exceptions for flow control :(
	try {
		_reactDom2.default.findDOMNode(component);
		return true;
	} catch (e) {
		// Error: Invariant Violation: Component (with keys: props,context,state,refs,_reactInternalInstance) contains `render` method but is not mounted in the DOM
		return false;
	}
}; /**
    * Created by borm on 29.07.2016.
    */
//# sourceMappingURL=isMounted.js.map
