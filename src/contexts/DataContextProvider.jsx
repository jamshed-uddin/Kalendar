import { startOfToday } from "date-fns";
import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext({});

const localStorageEvents = JSON.parse(localStorage.getItem("events"));

const DataContextProvider = ({ children }) => {
  const [events, setEvents] = useState(localStorageEvents || []);
  const [selectedDate, setSelectedDate] = useState(startOfToday());

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const value = { events, setEvents, selectedDate, setSelectedDate };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
