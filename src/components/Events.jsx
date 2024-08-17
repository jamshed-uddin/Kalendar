import React from "react";
import useData from "../hooks/useData";
import SingleEvent from "./SingleEvent";
import eventStyles from "../styles/event.module.css";
import { format, isWithinInterval } from "date-fns";

const { eventsHeader } = eventStyles;

const Events = () => {
  const { events, selectedDate } = useData();
  const filteredEvents = events.filter((event) =>
    isWithinInterval(selectedDate, {
      start: event.startDatetime,
      end: event.endDatetime,
    })
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
          <span>No events </span>
        )}
      </div>
    </div>
  );
};

export default Events;
