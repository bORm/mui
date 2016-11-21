/**
 * Converts a color from CSS hex format to CSS rgb format.
 *
 *  @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 *  @param {string} opacity - Opacity value, i.e. 90 or 80...
 *  @returns {string} A CSS rgb color string
 */
export function convertHexToRGB(color, opacity) {
	if (color.length === 4) {
		let extendedColor = '#';
		for (let i = 1; i < color.length; i++) {
			extendedColor += color.charAt(i) + color.charAt(i);
		}
		color = extendedColor;
	}

	const values = {
		r:	parseInt(color.substr(1, 2), 16),
		g:	parseInt(color.substr(3, 2), 16),
		b:	parseInt(color.substr(5, 2), 16),
	};

	const rgb = `${values.r}, ${values.g}, ${values.b}`;

	return opacity !== undefined ? `rgba(${rgb}, ${opacity/100})` : `rgb(${rgb})`;
}