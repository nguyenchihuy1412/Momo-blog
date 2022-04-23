import { useState } from "react";
import axios from "axios";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleRegister = async () => {
    setError(false);
    try {
      const res = await axios.post("https://momo-blog.herokuapp.com/api/auth/register", {
        username,
        password,
        email,
      });
      console.log(res.data);
      alert(res.data.message);
      res.data.message && window.location.replace("/login");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="register">
      <div className="registerFormWrapper">
        <span className="registerTitle">Register</span>
        <form className="registerForm">
          <label>Username</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter your username..."
            value={username}
            onChange={(event) => setUsername(event.target.value.toLowerCase())}
          />
          <label>Email</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter your email..."
            value={email}
            onChange={(event) => setEmail(event.target.value.toLowerCase())}
          />
          <label>Password</label>
          <input
            className="registerInput"
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </form>
        <div className="registerBtnGroup">
          {/* <button className="registerLoginButton" disabled="true">Login</button> */}
          <button className="registerButton" onClick={handleRegister}>
            Register
          </button>
        </div>
        {error && (
          <p style={{ color: "red", textAlign: "center", margin: "5px 0 0 0" }}>
            Something went wrong, try again!!!
          </p>
        )}
      </div>
    </div>
  );
}
