import { format, parseISO } from "date-fns";
import eventsStyles from "../styles/event.module.css";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";

const { singleEvent } = eventsStyles;
const SingleEvent = ({ event }) => {
  const { name } = event;
  console.log(event);
  const startDateTime = parseISO(event.startDatetime);
  const endDateTime = parseISO(event.endDatetime);
  return (
    <div className={singleEvent}>
      <div>
        <CalendarDateRangeIcon className="icon" />
      </div>
      <div>
        <h4>{name}</h4>
        <p>
          <time dateTime={format(startDateTime, "yyyy-MM-dd")}>
            {format(startDateTime, "MMM dd")}
          </time>
          {" - "}
          <time dateTime={format(endDateTime, "yyyy-MM-dd")}>
            {format(endDateTime, "MMM dd")}
          </time>
        </p>
      </div>
    </div>
  );
};

export default SingleEvent;
