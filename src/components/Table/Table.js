import React, {Component, PropTypes} from 'react'
import Paper from '../Paper'

class Table extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    const { ...other } = this.props;
    return (
      <Paper { ...other }>
        <table className="table">
          { this.props.children }
        </table>
      </Paper>
    );
  }
}

export default Table