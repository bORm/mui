/**
 * Created by borm on 29.07.2016.
 */
import { findDOMNode } from 'react-dom';

export default function isMounted(component) {
// exceptions for flow control :(
  try {
    findDOMNode(component);
    return true;
  } catch (e) {
    // Error: Invariant Violation: Component (with keys: props,context,state,refs,_reactInternalInstance) contains `render` method but is not mounted in the DOM
    return false;
  }
}