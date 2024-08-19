import React, { useEffect, useState } from "react";
import useData from "../hooks/useData";
import SingleEvent from "./SingleEvent";
import eventStyles from "../styles/event.module.css";
import { format, isDate, isSameDay, isWithinInterval } from "date-fns";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";

const { eventsHeader } = eventStyles;
const tagsArr = [
  "All",
  "Work",
  "Personal",
  "Health",
  "Social",
  "Meeting",
  "Appointment",
  "Family",
  "Reminder",
  "Holiday",
  "Fitness",
];

const Events = () => {
  const { events, selectedDate, getEvents } = useData();
  const [tag, setTag] = useState("All");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState(false);

  useEffect(() => {
    // loading filtered events from local state regardless the api response(success or failure)
    const loadFilteredEvents = () => {
      // filtering events and setting to event state
      const filteredEvents = events.filter((event) => {
        const isDateMatch =
          isWithinInterval(selectedDate, {
            start: event.startDatetime,
            end: event.endDatetime,
          }) || isSameDay(selectedDate, event.startDatetime);

        if (tag === "All") {
          return isDateMatch;
        } else {
          return isDateMatch && event.tag === tag;
        }
      });
      setFilteredEvents(filteredEvents);
    };

    setEventsLoading(true);
    const loadEvents = async () => {
      try {
        const events = await getEvents(tag, selectedDate);
        loadFilteredEvents();
        setEventsLoading(false);
      } catch (error) {
        toast.error("Failed to load events");
        loadFilteredEvents();
        setEventsError(true);
        setEventsLoading(false);
      }
    };

    loadEvents();
  }, [tag, selectedDate, events, getEvents]);

  return (
    <div>
      <Toaster></Toaster>
      <div className={eventsHeader}>
        <h3>
          Events on <br /> {format(selectedDate, "MMMM dd, yyyy")}
        </h3>
        <label style={{ display: "none" }} htmlFor="tag">
          Tags
        </label>
        <select
          disabled={eventsLoading}
          name="tag"
          id="tag"
          onChange={(e) => setTag(e.target.value)}
          defaultValue={tag}
          defaultChecked={tag}
          required
        >
          {tagsArr.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div>
        {eventsLoading ? (
          <p>Loading...</p>
        ) : filteredEvents.length ? (
          filteredEvents.map((event, index) => (
            <SingleEvent key={index} event={event} />
          ))
        ) : (
          <p className="flex-class">
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
