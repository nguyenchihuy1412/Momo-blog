import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./sidebar.css";

export default function Sidebar() {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await axios.get("https://momo-blog.herokuapp.com/api/categories");
        setCat(res.data.cats);
      } catch (error) {
        console.log("Error fetching categories");
      }
    };
    fetchCat();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://scontent.fhan4-2.fna.fbcdn.net/v/t1.6435-9/98445890_922454594867724_5918280387733225472_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=aS5syEqDsWkAX_ny1wy&_nc_ht=scontent.fhan4-2.fna&oh=00_AT8eRoAvoMvC5sMetmxX6jxI9I3I8kVIZwuVRW7kd3iyPg&oe=626AEB76"
          alt=""
        />
        <p>
          I am a final year student with a GPA of 8.7/10, I am an open person,
          quick to adapt to new environments and not afraid of difficulties.
        </p>
        <p>
          Have a great passion for coding, good self-study and problem-solving
          ability. Self-learning new languages and technologies is my passion (I
          taught myself basic Nodejs & Express for 3 weeks).
        </p>
        <p></p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cat.map((cat, index) => {
            return (
              <li key={index} className="sidebarListItem">
                <Link className="link" to={`/posts?cat=${cat.name}`}>
                  {cat.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW ME</span>
        <div className="sidebarSocial">
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
      </div>
    </div>
  );
}
