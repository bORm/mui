import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Paper from 'components/Paper'
import Ripple from 'components/Ripple'
import classNames from 'helpers/classNames'

class Chips extends Component
{
  static
  propTypes = {
    required: PropTypes.bool,
    success: PropTypes.bool,
    warning: PropTypes.bool,
    danger: PropTypes.bool,

    placeholder: PropTypes.string,

    multiple: PropTypes.bool,

    options:  PropTypes.array,
    value:    PropTypes.array,
    filter:   PropTypes.func,
    sort:     PropTypes.func,
    query:    PropTypes.string,
    item:     PropTypes.func,
  };

  static
  defaultProps = {
    required: false,
    success: false,
    warning: false,
    danger: false,

    placeholder: '',

    multiple: true,
    options:  [],
    value:    [],

    onSelect: (item, options, event)=>item,
    filter:   (item, query)=>item.toLowerCase().includes(query.toLowerCase()),
    search:   (item, query)=>item.toLowerCase().includes(query.toLowerCase()),
    sort:     () => {},
    query:    '',
    item:     ({item, selected, onMouseEnter, onMouseDown})=>{
      return (
        <Ripple {...{
          container: 'li',
          className: classNames({selected}),
          onMouseEnter, onMouseDown
        }}>
          <span>{item.name}</span>
        </Ripple>
      )
    },
    chip:     ({item, index, selected, onClickDelete, ...other})=>(
      <em className={classNames({selected})} {...other}>
        <span>{item.name}</span>
        <span className="material-icon" onClick={onClickDelete}>close</span>
      </em>
    )
  };

  constructor(props){
    super(props);
    this.state = {
      isFocused: false,
      selectedValue: -1,
      selectedSuggest: -1,
      opened: false,
      value: props.value,
      inputValue: '',
      suggest: []
    }
  }

  componentDidMount(){
    this.setState({suggest: this.suggest()})
  }

  open = () => {
    this.setState({open: true})
  };

  close = () => {
    this.setState({open: false})
  };

  get input() {
    return this.refs.input
  }

  suggest (value = ''){

    const { options, filter, sort, limit } = this.props;

    /*let suggestions = options.reduce((array, opt) => {
      if (~opt.name.toLowerCase().indexOf(value)) {
        array.push(opt);
      }
      return array;
    }, []);*/

    if ( !value.length ) return [];

    return options
      .filter(item => filter(item, value))
      .sort(sort)
      .slice(0, limit)
  }

  // menu
  handleMouseLeave = _event => {
    this.setState({selectedSuggest: -1})
  };

  // item
  handleMouseEnter = index => _event => {
    this.setState({selectedSuggest: index})
  };

  handleKeyDown = event => {

    let {
      selectedSuggest, selectedValue, inputValue,
      suggest, value
    } = this.state;

    const input = this.input;

    this.open();

    let key = event.key;

    // Double Click
    if ( event.type === 'dblclick' ) {
      key = 'DoubleClick';
    }

    // console.log(event.key);

    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        selectedSuggest = Math.min(selectedSuggest + 1, suggest.length - 1);
        selectedValue = -1;
        break;

      case 'ArrowUp':
        event.preventDefault();
        selectedSuggest = Math.max(selectedSuggest - 1, -1);
        selectedValue = -1;
        break;

      case 'Enter':
        event.preventDefault();
        if (selectedSuggest > -1) {
          this.handleSelect(suggest[selectedSuggest])(event)
        } else {
          this.handleSelect(event.target.value)(event)
        }
        selectedValue = -1;
        break;

      case 'Backspace':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'DoubleClick':

        if ( input.value === '' && value.length ) {
          switch (key){
            case 'Backspace':
              if (selectedValue === -1){
                selectedValue = value.length - 1;
              } else {
                value.splice(selectedValue, 1);
                selectedValue = -1;
                inputValue = '';
              }
              break;
            case 'ArrowLeft':
              selectedValue = ( selectedValue === -1 )
                ? Math.max(value.length - 1, -1)
                : Math.max(selectedValue - 1, -1);
              break;
            case 'ArrowRight':
              selectedValue = ( selectedValue === value.length - 1 )
                ? -1
                : Math.min(selectedValue + 1, value.length - 1);
              break;
            case 'DoubleClick':
              selectedValue = Math.max(value.length - 1, -1);
              break;
          }
        }

        break;

      case 'Escape':
        selectedSuggest = -1;
        selectedValue = -1;
        this.close();
        break;

      default:
        selectedValue = -1;
        inputValue = event.target.value;
        // TODO: Add debounce
        this.props.onKeyDown(event);
        if ( !this.props.multiple && value.length ) {
          event.preventDefault();
          return false;
        }
        //setTimeout(() => this.forceUpdate());
        break
    }

    /*if ( selectedValue !== -1 ) {
      this._blur = true;
      input.blur();
    }*/

    this.setState({selectedSuggest, selectedValue, inputValue})

  };

  handleFocus = (e) => {
    const { onFocus } = this.props;
    this.setState({isFocused: true});
    onFocus && onFocus(e);

    this.open();
  };

  handleBlur = (e) => {
    const { onBlur } = this.props;
    onBlur && onBlur(e);
    this.setState({
      isFocused: false,
      selectedSuggest: -1,
      selectedValue: -1
    });

    this.close();
  };

  // item
  handleSelect = item => event => {
    const { options, onSelect, search, multiple } = this.props;
    const { value } = this.state;
    const input = this.input;
    input.focus();
    /**
     * If there is no onSelect, just update the value
     */

    let selectHandler = onSelect(item, options, event);
    /**
     * After updating the value, we need to trigger an onChange event.
     * Can also trigger by returning true in onSelect
     */
    if (selectHandler) {
      if ( !value.filter(item => search(item, selectHandler)).length ) {
        this.setState({
          value: multiple ? [...this.state.value, selectHandler] : [selectHandler]
        });
      }
      input.value = '';
      const changeEvent = new Event('input', { bubbles: true });
      input.dispatchEvent(changeEvent)
    }

    /**
     * Close the menu and allow blur events
     * to continue,
     */
    setTimeout(() => {
      input.focus();
      this._blur = true;
      this.close();
      this.setState({
        selectedSuggest: -1
      });
      this.props.onChange(this.state.value);
    }, 100)
  };

  handleChange = event => {
    let suggest = this.suggest(event.target.value);
    this.setState({suggest, inputValue: event.target.value})
  };

  render()
  {

    const {
      required,
      success,
      warning,
      danger,
      className,
      placeholder,
      item: Item,
      chip: Chip
    } = this.props;

    return (
      <div className={classNames('chips', className)}>

        <label className={classNames('field floating field-md', {
          success: success !== false,
          warning: warning !== false,
          danger: danger !== false,
          hasValue: this.state.value.length > 0 || this.state.inputValue !== '',
          isFocused: this.state.isFocused
        })}>
          <div className="field-control">
            {this.state.value.map((item, key)=>(
              <Chip  {...{
                item, index: key, key,
                selected: this.state.selectedValue === key,
                onClickDelete: ()=>{
                  this.state.value.splice(key, 1);
                },
                onClick: ()=>{
                  this.setState({selectedValue: key});
                }
              }
              }/>
            ))}
            <input {...{
              ref: 'input',
              type: 'text',
              autoComplete: false,
              className: 'field-entry',
              onKeyDown: this.handleKeyDown,
              onDoubleClick:  this.handleKeyDown,
              onFocus: this.handleFocus,
              onBlur: this.handleBlur,
              onChange: this.handleChange
            }} />
            { placeholder && (
              <span className="field-label"
                    onClick={()=>this.input.focus()}
              >{ placeholder } { required && <sup>*</sup> }</span>
            ) }
            <hr className="field-border field-border-focus"/>
            <hr className="field-border" />
          </div>
        </label>

        {this.state.open && (
          <Paper component={'ul'} {...{
            onMouseLeave: this.handleMouseLeave,
          }}>
            {this.state.suggest.map((item, key)=>(
              <Item {...{
                item, key,
                selected: this.state.selectedSuggest === key,
                onMouseEnter: this.handleMouseEnter(key),
                onMouseDown: this.handleSelect(item),
              }}
              />
            ))}
          </Paper>
        )}

      </div>
    );
  }
}

export default Chips