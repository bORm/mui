import React, {Component, Children, cloneElement, createElement} from 'react'
import PropTypes from 'prop-types';
import Paper from 'components/Paper'
import Ripple from 'components/Ripple'
import classNames from 'helpers/classNames'

class Menu extends Component {
  static propTypes = {
    onChange: PropTypes.oneOfType([
      PropTypes.func, PropTypes.bool
    ])
  };

  static defaultProps = {
    onChange: false
  };

  render() {
    const { onChange, children, ...other } = this.props;
    return (
      <Paper {...other}>
        <div className={classNames("menu")}>
          { Children.map(children, (child)=>{
            {/*return cloneElement(child, {
              onClick: (e, o)=>{
                const { onClick } = child.props;
                onClick && onClick(e);
                onChange && onChange(e, o);
              }
            })*/}
            return <Item {...{
              ...child.props,
              onClick: (e, o)=>{
                const { onClick } = child.props;
                onClick && onClick(e);
                onChange && onChange(e, o);
              }
            }}/>
          }) }
        </div>
      </Paper>
    );
  }
}

class Item extends Component {
  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.string, PropTypes.node,
    ]),
    value: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number, PropTypes.bool
    ]),
    text: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number
    ]),
    onClick: PropTypes.oneOfType([
      PropTypes.func, PropTypes.bool
    ]),
    ripple: PropTypes.object
  };

  static defaultProps = {
    component: 'div',
    value: false,
    text: '',
    onClick: false,
    ripple: {
      isCenter: false
    },
    onChange: (e)=>{}
  };

  render() {

    const {
      component, className,
      text, children, onClick,
      ripple, ...other
    } = this.props;

    const containerProps = {
      className: classNames('menu-item', className),
      onClick: (e)=>{
        onClick && onClick(e, ((text, value)=>{
          text = !!(text) ? text : children;
          value = value ? value : text;
          return {value, text}
        })(text, this.props.value))
      },
    };
    const rippleContainer = (() => {
      if (typeof component === 'string') {
        return createElement(component, containerProps);
      }
      return cloneElement(component, containerProps);
    })();

    return (
      <Ripple isCenter={ripple.isCenter} container={rippleContainer} {...other}>
        <div className="menu-item-inner">
          { children ? children : text }
        </div>
      </Ripple>
    );
  }
}

class Divider extends Component {
  render() {
    return(
      <div className="menu-divider">
        { this.props.children }
      </div>
    )
  }
}

export default Menu
export { Item }
export { Divider }