import React, {Component, PropTypes, Children, cloneElement} from 'react'
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
    this.state = {
      ...props,
      ...{
        active: parseInt(props.active),
        last: parseInt(props.last)
      }
    };
  }

  set active(props){
		let { active } = props;
		active = parseInt(active);
		let TAB = props.children[active];
		if ( TAB ) {
		  if ( TAB.props.disabled ) {
				active = this.state.active;
      }
			let DOM = findDOMNode(this.refs['li' + active]);
			this.setState({
				active: active,
				last  : this.state.active,
				inkBar: {
					width : DOM.offsetWidth
				, left  : DOM.offsetLeft
				}
			}, ()=>{
			  this.props.onChange(this.state.active)
      })
    }
  }

  componentDidMount() {
    this.active = this.props
  }

  componentWillReceiveProps(props){
    if ( props.active !== this.state.active ) {
			this.active = props
    }
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

    });

    return (
      <div className={classNames('tabs', this.props.className)}>
        <ul>
          { tabs.titles }
          <li className="ink-bar" style={inkBar}/>
        </ul>
        <div className="tabs-container">
          <div className="tabs-content" style={{/*{width: count * 100 + '%'}*/}}>
            { tabs.contents }
          </div>
        </div>
      </div>
    );
  }
}

export default Tabs
export { Tab }