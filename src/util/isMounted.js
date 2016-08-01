import ReactDOM from 'react-dom';

export default (component) => {
	// exceptions for flow control :(
	try {
		ReactDOM.findDOMNode(component);
		return true;
	} catch (e) {
		// Error: Invariant Violation: Component (with keys: props,context,state,refs,_reactInternalInstance) contains `render` method but is not mounted in the DOM
		return false;
	}
};
