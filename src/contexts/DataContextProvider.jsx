import { isSameDay, isWithinInterval, startOfToday } from "date-fns";
import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext({});

const localStorageEvents = JSON.parse(localStorage.getItem("events"));

const DataContextProvider = ({ children }) => {
  const [events, setEvents] = useState(localStorageEvents || []);
  const [selectedDate, setSelectedDate] = useState(startOfToday());

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const getEvents = async (tag = "All", selectedDate) => {
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

    return filteredEvents;
  };

  const addEvent = async (body) => {
    try {
      setEvents((prev) => [...prev, body]);
    } catch (error) {
      throw error;
    }
  };

  const getSingleEvent = async (id) => {
    const singleEvent = events.find((event) => event.id === id);
    return singleEvent;
  };

  const updateEvent = async (id, body) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, ...body } : event))
    );
  };

  const deleteEvent = async (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const value = {
    events,
    setEvents,
    addEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    selectedDate,
    setSelectedDate,
    getSingleEvent,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
