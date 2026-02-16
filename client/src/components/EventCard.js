import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
      <h3>{event.name}</h3>
      <p>{event.location}</p>
      <p>{new Date(event.dateTime).toLocaleString()}</p>

      <Link to={`/event/${event._id}`}>View Details</Link>
    </div>
  );
}

export default EventCard;