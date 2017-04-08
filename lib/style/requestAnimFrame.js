"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

/**
 * Created by borm on 02.08.2016.
 */
exports.default = function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function */callback, /* DOMElement */element) {
		window.setTimeout(callback, 1000 / 60);
	};
}();
//# sourceMappingURL=requestAnimFrame.js.map
