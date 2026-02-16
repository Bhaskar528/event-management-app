import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({ name:"", email:"", phone:"" });

  const fetchEvent = async () => {
    const res = await API.get("/events");
    const e = res.data.events.find(ev => ev._id === id);
    setEvent(e);
  };

  useEffect(() => { fetchEvent(); }, [id]);

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!form.name || !form.email || !form.phone) {
      alert("All fields required"); return false;
    }
    if (!emailRegex.test(form.email)) {
      alert("Invalid email"); return false;
    }
    if (!phoneRegex.test(form.phone)) {
      alert("Phone must be 10 digits"); return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      await API.post(`/events/${id}/register`, form);
      alert("Registered!");
      fetchEvent();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed");
    }
  };

  const handleCancel = async () => {
    try {
      await API.delete(`/events/${id}/cancel`, {
        data: { email: form.email }
      });
      alert("Cancelled");
      fetchEvent();
    } catch (err) {
      alert(err.response?.data?.msg || "Cancel failed");
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>{event.location}</p>
      <p>Seats left: {event.availableSeats}</p>

      <h3>Register</h3>

      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Phone" onChange={e=>setForm({...form,phone:e.target.value})}/>

      <button onClick={handleRegister}>Register</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default EventDetails;