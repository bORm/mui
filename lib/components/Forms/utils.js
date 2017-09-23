'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  arraysDiffer: function arraysDiffer(a, b) {
    var isDifferent = false;
    if (a.length !== b.length) {
      isDifferent = true;
    } else {
      a.forEach(function (item, index) {
        if (!this.isSame(item, b[index])) {
          isDifferent = true;
        }
      }, this);
    }
    return isDifferent;
  },

  objectsDiffer: function objectsDiffer(a, b) {
    var isDifferent = false;
    if ((0, _keys2.default)(a).length !== (0, _keys2.default)(b).length) {
      isDifferent = true;
    } else {
      (0, _keys2.default)(a).forEach(function (key) {
        if (!this.isSame(a[key], b[key])) {
          isDifferent = true;
        }
      }, this);
    }
    return isDifferent;
  },

  isSame: function isSame(a, b) {
    if ((typeof a === 'undefined' ? 'undefined' : (0, _typeof3.default)(a)) !== (typeof b === 'undefined' ? 'undefined' : (0, _typeof3.default)(b))) {
      return false;
    } else if (Array.isArray(a) && Array.isArray(b)) {
      return !this.arraysDiffer(a, b);
    } else if (typeof a === 'function') {
      return a.toString() === b.toString();
    } else if ((typeof a === 'undefined' ? 'undefined' : (0, _typeof3.default)(a)) === 'object' && a !== null && b !== null) {
      return !this.objectsDiffer(a, b);
    }

    return a === b;
  },

  find: function find(collection, fn) {
    for (var i = 0, l = collection.length; i < l; i++) {
      var item = collection[i];
      if (fn(item)) {
        return item;
      }
    }
    return null;
  }
};