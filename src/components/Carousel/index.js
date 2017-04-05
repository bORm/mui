import React, {Component, PropTypes} from 'react'
import classNames from 'helpers/classNames'

let ratios = {
  '1x1' : 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=',
  '4x3' : 'iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAAEElEQVR42mP8/58BDBgxGABi7gX+XyMkHgAAAABJRU5ErkJggg==',
  '16x9': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAQAAACRI2S5AAAAEklEQVR42mP8/58BL2AcVQAGAHscEfhX5bYNAAAAAElFTkSuQmCC',
};

class Carousel extends Component {
  static propTypes = {
    index: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    ratio: PropTypes.oneOf([
      '1x1', '4x3', '16x9'
    ])
  };

  static defaultProps = {
    index : 0,
    ratio: '4x3'
  };

  constructor(props) {
    super(props);
    const { index, ratio } = props;
    this.state = {index, ratio}
  }

  set index(index){
    const length = this.props.items.length;
    if ( index <= -1 ) {
      index = length - 1;
    } else if ( index >= length ) {
      index = 0;
    }
    this.setState({index});
  }

  render() {
    const { index, ratio } = this.state;
    const length = this.props.items.length;
    return (
      <div className="carousel">

        <div className="carousel-inner">
          <img className="ratio" src={`data:image/png;base64,${ratios[ratio]}`} alt=""/>

          { length > 1 && [
            <a href="#" onClick={e=>this.index = index-1} key={'left'}
               className="material-icon">keyboard_arrow_left</a>,
            <a href="#" onClick={e=>this.index = index+1}  key={'right'}
               className="material-icon">keyboard_arrow_right</a>
          ] }

          { this.props.items.map((src, key)=>{
            return (
              <div className={classNames('carousel-inner-item', {
                active: index === key
              })} key={key}>
                <img src={src} alt="" />
              </div>
            )
          }) }
          
        </div>

        <div className="carousel-thumbs">

        </div>

      </div>
    );
  }
}

export default Carousel;