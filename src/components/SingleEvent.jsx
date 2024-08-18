import { format, parseISO } from "date-fns";
import eventsStyles from "../styles/event.module.css";
import { CalendarDateRangeIcon, TagIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import EventDates from "./EventDates";

const { singleEvent } = eventsStyles;
const SingleEvent = ({ event }) => {
  const { title, tag } = event;

  return (
    <Link to={`/event/${event?.id}`}>
      <div className={singleEvent}>
        <div>
          <CalendarDateRangeIcon className="icon" />
        </div>
        <div>
          <h4>{title?.length > 30 ? title?.slice(0, 30) + "..." : title}</h4>
          {tag && (
            <p>
              <TagIcon
                style={{ width: "16px", height: "16px", display: "inline" }}
              />{" "}
              {tag}
            </p>
          )}
          <div style={{ fontSize: "0.9rem", marginTop: "0.3rem" }}>
            <EventDates
              endDateTime={event?.endDatetime}
              startDateTime={event?.startDatetime}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleEvent;
