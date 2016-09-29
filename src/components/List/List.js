import React, {Component, PropTypes} from 'react'
import Ripple from '../Ripple'
import classNames from '../../helpers/classNames'

class List extends Component {
  static propTypes = {};

  static defaultProps = {
    unStyled: true
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { unStyled } = this.props;
    return (
      <ul className={classNames('list', {
        unStyled
      })}>
        { this.props.children }
      </ul>
    );
  }
}

class Item extends Component {
  static propTypes = {};

  static defaultProps = {
    unStyled: true
  };

  constructor(props) {
    super(props);
  }

  handleLiClick(e) {
    console.log(e);
    //e.stopPropagation();
    e.preventDefault(e);
    return e;
  }

  render() {
    const {
      className,
      children,
      primary, text, secondary
    } = this.props;
    return (
      <Ripple container={<li className={classNames('list-item', className)} onClick={::this.handleLiClick} />}>
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