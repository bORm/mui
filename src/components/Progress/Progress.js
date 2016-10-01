import React, {Component, PropTypes} from 'react';
import classNames from 'helpers/classNames'

class Progress extends Component {

  static propTypes = {
    /**
     * Set progress in percent
     */
    progress: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ])
  };

  static defaultProps = {
    progress: 50
  };

  constructor(props) {
    super(props);
    this.timeout = false;
    this.state = {
      progress: 0
    };
    this.setTimeOut(100);
  }

  componentWillReceiveProps(props){
    const { progress } = this.props;
    if ( props.progress !== progress && !this.timeout ) {
      this.updateProgress(progress);
    }
  }

  setTimeOut(progress) {
    this.timeout = setTimeout(()=>{
      this.updateProgress(progress);
      clearTimeout(this.timeout);
    }, 6000)
  }

  updateProgress(progress) {
    progress = progress * 2;
    this.setState({progress})
  }

  render() {
    const { progress } = this.state;
    return (
      <div className={classNames('progress', this.props.className)}>
        <svg className="bar bar-dotted">
          <line className="line" x1="2" x2="10000" y1="2" y2="2" />
        </svg>
        <span className="bar bar-buffer"/>
        <span className="bar bar-progress"><i style={{width: progress + '%'}}/></span>
      </div>
    )
  }
}

export default Progress;