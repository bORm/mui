import React, {Component} from 'react'
import PropTypes from 'prop-types';
import classNames from 'helpers/classNames'
import Ripple from 'components/Ripple'

class Selection extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      'checkbox', 'radio', 'switch'
    ]),
    name: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.string
    ]),
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.string, PropTypes.element
    ])
  };

  static defaultProps = {
    type: 'checkbox',
    checked: false,
    disabled: false,
    label: false
  };

  constructor(props){
    super(props);
    const {checked, disabled} = props;
    this.state = {checked, disabled};
  }

  render() {
    const {type, name, label, onChange} = this.props;
    const {checked, disabled} = this.state;

    return (
      <Ripple container={
        <label className={classNames('selection', type, {checked, disabled})} />
      } isCenter={true} disabled={disabled}>
        <input type={type} {
          ...{
            /**
             * Input Props
             */
            name, checked, disabled,
            onChange: e=> {
              const { checked } = e.target;
              this.setState({checked});
              onChange && onChange(e);
            }
          }
        } />
        <span className="checkbox-icon" />
        { label && <div className="selection-label">{label}</div> }
      </Ripple>
    );
  }
}

export default Selection;