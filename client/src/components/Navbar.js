import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: 10, background: "#eee" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;