import { useContext, useRef } from "react";
import axios from "axios";
import { Context } from "../../store/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleLogin = async () => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value.toLowerCase(),
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      alert(res.data.message);
    } catch (error) {
      alert("Something Went Wrong, try again!!!")
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <div className="loginFormWrapper">
        <span className="loginTitle">Login</span>
        <form className="loginForm">
          <label>Username</label>
          <input
            className="loginInput"
            type="text"
            placeholder="Enter your username..."
            ref={userRef}
          />
          <label>Password</label>
          <input
            className="loginInput"
            type="password"
            placeholder="Enter your password..."
            ref={passwordRef}
          />
        </form>
        <div className="loginBtnGroup">
          <button
            className="loginButton"
            onClick={handleLogin}
            disabled={isFetching}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
