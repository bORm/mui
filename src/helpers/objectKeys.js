/**
 * IE8-safe wrapper for `Object.keys()`.
 *
 * @param {Object} object A JavaScript object.
 * @return {Array} Returns the keys of the object as an array.
 */
function objectKeys(object) {
	if (Object.keys) {
		return Object.keys(object);
	}
	var result = [];

	forEach(object, function(val, key) {
		result.push(key);
	});
	return result;
}

export default objectKeys