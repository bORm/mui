import React, {Component, PropTypes, Children} from 'react'
import Tab from 'components/Tabs/Tab'
import classNames from 'helpers/classNames'

class Tabs extends Component {
  static propTypes = {
    active: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ])
  };

  static defaultProps = {
    active: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      active: props.active
    }
  }

  set active(index){
    this.setState({
      active: index,
      last  : this.state.active
    })
  }

  render() {

    const tabs = {
      titles: [],
      contents: []
    };

    const { active, last } = this.state;
    const count = Children.count(this.props.children);
    const width = 100 / count;

    let transform = 100 * (-1);

    Children.map(this.props.children, (tab, key)=>{
      tabs.titles.push(
        <li className={classNames('tab-title', {
          active: key === active
        })} key={key} onClick={e=>this.active = key}>
          { tab.props.label }
        </li>
      );

      if ( key === this.state.active ) {
        transform = 0
      } else if ( key > this.state.active ) {
        transform = 100
      }

      tabs.contents.push(
        <div className={classNames('tab-content', {
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
      <div className="tabs">
        <ul>
          { tabs.titles }
        </ul>
        <div style={{overflow: 'hidden'}}>
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