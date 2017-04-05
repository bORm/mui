'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Field = require('../Field/Field');

var _Field2 = _interopRequireDefault(_Field);

var _Modal = require('../Modal/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _classNames = require('helpers/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*const months = [
	"January", "February",
	"March", "April", "May",
	"June", "July", "August",
	"September", "October", "November",
	"December"
];*/

var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

//const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

var DateUtilities = {
	pad: function pad(value, length) {
		while (value.length < length) {
			value = "0" + value;
		}return value;
	},

	clone: function clone(date) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
	},

	addYears: function addYears(date, years) {
		var newDate = DateUtilities.clone(date);
		newDate.setFullYear(date.getFullYear() + years);
		return newDate;
	},

	toString: function toString(date) {
		return date.getFullYear() + "-" + DateUtilities.pad((date.getMonth() + 1).toString(), 2) + "-" + DateUtilities.pad(date.getDate().toString(), 2);
	},

	toMonthString: function toMonthString(date) {
		return date.getFullYear() + "-" + DateUtilities.pad((date.getMonth() + 1).toString(), 2);
	},

	toDayOfMonthString: function toDayOfMonthString(date) {
		return DateUtilities.pad(date.getDate().toString());
	},

	toMonthAndYearString: function toMonthAndYearString(date) {
		return {
			months: months[date.getMonth()],
			year: date.getFullYear()
		};
	},

	moveToDayOfWeek: function moveToDayOfWeek(date, dayOfWeek) {
		while (date.getDay() !== dayOfWeek) {
			date.setDate(date.getDate() - 1);
		}return date;
	},

	isSameDay: function isSameDay(first, second) {
		return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();
	},

	isBefore: function isBefore(first, second) {
		return first.getTime() < second.getTime();
	},

	isAfter: function isAfter(first, second) {
		return first.getTime() > second.getTime();
	}
};

var DatePicker = (_temp = _class = function (_Component) {
	(0, _inherits3.default)(DatePicker, _Component);

	function DatePicker(props) {
		(0, _classCallCheck3.default)(this, DatePicker);

		var _this = (0, _possibleConstructorReturn3.default)(this, (DatePicker.__proto__ || (0, _getPrototypeOf2.default)(DatePicker)).call(this, props));

		var selected = props.selected;

		var def = selected || new Date();
		_this.state = {
			view: DateUtilities.clone(def),
			selected: selected,
			minDate: _this.props.minDate || DateUtilities.addYears(new Date(), -100),
			maxDate: _this.props.maxDate || DateUtilities.addYears(new Date(), 100),
			id: _this.props.id || 'datePicker',
			picker: 'day' // oneOf['day', 'month', 'year']
		};
		return _this;
	}

	(0, _createClass3.default)(DatePicker, [{
		key: 'onSelect',
		value: function onSelect(day) {
			this.setState({ selected: day, picker: 'day' });
			if (this.props.onSelect) {
				this.props.onSelect(day);
			}
		}
	}, {
		key: 'show',
		value: function show() {
			_Modal2.default.toggle(this.state.id, true);
		}
	}, {
		key: 'hide',
		value: function hide() {
			_Modal2.default.toggle(this.state.id, false);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _state = this.state,
			    selected = _state.selected,
			    picker = _state.picker;
			var _props = this.props,
			    name = _props.name,
			    placeholder = _props.placeholder,
			    type = _props.type,
			    danger = _props.danger,
			    warning = _props.warning;


			return _react2.default.createElement(
				'div',
				{ className: 'date-picker-control' },
				_react2.default.createElement(_Field2.default, {
					type: "text",
					readOnly: true,
					value: !!selected ? type === 'date' ? DateUtilities.toString(selected) : DateUtilities.toMonthString(selected) : '',
					onClick: this.show.bind(this), name: name, placeholder: placeholder, danger: danger, warning: warning
				}),
				_react2.default.createElement(
					_Modal2.default,
					{ id: this.state.id, className: (0, _classNames2.default)('date-picker', type), closeButton: false },
					_react2.default.createElement(DateView, {
						view: this.state.view,
						selected: this.state.selected,
						minDate: this.state.minDate,
						maxDate: this.state.maxDate,
						picker: function picker(_picker) {
							return _this2.picker = _picker;
						}
					}),
					_react2.default.createElement(
						'div',
						{ className: 'calendar' },
						function (picker) {
							switch (picker) {
								case 'day':
									return _react2.default.createElement(CalendarDay, {
										id: _this2.state.id,
										onSelect: function onSelect(date) {
											//this.hide();
											if (type === 'month') {
												date.setUTCDate(new Date().getUTCDate());
											}
											_this2.onSelect(date);
										},
										view: _this2.state.view,
										selected: _this2.state.selected,
										minDate: _this2.state.minDate,
										maxDate: _this2.state.maxDate
									});
									break;
								case 'month':
									return _react2.default.createElement(CalendarMonth, {
										selected: _this2.state.selected,
										onSelect: _this2.onSelect.bind(_this2)
									});
									break;
								case 'year':
									return _react2.default.createElement(CalendarYear, {
										id: _this2.state.id,
										view: _this2.state.view,
										selected: _this2.state.selected,
										onSelect: _this2.onSelect.bind(_this2),
										minDate: _this2.state.minDate,
										maxDate: _this2.state.maxDate
									});
									break;
							}
						}(picker),
						_react2.default.createElement(
							'div',
							{ className: 'button-cont' },
							_react2.default.createElement(
								_Button2.default,
								{ onClick: function onClick(e) {
										return _this2.hide();
									} },
								'\u041E\u0442\u043C\u0435\u043D\u0430'
							),
							_react2.default.createElement(
								_Button2.default,
								{ onClick: function onClick(e) {
										return _this2.hide();
									} },
								'\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C'
							)
						)
					)
				)
			);
		}
	}, {
		key: 'picker',
		set: function set(picker) {
			this.setState({ picker: picker });
		}
	}]);
	return DatePicker;
}(_react.Component), _class.propTypes = {
	type: _react.PropTypes.oneOf(['date', 'month']),
	required: _react.PropTypes.bool,
	readOnly: _react.PropTypes.bool,
	disabled: _react.PropTypes.bool,

	success: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool]),
	warning: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool]),
	danger: _react2.default.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool])
}, _class.defaultProps = {
	type: 'date',
	required: false,
	readOnly: false,
	disabled: false,

	success: false,
	warning: false,
	danger: false
}, _temp);

var DateView = function (_Component2) {
	(0, _inherits3.default)(DateView, _Component2);

	function DateView() {
		(0, _classCallCheck3.default)(this, DateView);
		return (0, _possibleConstructorReturn3.default)(this, (DateView.__proto__ || (0, _getPrototypeOf2.default)(DateView)).apply(this, arguments));
	}

	(0, _createClass3.default)(DateView, [{
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    selected = _props2.selected,
			    view = _props2.view,
			    picker = _props2.picker;


			console.log(selected);

			var DayAndMonthAndYear = DateUtilities.toMonthAndYearString(selected ? selected : view);
			return _react2.default.createElement(
				'div',
				{ className: 'date-view' },
				_react2.default.createElement(
					'div',
					{ className: 'month', onClick: function onClick(e) {
							return picker('month');
						} },
					DayAndMonthAndYear.months,
					_react2.default.createElement(
						'i',
						{ className: 'material-icons' },
						'keyboard_arrow_down'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'day', onClick: function onClick(e) {
							return picker('day');
						} },
					DateUtilities.toDayOfMonthString(selected ? selected : view)
				),
				_react2.default.createElement(
					'div',
					{ className: 'year', onClick: function onClick(e) {
							return picker('year');
						} },
					DayAndMonthAndYear.year,
					_react2.default.createElement(
						'i',
						{ className: 'material-icons' },
						'keyboard_arrow_down'
					)
				)
			);
		}
	}]);
	return DateView;
}(_react.Component);

var CalendarYear = function (_Component3) {
	(0, _inherits3.default)(CalendarYear, _Component3);

	function CalendarYear() {
		(0, _classCallCheck3.default)(this, CalendarYear);
		return (0, _possibleConstructorReturn3.default)(this, (CalendarYear.__proto__ || (0, _getPrototypeOf2.default)(CalendarYear)).apply(this, arguments));
	}

	(0, _createClass3.default)(CalendarYear, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.scrollToSelectedYear();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.scrollToSelectedYear();
		}
	}, {
		key: 'scrollToSelectedYear',
		value: function scrollToSelectedYear() {
			var selected = this.refs.selected;

			if (selected === undefined) {
				return;
			}
			var container = (0, _reactDom.findDOMNode)(this);
			var node = (0, _reactDom.findDOMNode)(selected);

			var containerHeight = container.clientHeight;
			var nodeHeight = node.clientHeight || 32;

			container.scrollTop = node.offsetTop + nodeHeight / 2 - containerHeight / 2;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this5 = this;

			var _props3 = this.props,
			    minDate = _props3.minDate,
			    maxDate = _props3.maxDate;


			var date = this.props.selected;

			var minYear = minDate.getFullYear();
			var maxYear = maxDate.getFullYear();

			var years = [];
			var selected = void 0;
			var props = void 0;

			var _loop = function _loop(year) {
				selected = date.getFullYear() === year;
				props = {
					key: year,
					onClick: function onClick() {
						date.setFullYear(year);
						_this5.props.onSelect(date);
					}
				};
				if (selected) {
					props.className = 'selected';
					props.ref = 'selected';
				}
				years.push(_react2.default.createElement(
					'div',
					props,
					year
				));
			};

			for (var year = minYear; year <= maxYear; year++) {
				_loop(year);
			}
			return _react2.default.createElement(
				'div',
				{ className: 'calendar-year' },
				years
			);
		}
	}]);
	return CalendarYear;
}(_react.Component);

var CalendarMonth = function (_Component4) {
	(0, _inherits3.default)(CalendarMonth, _Component4);

	function CalendarMonth() {
		(0, _classCallCheck3.default)(this, CalendarMonth);
		return (0, _possibleConstructorReturn3.default)(this, (CalendarMonth.__proto__ || (0, _getPrototypeOf2.default)(CalendarMonth)).apply(this, arguments));
	}

	(0, _createClass3.default)(CalendarMonth, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.scrollToSelectedYear();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.scrollToSelectedYear();
		}
	}, {
		key: 'scrollToSelectedYear',
		value: function scrollToSelectedYear() {
			var selected = this.refs.selected;

			if (selected === undefined) {
				return;
			}
			var container = (0, _reactDom.findDOMNode)(this);
			var node = (0, _reactDom.findDOMNode)(selected);

			var containerHeight = container.clientHeight;
			var nodeHeight = node.clientHeight || 32;

			container.scrollTop = node.offsetTop + nodeHeight / 2 - containerHeight / 2;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this7 = this;

			var date = !!this.props.selected ? this.props.selected : this.props.view;
			var selected = void 0;
			var props = void 0;
			return _react2.default.createElement(
				'div',
				{ className: 'calendar-month' },
				months.map(function (month, i) {
					selected = date.getMonth() === i;
					props = {
						key: i,
						onClick: function onClick() {
							date.setMonth(i);
							_this7.props.onSelect(date);
						}
					};
					if (selected) {
						props.className = 'selected';
						props.ref = 'selected';
					}
					return _react2.default.createElement(
						'div',
						props,
						month
					);
				})
			);
		}
	}]);
	return CalendarMonth;
}(_react.Component);

var CalendarDay = function (_Component5) {
	(0, _inherits3.default)(CalendarDay, _Component5);

	function CalendarDay(props) {
		(0, _classCallCheck3.default)(this, CalendarDay);
		return (0, _possibleConstructorReturn3.default)(this, (CalendarDay.__proto__ || (0, _getPrototypeOf2.default)(CalendarDay)).call(this, props));
	}

	(0, _createClass3.default)(CalendarDay, [{
		key: 'onMove',
		value: function onMove(view, isForward) {
			this.refs.weeks.moveTo(view, isForward);
		}
	}, {
		key: 'onTransitionEnd',
		value: function onTransitionEnd() {
			this.refs.monthHeader.enable();
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'calendar-day clearfix' },
				_react2.default.createElement(MonthHeader, {
					ref: "monthHeader",
					view: this.props.view,
					selected: this.props.selected,
					onMove: this.onMove.bind(this),
					minDate: this.props.minDate,
					maxDate: this.props.maxDate
				}),
				_react2.default.createElement(WeekHeader, null),
				_react2.default.createElement(Weeks, {
					ref: "weeks",
					view: this.props.view,
					selected: this.props.selected,
					onTransitionEnd: this.onTransitionEnd.bind(this),
					onSelect: this.props.onSelect,
					minDate: this.props.minDate,
					maxDate: this.props.maxDate
				})
			);
		}
	}]);
	return CalendarDay;
}(_react.Component);

var MonthHeader = function (_Component6) {
	(0, _inherits3.default)(MonthHeader, _Component6);

	function MonthHeader(props) {
		(0, _classCallCheck3.default)(this, MonthHeader);

		var _this9 = (0, _possibleConstructorReturn3.default)(this, (MonthHeader.__proto__ || (0, _getPrototypeOf2.default)(MonthHeader)).call(this, props));

		var selected = props.selected,
		    view = props.view;

		_this9.state = {
			view: DateUtilities.clone(!!selected ? selected : view),
			enabled: true
		};
		return _this9;
	}

	(0, _createClass3.default)(MonthHeader, [{
		key: 'moveBackward',
		value: function moveBackward() {
			var view = DateUtilities.clone(this.state.view);
			view.setMonth(view.getMonth() - 1);
			this.move(view, false);
		}
	}, {
		key: 'moveForward',
		value: function moveForward() {
			var view = DateUtilities.clone(this.state.view);
			view.setMonth(view.getMonth() + 1);
			this.move(view, true);
		}
	}, {
		key: 'move',
		value: function move(view, isForward) {
			if (!this.state.enabled) return;

			this.setState({
				view: view,
				enabled: false
			});

			this.props.onMove(view, isForward);
		}
	}, {
		key: 'enable',
		value: function enable() {
			this.setState({ enabled: true });
		}
	}, {
		key: 'render',
		value: function render() {
			var enabled = this.state.enabled;
			var MonthAndYear = DateUtilities.toMonthAndYearString(this.state.view);

			return _react2.default.createElement(
				'div',
				{ className: 'month-header' },
				_react2.default.createElement(_Button2.default, { raised: true, icon: 'keyboard_arrow_left', onClick: this.moveBackward.bind(this),
					isCenter: true, className: (0, _classNames2.default)({ disabled: !enabled }) }),
				_react2.default.createElement(
					'span',
					null,
					MonthAndYear.months + ' ' + MonthAndYear.year
				),
				_react2.default.createElement(_Button2.default, { raised: true, icon: 'keyboard_arrow_right', onClick: this.moveForward.bind(this),
					isCenter: true, className: (0, _classNames2.default)({ disabled: !enabled }) })
			);
		}
	}]);
	return MonthHeader;
}(_react.Component);

var WeekHeader = function (_Component7) {
	(0, _inherits3.default)(WeekHeader, _Component7);

	function WeekHeader() {
		(0, _classCallCheck3.default)(this, WeekHeader);
		return (0, _possibleConstructorReturn3.default)(this, (WeekHeader.__proto__ || (0, _getPrototypeOf2.default)(WeekHeader)).apply(this, arguments));
	}

	(0, _createClass3.default)(WeekHeader, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'week-header' },
				days.map(function (day) {
					return _react2.default.createElement(
						'span',
						{ key: day },
						day
					);
				})
			);
		}
	}]);
	return WeekHeader;
}(_react.Component);

var Weeks = function (_Component8) {
	(0, _inherits3.default)(Weeks, _Component8);

	function Weeks(props) {
		(0, _classCallCheck3.default)(this, Weeks);

		var _this11 = (0, _possibleConstructorReturn3.default)(this, (Weeks.__proto__ || (0, _getPrototypeOf2.default)(Weeks)).call(this, props));

		var selected = props.selected,
		    view = props.view;

		_this11.state = {
			view: DateUtilities.clone(!!selected ? selected : view),
			other: DateUtilities.clone(!!selected ? selected : view),
			sliding: null
		};
		return _this11;
	}

	(0, _createClass3.default)(Weeks, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			(0, _reactDom.findDOMNode)(this.refs.current).addEventListener("transitionend", this.onTransitionEnd.bind(this));
		}
	}, {
		key: 'onTransitionEnd',
		value: function onTransitionEnd() {
			this.setState({
				sliding: null,
				view: DateUtilities.clone(this.state.other)
			});

			this.props.onTransitionEnd();
		}
	}, {
		key: 'moveTo',
		value: function moveTo(view, isForward) {
			this.setState({
				sliding: isForward ? "left" : "right",
				other: DateUtilities.clone(view)
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var sliding = this.state.sliding;

			return _react2.default.createElement(
				'div',
				{ className: 'weeks' },
				_react2.default.createElement(
					'div',
					{ ref: 'current',
						className: (0, _classNames2.default)('current', sliding ? "sliding " + sliding : "") },
					this.renderWeeks(this.state.view)
				),
				_react2.default.createElement(
					'div',
					{ ref: 'other',
						className: (0, _classNames2.default)('other', sliding ? "sliding " + sliding : "") },
					this.renderWeeks(this.state.other)
				)
			);
		}
	}, {
		key: 'renderWeeks',
		value: function renderWeeks(view) {
			var starts = Weeks.getWeekStartDates(view),
			    month = starts[1].getMonth();
			var _props4 = this.props,
			    selected = _props4.selected,
			    onSelect = _props4.onSelect,
			    minDate = _props4.minDate,
			    maxDate = _props4.maxDate;

			return starts.map(function (start, key) {
				return _react2.default.createElement(Week, {
					key: key, start: start, month: month,
					selected: selected, view: view, onSelect: onSelect, minDate: minDate, maxDate: maxDate
				});
			});
		}
	}], [{
		key: 'getWeekStartDates',
		value: function getWeekStartDates(view) {
			view.setDate(1);
			view = DateUtilities.moveToDayOfWeek(DateUtilities.clone(view), 1);

			var current = DateUtilities.clone(view);
			current.setDate(current.getDate() + 7);

			var starts = [view],
			    month = current.getMonth();

			while (current.getMonth() === month) {
				starts.push(DateUtilities.clone(current));
				current.setDate(current.getDate() + 7);
			}

			return starts;
		}
	}]);
	return Weeks;
}(_react.Component);

var Week = function (_Component9) {
	(0, _inherits3.default)(Week, _Component9);

	function Week() {
		(0, _classCallCheck3.default)(this, Week);
		return (0, _possibleConstructorReturn3.default)(this, (Week.__proto__ || (0, _getPrototypeOf2.default)(Week)).apply(this, arguments));
	}

	(0, _createClass3.default)(Week, [{
		key: 'onSelect',
		value: function onSelect(day) {
			!this.isDisabled(day) && this.props.onSelect(day);
		}
	}, {
		key: 'isDisabled',
		value: function isDisabled(day) {
			var _props5 = this.props,
			    minDate = _props5.minDate,
			    maxDate = _props5.maxDate;

			return minDate && DateUtilities.isBefore(day, minDate) || maxDate && DateUtilities.isAfter(day, maxDate);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this13 = this;

			var _props6 = this.props,
			    start = _props6.start,
			    month = _props6.month,
			    selected = _props6.selected,
			    view = _props6.view;

			var days = Week.buildDays(start);
			return _react2.default.createElement(
				'div',
				{ className: 'week' },
				days.map(function (day, i) {
					return _react2.default.createElement(
						'div',
						{
							key: i,
							onClick: _this13.onSelect.bind(_this13, day),
							className: (0, _classNames2.default)('day', {
								today: DateUtilities.isSameDay(day, new Date()),
								otherMonth: month !== day.getMonth(),
								selected: selected && DateUtilities.isSameDay(day, !!selected ? selected : view),
								disabled: _this13.isDisabled(day)
							})
						},
						DateUtilities.toDayOfMonthString(day)
					);
				})
			);
		}
	}], [{
		key: 'buildDays',
		value: function buildDays(start) {
			var days = [DateUtilities.clone(start)],
			    clone = DateUtilities.clone(start),
			    i = void 0;
			for (i = 1; i <= 6; i++) {
				clone = DateUtilities.clone(clone);
				clone.setDate(clone.getDate() + 1);
				days.push(clone);
			}
			return days;
		}
	}]);
	return Week;
}(_react.Component);

exports.default = DatePicker;
//# sourceMappingURL=DatePicker.js.map
