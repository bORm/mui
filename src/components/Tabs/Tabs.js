import React, {Component, PropTypes, Children} from 'react'
import { findDOMNode } from 'react-dom'
import Tab from 'components/Tabs/Tab'
import Button from 'components/Button/Button'
import classNames from 'helpers/classNames'

class Tabs extends Component {
  static propTypes = {
    active: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ])
  };

  static defaultProps = {
    active: 0,
    last: 0,
    inkBar: {
      width: 0,
      left: 0
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      ...{
        active: parseInt(props.active),
        last: parseInt(props.last)
      }
    };
  }

  set active(index){
    let DOM = findDOMNode(this.refs['li' + index]);
    this.setState({
      active: index,
      last  : this.state.active,
      inkBar: {
        width : DOM.offsetWidth
      , left  : DOM.offsetLeft
      }
    })
  }

  componentDidMount() {
    this.active = parseInt(this.props.active)
  }

  render() {

    const tabs = {
      titles: [],
      contents: []
    };

    const { active, last, inkBar } = this.state;
    const count = Children.count(this.props.children);
    const width = 100 / count;

    let transform = 100 * (-1);

    React.Children.map(this.props.children, (tab, key)=>{
      tabs.titles.push(
        <li ref={'li'+key} className={classNames('tab-title', {
          active: key === active
        })} key={key} onClick={e=>this.active = key}>
          { typeof tab.props.label === 'string' ? (
            <Button text={tab.props.label}/>
          ) : tab.props.label }
        </li>
      );

      if ( key === active ) {
        transform = 0
      } else if ( key > active ) {
        transform = 100
      }

      tabs.contents.push(
        <div className={classNames('tab-content', tab.props.className, {
          active: key === active
        })} style={{
          width: width + '%',
          transform: `translateX(${transform}%)`,
          position: key === active ? 'relative' : 'absolute',
          visibility: key === active || key === last ? 'visible' : 'hidden'
        }} key={key}>{ tab }</div>
      )
    });

    return (
      <div className={classNames('tabs', this.props.className)}>
        <ul>
          { tabs.titles }
          <li className="ink-bar" style={inkBar}/>
        </ul>
        <div className="tabs-container">
          <div className="tabs-content" style={{width: count * 100 + '%'}}>
            { tabs.contents }
          </div>
        </div>
      </div>
    );
  }
}

export default Tabs
export { Tab }