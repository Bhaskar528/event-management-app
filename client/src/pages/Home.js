import { useEffect, useState } from "react";
import API from "../api";
import EventCard from "../components/EventCard";
import Filters from "../components/Filters";

function Home() {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState({});

  const buildQuery = params => {
    let q = "?";
    Object.keys(params).forEach(key => {
      if (params[key]) q += `${key}=${params[key]}&`;
    });
    return q;
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await API.get("/events" + buildQuery(query));
      setEvents(res.data.events || []);
    };
    fetch();
  }, [query]);

  return (
    <div className="container">
      <h2>All Events</h2>

      <Filters onFilter={setQuery} />

      {events.length === 0
        ? <p>No events found</p>
        : events.map(e => <EventCard key={e._id} event={e} />)}
    </div>
  );
}

export default Home;