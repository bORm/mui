import React, {Component, Children, cloneElement} from 'react'
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom'
import Tab from 'components/Tabs/Tab'
import Button from 'components/Button/Button'
import classNames from 'helpers/classNames'

class Tabs extends Component {
  static propTypes = {
    active: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    onChange: PropTypes.func
  };

  static defaultProps = {
    active: 0,
		onChange: ()=>{}
  };

  constructor(props) {
    super(props);
    const active = parseInt(props.active);
    this.state = {
      ...props,
      active,
      last: parseInt(props.last),
      hasArrows: false,
      translateX: 0,
      translateI: 0,
      range: {
        min: 0,
        max: 0
      }
    };
  }

  componentDidMount() {
    this.labels = findDOMNode(this.refs['labels']);
    this.titles = findDOMNode(this.refs['titles']);

    this.active = this.props;

    window.addEventListener('resize', ()=>{
      this.active = this.props;
    });
  }

  componentWillUnmount(){
    window.removeEventListener('resize', ()=>{});
  }

  componentWillReceiveProps(props){
    if ( props.active !== this.state.active ) {
			this.active = props
    }
  }

  set index(active){
    //const { active } = this.state;
    let i = 0, w = 0,
      scrollWidth = 0,
      labelsWidth = this.labels.offsetWidth,
      titlesWidth = this.titles.offsetWidth,
      translate = {
        min: 0,
        max: titlesWidth - labelsWidth
      };

    this.range = active;

    new Array(active + 1).join().split(',').map((tab, index)=>{
      scrollWidth += findDOMNode(this.refs['li' + index]).offsetWidth;
    });

    let translateX = translate.min;

    if ( ( scrollWidth - labelsWidth ) > 0 ) {
      while ( ++i ) {
        w += findDOMNode(this.refs['li' + (i-1)]).offsetWidth;
        if ( w > ( scrollWidth - labelsWidth ) ) {
          translateX = w;
          break;
        }
      }
    }

    ( translateX > translate.max ) && ( translateX = translate.max );
    this.setState({translateX});
  }

  set range(active){

    let visibleWidth = 0
      , labelsWidth = this.labels.offsetWidth
      , { range } = this.state,
      length = this.props.children.length;

    range.min = active;
    new Array(length).join().split(',').map((i, index)=>index)
      .slice(active).map((i)=> {

      visibleWidth += findDOMNode(this.refs['li' + i]).offsetWidth;
      if ( visibleWidth < labelsWidth ) {
        range.max = i;
      }

    });

    // console.log(visibleWidth);
    // console.log(range);

    this.setState({range});
  }

  paginate(dir){

    let { translateX } = this.state;

    const offsetWidth = {
      titles: this.titles.offsetWidth,
      labels: this.labels.offsetWidth
    };

    const translate = {
      min: 0,
      max: offsetWidth.titles - offsetWidth.labels
    };

    let { translateI } = this.state;

    let DOM, labelsWidth = this.labels.offsetWidth;

    let length = this.props.children.length;
    let Childs = new Array(length).join().split(',').map((i, index)=>index);

    //console.log(Childs)

    if ( dir === 'right' ) {

      offsetWidth.labels = Childs.reduce((sum, i)=>{
        DOM = findDOMNode(this.refs['li' + i]);
        if ( i >= translateI && ( sum + DOM.offsetWidth ) < labelsWidth ) {
          sum += DOM.offsetWidth;
          translateI = i;
        }
        return sum;
      }, 0);

      translateX = ((translateX)=>{
        return translateX > translate.max ? translate.max : translateX;
      })(translateX + offsetWidth.labels)
    } else if ( dir === 'left' ) {

      offsetWidth.labels = Childs.reverse().reduce((sum, i)=>{
        DOM = findDOMNode(this.refs['li' + i]);
        if ( i <= translateI && ( sum + DOM.offsetWidth ) < labelsWidth ) {
          sum += DOM.offsetWidth;
          translateI = i;
        }
        return sum;
      }, 0);

      translateX = ((translateX)=>{
        return translateX < translate.min ? translate.min : translateX;
      })(translateX - offsetWidth.labels)
    }

    this.setState({
      translateX: translateX, translateI
    })

    /*const { range } = this.state;

    let length = this.props.children.length;
    let active;
    if ( dir === 'right' ) {

      active = ((active)=>{
        return active > length ? length : active;
      })(range.max + 1);

    } else {

      active = ((active)=>{
        return active < 0 ? 0 : active;
      })(range.min - 1);

    }

    let i = 0, w = 0,
      scrollWidth = 0,
      labelsWidth = this.labels.offsetWidth,
      titlesWidth = this.titles.offsetWidth,
      translate = {
        min: 0,
        max: titlesWidth - labelsWidth
      };

    this.range = active;

    new Array(active).join().split(',').map((tab, index)=>{
      scrollWidth += findDOMNode(this.refs['li' + index]).offsetWidth;
    });

    let translateX = translate.min;

    if ( ( scrollWidth - labelsWidth ) > 0 ) {
      while ( ++i ) {
        w += findDOMNode(this.refs['li' + (i-1)]).offsetWidth;
        if ( w > ( scrollWidth - labelsWidth ) ) {
          translateX = w;
          break;
        }
      }
    }

    ( translateX > translate.max ) && ( translateX = translate.max );
    this.setState({translateX});*/
  }

  set active(props){

    //const { translateX, translateI } = this.state;

    this.setState({
      hasArrows: this.titles.offsetWidth > this.labels.offsetWidth
    }, ()=>{
      let { active } = props;
      active = parseInt(active);
      let TAB = props.children[active];
      if ( TAB ) {
        if ( TAB.props.disabled ) {
          active = this.state.active;
        }

        /*const offsetWidth = {
          titles: this.titles.offsetWidth,
          labels: this.labels.offsetWidth
        };

        const translate = {
          min: 0,
          max: offsetWidth.titles - offsetWidth.labels
        };

        //let index = ;
        let length = props.children.length - 1, index;
        if ( active > this.state.active || translateI > active ) {

          index = active - 1;
          index = index < 0 ? 0 : index;

          this.setState({
            translateX: ((translateX)=>{
              return translateX > translate.max ? translate.max : translateX;
            })(translateX + findDOMNode(this.refs['li' + index]).offsetWidth)
          })
        } else if ( active < this.state.active || translateI < active ) {
          index = active + 1;
          index = index > length ? length : index;

          this.setState({
            translateX: ((translateX)=>{
              return translateX < translate.min ? translate.min : translateX;
            })(translateX - findDOMNode(this.refs['li' + index]).offsetWidth)
          })
        }*/

        let DOM = findDOMNode(this.refs['li' + active]);
        this.setState({
          active: active,
          translateI: active,
          last  : this.state.active,
          inkBar: {
            width : DOM.offsetWidth
          , left  : DOM.offsetLeft
          }
        }, ()=>{

          this.index = this.state.active;

          this.props.onChange(this.state.active)
        })
      }

      //this.translateX('right');

    });
  }

  translateX(dir){
    let { translateX } = this.state;

    const offsetWidth = {
      titles: this.titles.offsetWidth,
      labels: this.labels.offsetWidth
    };

    const translate = {
      min: 0,
      max: offsetWidth.titles - offsetWidth.labels
    };

    let { translateI } = this.state;

    let DOM, labelsWidth = this.labels.offsetWidth;

    let length = this.props.children.length;
    let Childs = new Array(length).join().split(',').map((i, index)=>index);

    console.log(Childs)

    if ( dir === 'right' ) {

      offsetWidth.labels = Childs.reduce((sum, i)=>{
        DOM = findDOMNode(this.refs['li' + i]);
        if ( i >= translateI && ( sum + DOM.offsetWidth ) < labelsWidth ) {
          sum += DOM.offsetWidth;
          translateI = i;
        }
        return sum;
      }, 0);

      translateX = ((translateX)=>{
        return translateX > translate.max ? translate.max : translateX;
      })(translateX + offsetWidth.labels)
    } else if ( dir === 'left' ) {

      offsetWidth.labels = Childs.reverse().reduce((sum, i)=>{
        DOM = findDOMNode(this.refs['li' + i]);
        if ( i <= translateI && ( sum + DOM.offsetWidth ) < labelsWidth ) {
          sum += DOM.offsetWidth;
          translateI = i;
        }
        return sum;
      }, 0);

      translateX = ((translateX)=>{
        return translateX < translate.min ? translate.min : translateX;
      })(translateX - offsetWidth.labels)
    }

    this.setState({
      translateX: translateX, translateI
    })
  }

  render() {
    const tabs = {
      titles: [],
      contents: []
    };

    const child = [];

    const { active, last, inkBar, hasArrows, translateX, translateI } = this.state;
    // const count = Children.count(this.props.children);
    // const width = 100 / count;

    //console.log(translateI)

    let transform = 100 * (-1);

    Children.map(this.props.children, (tab, key)=>{

      if ( tab.type.name === 'Tab' )  {
        tabs.titles.push(
          <li ref={'li'+key} className={classNames('tab-title', {
            active: key === active
          })} key={key} onClick={e=>this.active = {...this.props, active: key}}>
            { typeof tab.props.label === 'string' ? (
                <Button text={tab.props.label} disabled={tab.props.disabled}/>
              ) : tab.props.label }
          </li>
        );

        if ( key === active ) {
          transform = 0;
        } else if ( key > active ) {
          transform = 100;
        }

        tabs.contents.push(
          cloneElement(tab, {
            className: classNames('tab-content', tab.props.className, {
              active: key === active
            }),
            style: {
              // width: width + '%',
              // transform: `translateX(${transform}%)`,
              // position: key === active ? 'relative' : 'absolute',
              //visibility: key === active || key === last ? 'visible' : 'hidden',
              display: key === active ? 'block' : 'none',
              opacity: key === active ? 1 : 0,
            }, key
          })
        );
      } else {
        child.push(tab);
      }

    });

    return (
      <div className={classNames('tabs', this.props.className)}>

        <div className="tabs-header">
          { hasArrows && ([
            <a href="#" className="material-icon left"
               key={'left'}  onClick={e=>this.paginate('left')}>
              chevron_left
            </a>,
            <a href="#" className="material-icon right"
               key={'right'} onClick={e=>this.paginate('right')}>
              chevron_right
            </a>,
          ]) }

          <div ref={'labels'} className={classNames('tabs-labels', {hasArrows})}>
            <ul ref={'titles'} style={{
              transform: `translateX(-${translateX}px)`,
            }}>
              { tabs.titles }
              <li className="ink-bar" style={inkBar}/>
            </ul>
          </div>
        </div>
        <div className="tabs-container">
          <div className="tabs-content" style={{/*{width: count * 100 + '%'}*/}}>
            { tabs.contents }
          </div>
        </div>
        { child }
      </div>
    );
  }
}

export default Tabs
export { Tab }

/**
 *
 * [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
 *
 * offsetWidth = 20;
 * translateX = 0;
 *
 * default range = [ 0, 3 ]
 * [ 0, 1, 2, 3 ], 4, 5, 6, 7, 8, 9
 *
 * set active(index) {
*
 *   let min =  Math.min(range)
 *   let max =  Math.max(range)
 *
 *   let { translateX } = this.state;
 *
 *   if ( index >= max ) {
 *
 *    translateX = this.offsetWidth(index) - this.offsetWidth(max);
 *
 *   }
 *
 *   else if ( index <= min ) {
 *
 *
 *
 *   }
 *
 * }
 *
 * get offsetWidth(length){
 *   return new Array(length).join().split(',').map((i, index)=>index).offsetWidth;
 * }
 *
 *
 *
 * // =============== 4
 * <- range = [ 0, 3 ]
 * active = 4
 *
 * call set active(index = 4){
 *
 *  let translateX;
 *
 *  if ( 4 > 3 ) {
 *
 *    translateX = this.offsetWidth(4) - this.offsetWidth(3) = 20;
 *
 *  }
 *
 *  -> range = [ 1, 2, 3, 4 ]
 *
 * }
 *
 * // =============== 6
 * <- range = [ 0, 3 ]
 * active = 6
 *
 * call set active(index = 6){
 *
 *  if ( 6 > 3 ) {
 *    translateX = this.offsetWidth(6) - this.offsetWidth(3);
 *  }
 *
 *  -> range = [ 3, 4, 5, 6 ]
 *
 * }
 *
 * // =============== 6
 * <- range = [ 3, 6 ]
 * active = 6
 *
 * call set active(index = 6){
 *
 *  if ( 6 > 3 ) {
 *    translateX = this.offsetWidth(6) - this.offsetWidth(3);
 *  }
 *
 *  -> range = [ 3, 4, 5, 6 ]
 * }
 */





/**
 *
 * active = 0
 *
 * set range(index){
 *
 *  let visibleWidth
 *    , { range } = this.state;
 *
*   range.min = index;
*
 *  new Array(this.props.children.length).join().split(',').map((i, index)=>index)
 *  .map(i=>{
 *
 *    visibleWidth += findDOMNode(this.refs['li' + i]).offsetWidth;
 *
 *
 *
 *  })
 *
 * }
 *
 */