import React, {Component, PropTypes, Children, cloneElement} from 'react'

class SelectionGroup extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {

    const {
      text, value,
      className,
      children, onClick,
      ripple, ...other
    } = this.props;

    return (
      <div>
        <legend>{this.props.legend}</legend>
        { this.props.name ? Children.map(children, child=>{
            return cloneElement(child, {
              name: this.props.name
            })
          }) : children }
      </div>
    );
  }
}

export default SelectionGroup
   