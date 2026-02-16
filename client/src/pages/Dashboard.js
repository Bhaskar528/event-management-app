import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [data, setData] = useState({ upcoming: [], past: [] });

  useEffect(() => {
    API.get("/user/dashboard").then(res => {
      setData({
        upcoming: res.data.upcoming || [],
        past: res.data.past || []
      });
    });
  }, []);

  return (
    <div>
      <h2>Upcoming</h2>
      {data.upcoming.map(r => <p key={r._id}>{r.eventId.name}</p>)}

      <h2>Past</h2>
      {data.past.map(r => <p key={r._id}>{r.eventId.name}</p>)}
    </div>
  );
}

export default Dashboard;