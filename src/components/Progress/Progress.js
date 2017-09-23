import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'helpers/classNames'

export const UPDATE_TIME = 100;
export const MAX_PROGRESS = 80;
export const PROGRESS_INCREASE = 1;
export const ANIMATION_TIME = UPDATE_TIME * 2;

const initialState = {
  buffer: 0,
  percent: 0,
  progressInterval: null,
  animationTimeout: null,
};

export class Progress extends React.Component {

  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    actions: PropTypes.object,
    progress: PropTypes.number,
    updateTime: PropTypes.number,
    maxProgress: PropTypes.number,
    progressIncrease: PropTypes.number
  };

  static defaultProps = {
    style: {},
    className: undefined,
    progress: 0,
    updateTime: UPDATE_TIME,
    maxProgress: MAX_PROGRESS,
    progressIncrease: PROGRESS_INCREASE,
  };

  constructor(props) {
    super(props);

    this.state = initialState;

    this.progressInterval = null;
    this.animationTimeout = null;
    this.boundSimulateProgress = this.simulateProgress.bind(this);
    this.boundResetProgress = this.resetProgress.bind(this)
  }

  componentDidMount(){
    this.launch();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.progress > this.props.progress) {
      this.launch()
    }
  }

  componentWillUnmount() {
    clearInterval(this.progressInterval);
    clearTimeout(this.animationTimeout)
  }

  launch() {
    let { percent, buffer } = this.state;

    if (!this.progressInterval) {
      this.progressInterval = setInterval(
        this.boundSimulateProgress,
        this.props.updateTime
      );
      clearTimeout(this.animationTimeout);
      percent = 0;
      buffer = 0;
    }

    this.setState({
      ...this.state,
      percent,
      buffer
    })
  }

  simulateProgress() {
    let { percent, buffer } = this.state;
    if (percent === 100) {
      this.animationTimeout = setTimeout(this.boundResetProgress, ANIMATION_TIME);
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    } else if (this.props.progress === null) {
      percent = 100;
      buffer = 100;
    } else if (percent < this.props.maxProgress) {
      percent = percent + this.props.progressIncrease
      if ( percent < 35 )
      {
        buffer = 50;
      }
      if ( percent < 50 )
      {
        buffer = 70;
      }
      else
      {
        buffer = 100;
      }
    }

    this.setState({ percent, buffer });
    
    this.props.onProgress(percent);
  }

  resetProgress() {
    clearTimeout(this.animationTimeout);
    this.setState(initialState, ()=>{
      this.props.onDone();
    });
  }

  static shouldShow(percent) {
    return (percent > 0) && (percent < 100)
  }

  buildStyle() {
    //console.log(this.state.percent)
    const style = {
      progress: {
        width: `${this.state.percent}%`,
        transition: `width ${ANIMATION_TIME}ms linear,
                   height ${ANIMATION_TIME}ms linear`,
        zIndex: 2
      },
      buffer: {
        width: `${this.state.buffer}%`
      }
    };

    return { ...style, ...this.props.style }
  }

  render() {
    const style = this.buildStyle();
    let active = Progress.shouldShow(this.state.percent);

    return (
      <div className={classNames(
        'progress', 'clearfix',
        this.props.className, {active}
      )}>
        <span className="bar bar-progress" style={style.progress} />
        <span style={style.buffer} className="bar bar-buffer"/>
        <svg className="bar bar-dotted">
          <line className="line"
                x1="2" x2="10000" y1="2" y2="2" />
        </svg>
      </div>
    )
  }
}

export default Progress