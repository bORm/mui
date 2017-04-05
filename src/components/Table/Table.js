import React, {Component, PropTypes} from 'react'
import Paper from '../Paper'
import classNames from '../../helpers/classNames'

class Table extends Component {
  static propTypes = {
    striped: PropTypes.bool
  };

  static defaultProps = {
    striped: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { striped, ...other } = this.props;
    return (
      <Paper { ...other }>
        <table className={classNames("table", {
          striped
        })}>
          { this.props.children }
        </table>
      </Paper>
    );
  }
}

export default Table