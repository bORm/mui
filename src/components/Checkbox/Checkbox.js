import React, {Component, PropTypes} from 'react'
import classNames from 'helpers/classNames'
import Ripple from 'components/Ripple'

class Checkbox extends Component {
  static propTypes = {
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
    const {name, label, onChange} = this.props;
    const {checked, disabled} = this.state;

    return (
	    <Ripple container={
		    <label className={classNames('checkbox',{checked, disabled})} />
	    } isCenter={true} disabled={disabled}>
		    <input type="checkbox" {
			    ...{
				    /**
				     * Input Props
				     */
			    	name, checked, disabled,
				    onChange: e=> {
			    		const { checked } = e.target;
					    this.setState({checked})
							onChange && onChange(e);
				    }
			    }
		    } />
		    <span className="checkbox-icon" />
		    { label && <CheckboxLabel>{label}</CheckboxLabel> }
	    </Ripple>
    );
  }
}

class CheckboxLabel extends Component {
	render(){
		return (
			<div className="checkbox-label">{ this.props.children }</div>
		);
	}
}

export default Checkbox
export { CheckboxLabel }