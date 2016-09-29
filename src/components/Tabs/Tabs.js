import React, {Component, PropTypes} from 'react'

class Tabs extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div className="tabs">
        <Tab>
          {this.props.children}
        </Tab>
      </div>
    );
  }
}

export default Tabs