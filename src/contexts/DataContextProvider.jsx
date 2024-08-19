import axios from "axios";
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
    const { data } = await axios.get(
      "https://kalendar.free.beeceptor.com/api/events"
    );

    return data;
  };

  const addEvent = async (body) => {
    const response = await axios.post(
      "https://kalendar.free.beeceptor.com/api/events",
      body
    );
    return response;
  };

  const getSingleEvent = async (id) => {
    const response = await axios.get(
      "https://kalendar.free.beeceptor.com/api/events/1234"
    );

    return response;
  };

  const updateEvent = async (id, body) => {
    const response = await axios.put(
      "https://kalendar.free.beeceptor.com/api/events/1234",
      body
    );

    return response;
  };

  const deleteEvent = async (id) => {
    const response = await axios.delete(
      "https://kalendar.free.beeceptor.com/api/events/1234"
    );
    return response;
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
