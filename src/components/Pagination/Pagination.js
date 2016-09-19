import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import { Button } from '../Button/Button'

class Pagination extends Component {
  static propTypes = {
    limit: PropTypes.number,
    total: PropTypes.number,
    page: PropTypes.number,
    link: PropTypes.string
  };

  static defaultProps = {
    limit: 10,
    link: 'page/'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pagination">
        { this.pages() }
      </div>
    );
  }

  pages() {
    const { limit, total, page, link } = this.props;
    if ( !limit ||  !total || !page ) {
      return null;
    }
    const pages = total / limit;
    let pagination = [];
    let style = {
      root: {
        marginLeft: 2
        , marginRight: 2
      }
    };
    let buttonProps = {};
    for ( let i = 1; i<=pages; i++ ) {
      buttonProps = {
        [i === page ? "primary" : "white"]: true
      };
      pagination.push(
        <Button {...buttonProps} text={i} key={i}
                component={<Link to={ link + i}/>} style={style}/>
      );
    }
    return pagination;
  }
}

export default Pagination