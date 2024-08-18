import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import addEventStyles from "../styles/addEvent.module.css";
import DatePicker from "react-datepicker";
import useData from "../hooks/useData";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
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

  const { selectedDate, setEvents, getSingleEvent, addEvent, updateEvent } =
    useData();
  const [eventLoading, setEventLoading] = useState(false);
  const [eventState, setEventState] = useState({
    title: "",
    startDatetime: selectedDate,
    endDatetime: selectedDate,
    tag: tagsArr.at(0),
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setEventLoading(true);
    const loadEvent = async () => {
      const event = await getSingleEvent(id);
      setEventState(event);
      setEventLoading(false);
    };
    loadEvent();
  }, [getSingleEvent, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventState((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, name) => {
    console.log(date);
    setEventState((prev) => {
      if (name === "startDatetime") {
        return { ...prev, startDatetime: date, endDatetime: date };
      }

      return { ...prev, [name]: date };
    });
  };

  const formatDate = (date) => {
    const rawDate = new Date(date);

    const formattedDate = format(rawDate, "yyyy-MM-dd'T'HH:mm");
    return formattedDate;
  };

  const submitEventForm = async (e) => {
    e.preventDefault();

    const newEvent = {
      ...eventState,
      id: uuidv4(),
      startDatetime: formatDate(eventState.startDatetime),
      endDatetime: formatDate(eventState.endDatetime),
    };

    try {
      if (id) {
        console.log("update");
        await updateEvent(id, eventState);
        return navigate("/", { replace: true });
      } else {
        console.log("add");
        await addEvent(eventState);
        return navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error("Something went wrong! Try again.");
    }
  };

  console.log(eventState);

  return (
    <div>
      <Toaster />
      <form onSubmit={submitEventForm}>
        {/* event form header */}
        <div className={eventFormHeader}>
          <div>
            <ArrowLeftIcon className="icon" />
          </div>
          <div>
            <button type="submit" className={saveButton}>
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
