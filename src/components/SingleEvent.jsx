import { format, parseISO } from "date-fns";
import eventsStyles from "../styles/event.module.css";

const { singleEvent } = eventsStyles;
const SingleEvent = ({ event }) => {
  const { name } = event;
  const startDateTime = parseISO(event.startDatetime);
  const endDateTime = parseISO(event.endDatetime);
  return (
    <div className={singleEvent}>
      <div></div>
      <div>
        <h4>{name}</h4>
        <p>
          <time dateTime={startDateTime}>
            {format(startDateTime, "h:mm a")}
          </time>
          {" - "}
          <time dateTime={endDateTime}>{format(endDateTime, "h:mm a")}</time>
        </p>
      </div>
    </div>
  );
};

export default SingleEvent;
