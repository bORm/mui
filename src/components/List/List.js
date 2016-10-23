import React, {Component, PropTypes, isValidElement, cloneElement, createElement} from 'react'
import Ripple from '../Ripple'
import classNames from '../../helpers/classNames'

class List extends Component {
  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.string, PropTypes.element
    ]),
    className: PropTypes.string
  };

  static defaultProps = {
    component: 'div',
    className: ''
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { component, className, ...other } = this.props;
    const props = {
      className: classNames('list', className)
    };
    return isValidElement(component) ?
      cloneElement(component, props, this.props.children) :
      createElement(component, props, this.props.children);
  }
}

class Item extends Component {
  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.string, PropTypes.element
    ])
  };

  static defaultProps = {
    component: 'div'
  };

  constructor(props) {
    super(props);
  }

  handleLiClick(e) {
    const { onClick } = this.props;
    //console.log(e);
    onClick && onClick(e);
  }

  render() {
    const {
      className,
      component, children,
      primary, text, secondary,
      ...other
    } = this.props;

    const props = {
      className: classNames('list-item', className),
      onClick: ::this.handleLiClick
    };

    const item = isValidElement(component) ?
      cloneElement(component, props) :
      createElement(component, props);

    return (
      <Ripple container={item} {...other}>
        { children && children }
        { primary && <div className="primary">{primary}</div> }
        { text && <div className="text">{text}</div> }
        { secondary && <div className="secondary">{secondary}</div> }
      </Ripple>
    );
  }
}

export default List
export {Item}