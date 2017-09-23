import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Button from 'components/Button/Button'
import Field from 'components/Field/Field'
import Modal from 'components/Modal/Modal'
import classNames from 'helpers/classNames'

import { findDOMNode } from 'react-dom'

/*const months = [
	"January", "February",
	"March", "April", "May",
	"June", "July", "August",
	"September", "October", "November",
	"December"
];*/

const months = [
	"Январь","Февраль",
	"Март","Апрель","Май",
	"Июнь","Июль","Август",
	"Сентябрь","Октябрь", "Ноябрь",
	"Декабрь"
];

//const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const DateUtilities = {
	pad: function (value, length) {
		while (value.length < length)
			value = "0" + value;
		return value;
	},

	clone: function (date) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
	},

	addYears: function (date, years) {
		const newDate = DateUtilities.clone(date);
		newDate.setFullYear(date.getFullYear() + years);
		return newDate;
	},

	toString: function (date) {
		return date.getFullYear() + "-" + DateUtilities.pad((date.getMonth() + 1).toString(), 2) + "-" + DateUtilities.pad(date.getDate().toString(), 2);
	},

	toMonthString: function (date) {
		return date.getFullYear() + "-" + DateUtilities.pad((date.getMonth() + 1).toString(), 2);
	},

	toDayOfMonthString: function (date) {
		return DateUtilities.pad(date.getDate().toString());
	},

	toMonthAndYearString: function (date) {
		return {
			months: months[date.getMonth()],
			year: date.getFullYear()
		}
	},

	moveToDayOfWeek: function (date, dayOfWeek) {
		while (date.getDay() !== dayOfWeek)
			date.setDate(date.getDate() - 1);
		return date;
	},

	isSameDay: function (first, second) {
		return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();
	},

	isBefore: function (first, second) {
		return first.getTime() < second.getTime();
	},

	isAfter: function (first, second) {
		return first.getTime() > second.getTime();
	}
};

class DatePicker extends Component {

	static propTypes = {
		type: PropTypes.oneOf(['date', 'month']),
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,

    success: PropTypes.oneOfType([
      PropTypes.string, PropTypes.bool
    ]),
    warning: PropTypes.oneOfType([
      PropTypes.string, PropTypes.bool
    ]),
    danger: PropTypes.oneOfType([
      PropTypes.string, PropTypes.bool
    ])
	};

	static defaultProps = {
		type: 'date',
    required: false,
    readOnly: false,
    disabled: false,

    success: false,
    warning: false,
    danger: false
	};

	constructor(props) {
		super(props);
		const { selected } = props;
		const def = selected || new Date();
		this.state = {
			view: DateUtilities.clone(def),
			selected: selected,
			minDate: this.props.minDate || DateUtilities.addYears(new Date(), -100),
			maxDate: this.props.maxDate || DateUtilities.addYears(new Date(), 100),
			id: this.props.id || 'datePicker',
			picker: 'day' // oneOf['day', 'month', 'year']
		}
	}

	onSelect(day) {
		this.setState({selected: day, picker: 'day'});
		if (this.props.onSelect) {
			this.props.onSelect(day);
		}
	}

	show() {Modal.toggle(this.state.id, true)}
	hide() {Modal.toggle(this.state.id, false)}

	set picker(picker){
		this.setState({picker})
	}

	render(){
		const { selected, picker } = this.state;
		const { name, placeholder, type, danger, warning } = this.props;

		return (
			<div className={'date-picker-control'}>
				<Field {...{
					type: "text",
					readOnly: true,
					value: !!(selected)
						? type === 'date' ? DateUtilities.toString(selected) : DateUtilities.toMonthString(selected)
						: '',
					onClick: ::this.show, name, placeholder, danger, warning
				}}/>
				<Modal id={this.state.id} className={classNames('date-picker', type)} closeButton={false}>
					<DateView {...{
						view: this.state.view,
						selected: this.state.selected,
						minDate: this.state.minDate,
						maxDate: this.state.maxDate,
						picker: (picker)=>this.picker = picker
					}} />

					<div className="calendar">
						{ ((picker)=>{
							switch (picker){
								case 'day':
									return <CalendarDay {...{
										id: this.state.id,
										onSelect: date=>{
											//this.hide();
											if ( type === 'month' ) {
												date.setUTCDate(new Date().getUTCDate());
											}
											this.onSelect(date);
										},
										view: this.state.view,
										selected: this.state.selected,
										minDate: this.state.minDate,
										maxDate: this.state.maxDate
									}}/>;
									break;
								case 'month':
									return <CalendarMonth {...{
										selected: this.state.selected,
										onSelect: ::this.onSelect,
									}} />;
									break;
								case 'year':
									return <CalendarYear {...{
										id: this.state.id,
										view: this.state.view,
										selected: this.state.selected,
										onSelect: ::this.onSelect,
										minDate: this.state.minDate,
										maxDate: this.state.maxDate
									}}/>;
									break;
							}
						})(picker) }
						<div className="button-cont">
							<Button onClick={e=>this.hide()}>Отмена</Button>
							<Button onClick={e=>this.hide()}>Подтвердить</Button>
						</div>
					</div>
				</Modal>
			</div>
		)
	}
}

class DateView extends Component {
	render(){
		const { selected, view, picker } = this.props;

		console.log(selected)

		const DayAndMonthAndYear = DateUtilities.toMonthAndYearString(selected ? selected : view);
		return (
			<div className="date-view">
				<div className="month" onClick={e=>picker('month')}>
					{ DayAndMonthAndYear.months }
					<i className="material-icons">keyboard_arrow_down</i>
				</div>
				<div className="day" onClick={e=>picker('day')}>
					{ DateUtilities.toDayOfMonthString(selected ? selected : view) }
				</div>
				<div className="year" onClick={e=>picker('year')}>
					{ DayAndMonthAndYear.year }
					<i className="material-icons">keyboard_arrow_down</i>
				</div>
			</div>
		)
	}
}

class CalendarYear extends Component {

	componentDidMount() {
		this.scrollToSelectedYear();
	}

	componentDidUpdate() {
		this.scrollToSelectedYear();
	}

	scrollToSelectedYear() {
		const { selected } = this.refs;
		if (selected === undefined) {
			return;
		}
		const container = findDOMNode(this);
		const node = findDOMNode(selected);

		const containerHeight = container.clientHeight;
		const nodeHeight = node.clientHeight || 32;

		container.scrollTop = (node.offsetTop + nodeHeight / 2) - containerHeight / 2;
	}

	render(){
		const {
			minDate,
			maxDate
		} = this.props;

		const date = this.props.selected;

		const minYear = minDate.getFullYear();
		const maxYear = maxDate.getFullYear();

		let years = [];
		let selected;
		let props;

		for (let year = minYear; year <= maxYear; year++) {
			selected = date.getFullYear() === year;
			props = {
				key: year,
				onClick: ()=>{
					date.setFullYear(year);
					this.props.onSelect(date);
				}
			};
			if (selected) {
				props.className = 'selected';
				props.ref = 'selected';
			}
			years.push(
				<div {...props}>{year}</div>
			);
		}
		return (
			<div className="calendar-year">
				{ years }
			</div>
		)
	}
}

class CalendarMonth extends Component {
	componentDidMount() {
		this.scrollToSelectedYear();
	}

	componentDidUpdate() {
		this.scrollToSelectedYear();
	}

	scrollToSelectedYear() {
		const { selected } = this.refs;
		if (selected === undefined) {
			return;
		}
		const container = findDOMNode(this);
		const node = findDOMNode(selected);

		const containerHeight = container.clientHeight;
		const nodeHeight = node.clientHeight || 32;

		container.scrollTop = (node.offsetTop + nodeHeight / 2) - containerHeight / 2;
	}

	render(){
		const date = !!(this.props.selected) ? this.props.selected : this.props.view;
		let selected;
		let props;
		return (
			<div className="calendar-month">
				{ months.map((month, i)=>{
					selected = date.getMonth() === i;
					props = {
						key: i,
						onClick: ()=>{
							date.setMonth(i);
							this.props.onSelect(date);
						}
					};
					if (selected) {
						props.className = 'selected';
						props.ref = 'selected';
					}
					return (
						<div {...props}>{month}</div>
					)
				}) }
			</div>
		)
	}
}

class CalendarDay extends Component {
	constructor(props) {
		super(props);
	}

	onMove(view, isForward) {
		this.refs.weeks.moveTo(view, isForward);
	}

	onTransitionEnd() {
		this.refs.monthHeader.enable();
	}

	render() {
		return (
			<div className={'calendar-day clearfix'}>
				<MonthHeader  {...{
					ref: "monthHeader",
					view: this.props.view,
					selected: this.props.selected,
					onMove: ::this.onMove,
					minDate: this.props.minDate,
					maxDate: this.props.maxDate
				}}/>
				<WeekHeader />
				<Weeks {...{
					ref: "weeks",
					view: this.props.view,
					selected: this.props.selected,
					onTransitionEnd: ::this.onTransitionEnd,
					onSelect: this.props.onSelect,
					minDate: this.props.minDate,
					maxDate: this.props.maxDate
				}}/>
			</div>
		);
	}
}

class MonthHeader extends Component {
	constructor(props) {
		super(props);
		const { selected, view } = props;
		this.state = {
			view: DateUtilities.clone(!!(selected) ? selected : view),
			enabled: true
		}
	}
	moveBackward() {
		const view = DateUtilities.clone(this.state.view);
		view.setMonth(view.getMonth() - 1);
		this.move(view, false);
	}

	moveForward() {
		const view = DateUtilities.clone(this.state.view);
		view.setMonth(view.getMonth() + 1);
		this.move(view, true);
	}

	move(view, isForward) {
		if (!this.state.enabled)
			return;

		this.setState({
			view: view,
			enabled: false
		});

		this.props.onMove(view, isForward);
	}

	enable() {
		this.setState({enabled: true});
	}

	render() {
		const enabled = this.state.enabled;
		const MonthAndYear = DateUtilities.toMonthAndYearString(this.state.view);

		return (
			<div className="month-header">
				<Button raised icon="keyboard_arrow_left" onClick={::this.moveBackward}
								isCenter className={classNames({disabled: !enabled})} />
				<span>
					{ `${MonthAndYear.months} ${MonthAndYear.year}` }
				</span>
				<Button raised icon="keyboard_arrow_right" onClick={::this.moveForward}
								isCenter className={classNames({disabled: !enabled})} />
			</div>
		);
	}
}

class WeekHeader extends Component {
	render(){
		return (
			<div className="week-header">
				{ days.map(day=><span key={day}>{day}</span>) }
			</div>
		)
	}
}

class Weeks extends Component {
	constructor(props){
		super(props);
		const { selected, view } = props;
		this.state = {
			view: DateUtilities.clone(!!(selected) ? selected : view),
			other: DateUtilities.clone(!!(selected) ? selected : view),
			sliding: null
		}
	}
	componentDidMount() {
		findDOMNode(this.refs.current).addEventListener("transitionend", ::this.onTransitionEnd)
	}

	onTransitionEnd() {
		this.setState({
			sliding: null,
			view: DateUtilities.clone(this.state.other)
		});

		this.props.onTransitionEnd();
	}

	static getWeekStartDates(view) {
		view.setDate(1);
		view = DateUtilities.moveToDayOfWeek(DateUtilities.clone(view), 1);

		const current = DateUtilities.clone(view);
		current.setDate(current.getDate() + 7);

		const starts = [view],
			month = current.getMonth();

		while (current.getMonth() === month) {
			starts.push(DateUtilities.clone(current));
			current.setDate(current.getDate() + 7);
		}

		return starts;
	}

	moveTo(view, isForward) {
		this.setState({
			sliding: isForward ? "left" : "right",
			other: DateUtilities.clone(view)
		});
	}

	render() {
		const { sliding } = this.state;
		return (
			<div className="weeks">
				<div ref={'current'}
						 className={classNames('current', (sliding ? ("sliding " + sliding) : ""))}>
					{this.renderWeeks(this.state.view)}
				</div>
				<div ref={'other'}
						 className={classNames('other', (sliding ? ("sliding " + sliding) : ""))}>
					{this.renderWeeks(this.state.other)}
				</div>
			</div>
		)
	}

	renderWeeks(view) {
		const starts = Weeks.getWeekStartDates(view), month = starts[1].getMonth();
		const { selected, onSelect, minDate, maxDate } = this.props;
		return starts.map((start,key)=>(
			<Week {...{
				key, start, month,
				selected, view, onSelect, minDate, maxDate
			}}/>
		));
	}
}

class Week extends Component {
	static buildDays(start) {
		let days = [DateUtilities.clone(start)],
			clone = DateUtilities.clone(start), i;
		for (i = 1; i <= 6; i++) {
			clone = DateUtilities.clone(clone);
			clone.setDate(clone.getDate() + 1);
			days.push(clone);
		}
		return days;
	}

	onSelect(day) {
		!this.isDisabled(day) && this.props.onSelect(day);
	}

	isDisabled(day) {
		const { minDate, maxDate } = this.props;
		return (
			minDate && DateUtilities.isBefore(day, minDate))
			||
			(maxDate && DateUtilities.isAfter(day, maxDate)
		);
	}

	render() {
		const { start, month, selected , view } = this.props;
		let days = Week.buildDays(start);
		return (
			<div className="week">
				{ days.map((day, i)=>(
					<div {...{
						key: i,
						onClick: this.onSelect.bind(this, day),
						className: classNames('day', {
							today: DateUtilities.isSameDay(day, new Date()),
							otherMonth: month !== day.getMonth(),
							selected: selected && DateUtilities.isSameDay(day, !!(selected) ? selected : view),
							disabled: this.isDisabled(day)
						})
					}}>
						{DateUtilities.toDayOfMonthString(day)}
					</div>
				)) }
			</div>
		)
	}
}

export default DatePicker