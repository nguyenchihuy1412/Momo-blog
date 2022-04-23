import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/Context";
import "./topbar.css";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <div className="top">
      <div className="topLeft">
        <a href="https://toloveru.fandom.com/">
          <i className="bx bxl-facebook bx-tada"></i>
        </a>
        <a href="https://toloveru.fandom.com/">
          <i className="bx bxl-instagram bx-tada"></i>
        </a>
        <a href="https://toloveru.fandom.com/">
          <i className="bx bxl-tiktok bx-tada"></i>
        </a>
        <a href="https://toloveru.fandom.com/">
          <i className="bx bxl-twitter bx-tada"></i>
        </a>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/media">
              MEDIA
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/character">
              CHARACTER
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE POST
            </Link>
          </li>
          {user && (
            <li className="topListItem" onClick={handleLogout}>
              LOGOUT
            </li>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={
                user.profilePic ? `https://momo-blog.herokuapp.com/images/${user.profilePic}`
                : "https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png"
              }
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        {user && (
          <span style={{ marginRight: 15, color: "#db49ac", fontSize: "20px" }}>
            <Link className="link" to="/settings">
              Hi, {user && user.username}
            </Link>
          </span>
        )}
      </div>
    </div>
  );
}
