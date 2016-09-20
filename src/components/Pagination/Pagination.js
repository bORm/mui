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
    link: '/page/',
    onChange: false
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
    let {
      visible, first, last,
      limit, total, page, onChange
    } = this.props;

    page = parseInt(page);
    const pages = Math.ceil(total / limit);


    var range = Math.floor(visible / 2);
    var nav_begin = page - range;
    if (visible % 2 == 0) { // Если четное кол-во
      nav_begin++;
    }
    var nav_end = page + range;
    var left_dots = true;
    var right_dots = true;

    if (nav_begin <= 2) {
      nav_end = visible;
      if (nav_begin == 2) {
        nav_end++;
      }
      nav_begin = 1;
      left_dots = false;
    }

    if (nav_end >= pages - 1 ) {
      nav_begin = pages - visible + 1;
      if (nav_end == pages - 1) {
        nav_begin--;
      }
      nav_end = pages;
      right_dots = false;
    }
    
    if ( !limit ||  !total || !page ) {
      return null;
    }

    let pagination = [
      <Button className="prev" icon='chevron_left'
              onClick={e=>{
                onChange && onChange((page - 1), e);
                return Pagination.handlePrevNextClick(e,page <= 1);
              }}
              disabled={page <= 1}
              key={'prev'}/>
    ];

    if ( left_dots ) {
      if ( first ) {
        pagination.push(
          <Button text={1} key={'first'}
                  onClick={e=>{
                    onChange && onChange(1, e);
                }} />
        );
      }
      pagination.push(
        <Button text={'...'} key={'lDots'} disabled/>
      );
    }

    let buttonProps = {};
    for ( let i = nav_begin; i<=nav_end; i++ ) {
      buttonProps = {
        [i == page ? "primary" : "white"]: true
      };
      pagination.push(
        <Button text={i} key={i} {...buttonProps}
                onClick={e=>{
                  onChange && onChange(i, e);
                  return Pagination.handlePrevNextClick(e,page == i);
                }} />
      );
    }

    if ( right_dots ) {
      pagination.push(
        <Button text={'...'} key={'rDots'} disabled/>
      );
      if ( last ) {
        pagination.push(
          <Button text={pages} key={'last'}
                  onClick={e=>{
                    onChange && onChange(pages, e);
                }} />
        );
      }
    }

    pagination.push(
      <Button className="prev" icon='chevron_right'
              disabled={page >= pages}
              onClick={e=>{
                onChange && onChange((page + 1), e);
                return Pagination.handlePrevNextClick(e,page >= 1);
              }}
              key={'next'}/>
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