import React, {Component, PropTypes} from 'react'

import { Button } from 'mui'
class Pagination extends Component {
  static propTypes = {
    // limit: PropTypes.number,
    // total: PropTypes.number,
    // page: PropTypes.number,
    // link: PropTypes.string
    onChange: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.func
    ])
  };

  static defaultProps = {
    visible: 10,
    first: true,
    last: true,
    limit: 10,
		total: 10,
    link: '/page/',
    onChange: false
  };

  constructor(props) {
    super(props);
    this.state = props;
  }

  componentWillReceiveProps(props) {
    this.setState({...props})
  }

  render() {
    return (
      <div className="pagination">
        { this.pages(this.props) }
      </div>
    );
  }

  pages(props){
    let {
      visible, first, last,
      limit, total, page, onChange
    } = props;

    limit = parseInt(limit);
    total = parseInt(total);
    page  = parseInt(page);

    if ( !limit || !total || !page ) return null;

    const pages = Math.ceil(total / limit);
    visible = pages > visible ? visible == 2 ? 3 : visible : pages;

    let currentPage, lowerLimit, upperLimit;
    currentPage = lowerLimit = upperLimit = Math.min(page, pages);

    for (let b = 1; b < visible && b < pages;) {
      if (lowerLimit > 1 ) { lowerLimit--; b++; }
      if (b < visible && upperLimit < pages) { upperLimit++; b++; }
    }

    const pagination = [
      <Button className="prev" icon='chevron_left'
              disabled={page <= 1} key={'prev'}
              onClick={e=>{
                onChange && onChange((page - 1), e);
                return Pagination.handlePrevNextClick(e,page <= 1);
              }}/>
    ];

    if ( first && lowerLimit > 1 && visible >= 3 ) {
      lowerLimit++;
      pagination.push(
        <Button text={1} key={'first'}
                onClick={e=>{onChange && onChange(1, e)}} />,
        <Button text={'...'} key={'lDots'} disabled/>
      )
    }

    if ( last && upperLimit < pages && visible >= 3 ) {
      upperLimit--;
    }

    for (let i = lowerLimit; i <= upperLimit; i++) {
      if (i == currentPage) {
        pagination.push(
          <Button text={i} key={i} primary disabled={true} />
        );
      }
      else {
        pagination.push(
          <Button text={i} key={i} white
                  onClick={e=>{onChange && onChange(i, e)}} />
        );
      }
    }

    if ( last && upperLimit < pages && visible >= 3 ) {
      pagination.push(
        <Button text={'...'} key={'rDots'} disabled/>,
        <Button text={pages} key={'last'}
                onClick={e=>{onChange && onChange(pages, e)}} />
      )
    }

    pagination.push(
      <Button className="prev" icon='chevron_right'
              disabled={page >= pages} key={'next'}
              onClick={e=>{
                onChange && onChange((page + 1), e);
                return Pagination.handlePrevNextClick(e,page >= 1);
              }}/>
    );

    return pagination;

  }

  static handlePrevNextClick(e, disabled) {
    if ( disabled ){
      e.preventDefault();
      return false
    }
  }
}

export default Pagination