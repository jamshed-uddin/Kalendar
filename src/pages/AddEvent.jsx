import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import addEventStyles from "../styles/addEvent.module.css";
import DatePicker from "react-datepicker";
import useData from "../hooks/useData";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import toast, { Toaster } from "react-hot-toast";

const {
  eventFormHeader,
  saveButton,
  inputStyle,
  labelStyle,
  datePickerContainer,
  datePickerInput,
  selectInput,
  descriptionInput,
  titleAndSaveContainer,
} = addEventStyles;
const tagsArr = [
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

const AddEvent = () => {
  const { id } = useParams();

  const {
    events,
    selectedDate,
    setEvents,
    getSingleEvent,
    addEvent,
    updateEvent,
  } = useData();
  const [eventLoading, setEventLoading] = useState(false);
  const [addEventLoading, setAddEventLoading] = useState(false);
  const [eventState, setEventState] = useState({
    title: "",
    startDatetime: selectedDate,
    endDatetime: selectedDate,
    tag: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const loadEventFromLocal = () => {
      const singleEvent = events.find((event) => event.id === id);
      setEventState(singleEvent);
    };
    setEventLoading(true);
    const loadEvent = async () => {
      try {
        const response = await getSingleEvent(id);
        loadEventFromLocal();
        setEventLoading(false);
      } catch (error) {
        loadEventFromLocal();
        setEventLoading(false);
      }
    };
    loadEvent();
  }, [events, getSingleEvent, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventState((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, name) => {
    const formattedDate = date.toISOString();

    setEventState((prev) => {
      if (name === "startDatetime") {
        return {
          ...prev,
          startDatetime: formattedDate,
          endDatetime: formattedDate,
        };
      }

      return { ...prev, [name]: formattedDate };
    });
  };

  const submitEventForm = async (e) => {
    e.preventDefault();

    const newEvent = {
      ...eventState,
      id: uuidv4(),
    };

    // updating the event in local regardless the mock api response
    const updateEventInLocal = () => {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === id ? { ...event, ...eventState } : event
        )
      );
    };

    try {
      setAddEventLoading(true);
      // if id is true event form is in edit mode
      if (id) {
        await updateEvent(id, eventState);
        // updating local state
        updateEventInLocal();
        setAddEventLoading(false);
        return navigate("/", { replace: true });
      } else {
        await addEvent(newEvent);
        // updating local state
        setEvents((prev) => [...prev, newEvent]);
        setAddEventLoading(false);
        return navigate("/", { replace: true });
      }
    } catch (error) {
      // updating the local state even when there is an error in mock api call. remove when it's the real api
      if (id) {
        updateEventInLocal();
      } else {
        setEvents((prev) => [...prev, newEvent]);
      }
      setAddEventLoading(false);
      toast.error("Something went wrong! Try again.");
      navigate("/", { replace: true });
    }
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={submitEventForm}>
        {/* event form header */}
        <div className={eventFormHeader}>
          <div>
            <button type="button" onClick={() => navigate(-1)}>
              <ArrowLeftIcon className="icon" />
            </button>
          </div>
          <div>
            <button
              disabled={addEventLoading || eventLoading}
              type="submit"
              className={saveButton}
            >
              Save
            </button>
          </div>
        </div>

        {/* title */}
        <div className={titleAndSaveContainer}>
          <label className={labelStyle} htmlFor="title">
            Title
          </label>
          <input
            className={inputStyle}
            type="text"
            name="title"
            id="title"
            value={eventState.title}
            placeholder="Add title"
            onChange={handleChange}
            required
          />
        </div>

        {/* from to tag */}
        <div className={datePickerContainer}>
          <div>
            <label className={labelStyle} htmlFor="startDatetime">
              From
            </label>
            <DatePicker
              id="startDatetime"
              className={datePickerInput}
              selected={new Date(eventState.startDatetime)}
              onChange={(date) => handleDateChange(date, "startDatetime")}
              value={new Date(eventState.startDatetime)}
              timeInputLabel="Time:"
              dateFormat="EEE, dd MMM yyyy h:mm aa"
              showTimeInput
              minDate={new Date()}
            />
          </div>

          <div>
            <label className={labelStyle} htmlFor="endDatetime">
              To
            </label>
            <DatePicker
              id="endDatetime"
              className={datePickerInput}
              selected={new Date(eventState.endDatetime)}
              onChange={(date) => handleDateChange(date, "endDatetime")}
              value={new Date(eventState.endDatetime)}
              timeInputLabel="Time:"
              dateFormat="EEE, dd MMM yyyy h:mm aa"
              showTimeInput
              minDate={new Date(eventState.startDatetime)}
            />
          </div>

          <div>
            <label className={labelStyle} htmlFor="tag">
              Tag
            </label>
            <select
              className={selectInput}
              name="tag"
              id="tag"
              onChange={handleChange}
              value={eventState.tag}
              required
            >
              <option value="">Select tag</option>
              {tagsArr.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* description */}
        <div className={descriptionInput}>
          <label className={labelStyle} htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={eventState.description}
            onChange={handleChange}
            placeholder="Description"
            rows={5}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
