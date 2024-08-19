import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useData from "../hooks/useData";
import EventDates from "../components/EventDates";

import eventDetailStyle from "../styles/eventDetail.module.css";
import { PencilIcon, TagIcon, TrashIcon } from "@heroicons/react/24/outline";
import ConfirmModal from "../components/ConfirmModal";
import LoadingOrError from "../components/LoadingOrError";

const {
  eventDetailContainer,
  eventDetailHeader,
  modalButtons,
  deleteBtn,
  cancel,
  eventDates,
} = eventDetailStyle;
const EventDetail = () => {
  const { id } = useParams();
  const { events, setEvents, getSingleEvent, deleteEvent } = useData();
  const [eventLoading, setEventLoading] = useState(false);
  const [eventsError, setEventsError] = useState(false);

  const [eventDetail, setEventDetail] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // loading event from local state regardless the api response
    const loadEventFromLocal = () => {
      const singleEvent = events.find((event) => event.id === id);
      setEventDetail(singleEvent);
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
        setEventsError(true);
      }
    };
    loadEvent();
  }, [events, getSingleEvent, id]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteEventHandler = async () => {
    try {
      await deleteEvent(id);
      closeModal();
      setEvents((prev) => prev.filter((event) => event.id !== id));
      navigate("/", { replace: true });
    } catch (error) {
      closeModal();
      setEvents((prev) => prev.filter((event) => event.id !== id));
      navigate("/", { replace: true });
    }
  };

  if (eventLoading) {
    return <LoadingOrError useFor="loading" />;
  }

  // if (eventsError) {
  //   return <LoadingOrError useFor="error" />;
  // }

  return (
    <div className={eventDetailContainer}>
      <ConfirmModal isOpen={isModalOpen} closeModal={closeModal}>
        <div>
          <h3>Do you want to delete this event?</h3>

          <div className={modalButtons}>
            <button className={cancel} onClick={closeModal}>
              Cancel
            </button>
            <button className={deleteBtn} onClick={deleteEventHandler}>
              Delete
            </button>
          </div>
        </div>
      </ConfirmModal>
      <div className={eventDetailHeader}>
        <h1>{eventDetail?.title}</h1>
        <div>
          <Link to={`/event/edit/${id}`}>
            <PencilIcon className="icon" />
          </Link>

          <button onClick={() => setIsModalOpen(true)}>
            <TrashIcon className="icon" />
          </button>
        </div>
      </div>
      {eventDetail?.tag && (
        <h3>
          <TagIcon
            style={{ width: "16px", height: "16px", display: "inline" }}
          />{" "}
          {eventDetail?.tag}
        </h3>
      )}

      <div className={eventDates}>
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
