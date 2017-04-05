export default function classNames() {
	let classList = [];

	for ( let i = 0; i<arguments.length; i++ ) {
		let arg = arguments[i];
		if (!arg) continue;
		let type = typeof arg;
		if ( type === 'string' ) {
			classList.push(arg);
		}	else if ( type === 'object' ) {
			for ( let className in arg ) {
				if ( arg.hasOwnProperty(className) ) {
					arg[className] == true ? classList.push(
						className.replace(/[A-Z]/g, '-$&').toLowerCase()
					) : null;
				}
			}
		}
	}
	return classList.join(' ');
}