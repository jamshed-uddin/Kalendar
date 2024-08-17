import React from "react";
import useData from "../hooks/useData";
import SingleEvent from "./SingleEvent";
import eventStyles from "../styles/event.module.css";
import { format, isSameDay, isWithinInterval } from "date-fns";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";

const { eventsHeader } = eventStyles;

const Events = () => {
  const { events, selectedDate } = useData();
  const filteredEvents = events.filter(
    (event) =>
      isWithinInterval(selectedDate, {
        start: event.startDatetime,
        end: event.endDatetime,
      }) || isSameDay(selectedDate, event.startDatetime)
  );

  return (
    <div>
      <h3 className={eventsHeader}>
        Events on {format(selectedDate, "MMMM dd, yyyy")}
      </h3>

      <div>
        {filteredEvents.length ? (
          filteredEvents.map((event, index) => (
            <SingleEvent key={index} event={event} />
          ))
        ) : (
          <p className="flex-class">
            {" "}
            <span>
              <CalendarDateRangeIcon className="icon" />
            </span>
            <span>No events</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Events;
