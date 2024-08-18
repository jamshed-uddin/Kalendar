import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import addEventStyles from "../styles/addEvent.module.css";
import DatePicker from "react-datepicker";
import useData from "../hooks/useData";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";

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

const AddEvent = () => {
  const { selectedDate } = useData();

  const [eventState, setEventState] = useState({
    title: "",
    startDatetime: selectedDate,
    endDatetime: selectedDate,
    tag: "",
    description: "",
  });

  console.log(selectedDate);
  console.log(eventState);
  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(value);

    setEventState((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, name) => {
    // const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm");
    console.log(date);
    setEventState((prev) => ({ ...prev, [name]: date }));
  };

  const submitEventForm = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
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
            placeholder="Add title"
            onChange={handleChange}
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
              selected={eventState.startDatetime}
              onChange={(date) => handleDateChange(date, "startDatetime")}
              value={eventState.startDatetime}
              timeInputLabel="Time:"
              dateFormat="EEE, dd MMM yyyy h:mm aa"
              showTimeInput
            />
          </div>

          <div>
            <label className={labelStyle} htmlFor="endDatetime">
              To
            </label>
            <DatePicker
              id="endDatetime"
              className={datePickerInput}
              selected={eventState.endDatetime}
              onChange={(date) => handleDateChange(date, "endDatetime")}
              value={eventState.endDatetime}
              timeInputLabel="Time:"
              dateFormat="EEE, dd MMM yyyy h:mm aa"
              showTimeInput
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
              defaultValue={eventState.tag}
              defaultChecked={eventState.tag}
            >
              <option value="personal">Personal</option>
              <option value="home">Home</option>
              <option value="work">Work</option>
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
