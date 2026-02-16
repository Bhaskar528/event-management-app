import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import { useNavigate } from "react-router-dom";

function RegisterButton({ event, isRegistered, refreshEvent }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      await API.post(`/events/${event._id}/register`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      refreshEvent();
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔒 Not logged in
  if (!user) {
    return (
      <button onClick={() => navigate("/login")}>
        Login to Register
      </button>
    );
  }

  // 🎫 Already registered
  if (isRegistered) {
    return (
      <button disabled style={{ background: "green", color: "white" }}>
        Already Registered
      </button>
    );
  }

  // ❌ Sold out
  if (event.availableSeats <= 0) {
    return <p style={{ color: "red" }}>Sold Out</p>;
  }

  // ✅ Register
  return (
    <button onClick={handleRegister} disabled={loading}>
      {loading ? "Registering..." : "Register Now"}
    </button>
  );
}

export default RegisterButton;