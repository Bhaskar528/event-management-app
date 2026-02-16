import { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", form);

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    navigate("/");
  } catch (err) {
    alert(err.response?.data?.msg || "Login failed");
  }
};



  return (
    <div>
      <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password:e.target.value})}/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;