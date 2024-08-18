import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useData from "../hooks/useData";
import EventDates from "../components/EventDates";
import { parseISO } from "date-fns";
import eventDetailStyle from "../styles/eventDetail.module.css";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const { eventDetailContainer, eventDetailHeader } = eventDetailStyle;
const EventDetail = () => {
  const { id } = useParams();
  const { getSingleEvent } = useData();
  const [eventLoading, setEventLoading] = useState(false);
  const [eventDetail, setEventDetail] = useState({});

  useEffect(() => {
    setEventLoading(true);
    const loadEvent = async () => {
      const event = await getSingleEvent(id);
      setEventDetail(event);
      setEventLoading(false);
    };
    loadEvent();
  }, [getSingleEvent, id]);

  if (eventLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={eventDetailContainer}>
      <div className={eventDetailHeader}>
        <h1>{eventDetail?.title}</h1>
        <div>
          <Link to={`/event/edit/${id}`}>
            <PencilIcon className="icon" />
          </Link>

          <button>
            <TrashIcon className="icon" />
          </button>
        </div>
      </div>
      <h3>{eventDetail?.tag || "work"}</h3>

      <div style={{ fontSize: "1.5rem" }}>
        {eventDetail?.startDatetime && eventDetail?.endDatetime && (
          <EventDates
            startDateTime={eventDetail?.startDatetime}
            endDateTime={eventDetail?.endDatetime}
          />
        )}
      </div>

      <p>{eventDetail?.description}</p>
    </div>
  );
};

export default EventDetail;
