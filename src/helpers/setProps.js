export default function setProps() {
	let propsList = [];

	for ( let i = 0; i<arguments.length; i++ ) {
		let arg = arguments[i];
		if (!arg) continue;
		let type = typeof arg;
		if ( type === 'string' ) {
			propsList.push(arg);
		}	else if ( type === 'object' ) {
			for ( let className in arg ) {
				if ( arg.hasOwnProperty(className) ) {
					arg[className] == true ? propsList.push(
						className.replace(/[A-Z]/g, '-$&').toLowerCase()
					) : null;
				}
			}
		}
	}
	return propsList.join(' ');
}