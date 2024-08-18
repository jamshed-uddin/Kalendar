import { format, isSameDay, isSameMonth, parseISO } from "date-fns";

const EventDates = ({ startDateTime, endDateTime }) => {
  console.log(startDateTime);
  console.log(endDateTime);

  const startDatetime = parseISO(startDateTime);
  const endDatetime = parseISO(endDateTime);

  return (
    <div>
      <time dateTime={format(startDatetime, "yyyy-MM-dd")}>
        {format(startDatetime, "MMM dd, h:mm a")}
      </time>
      {" - "}
      <time dateTime={format(endDatetime, "yyyy-MM-dd")}>
        {format(endDatetime, "MMM dd, h:mm a")}
      </time>
    </div>
  );
};

export default EventDates;
