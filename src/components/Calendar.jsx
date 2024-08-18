import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import calendarStyles from "../styles/calendar.module.css";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isWithinInterval,
  parse,
  startOfToday,
} from "date-fns";
import { useState } from "react";
import useData from "../hooks/useData";

const daysName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// styles ------
const {
  calendarHeader,
  daysNameHeader,
  daysContainer,
  dayCell,
  nextPrevCurrentDate,
  selectedCell,
  marker,
} = calendarStyles;

const Calendar = () => {
  const { selectedDate, setSelectedDate, events } = useData();
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMMM-yyyy"));
  const firstDayOfCurrentMonth = parse(currentMonth, "MMMM-yyyy", new Date());

  const daysOfMonth = eachDayOfInterval({
    start: firstDayOfCurrentMonth,
    end: endOfMonth(firstDayOfCurrentMonth),
  });

  const previousMonth = () => {
    const firstDayOfPreviousMonth = add(firstDayOfCurrentMonth, { months: -1 });

    setCurrentMonth(format(firstDayOfPreviousMonth, "MMMM-yyyy"));
  };

  const nextMonth = () => {
    const firstDayOfNextMonth = add(firstDayOfCurrentMonth, { months: 1 });

    setCurrentMonth(format(firstDayOfNextMonth, "MMMM-yyyy"));
  };
  console.log(daysOfMonth.at(2).toISOString());

  return (
    <div>
      {/* calendar header */}
      <div className={`${calendarHeader}`}>
        <h2 className="">Kalendar</h2>
        <div className={nextPrevCurrentDate}>
          <button type="button" onClick={previousMonth}>
            <ChevronLeftIcon className="icon" />
          </button>
          <h4>{format(firstDayOfCurrentMonth, "MMMM yyyy")}</h4>
          <button onClick={nextMonth} type="button">
            <ChevronRightIcon className="icon" />
          </button>
        </div>
      </div>

      {/* day name header */}
      <div className={daysNameHeader}>
        {daysName.map((dayName) => (
          <div key={dayName}>{dayName}</div>
        ))}
      </div>

      {/* days */}
      <div className={daysContainer}>
        {daysOfMonth.map((day, index) => (
          <div
            key={day.toString()}
            style={{ gridColumnStart: getDay(day) + 1 }}
          >
            <button
              className={`${dayCell} ${
                isEqual(day, selectedDate) && selectedCell
              }`}
              onClick={() => setSelectedDate(day?.toISOString())}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>

              <span
                className={`${
                  events.some(
                    (event) =>
                      isWithinInterval(day, {
                        start: event.startDatetime,
                        end: event.endDatetime,
                      }) || isSameDay(day, event.startDatetime)
                  ) && marker
                }`}
              >
                <span></span>
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
