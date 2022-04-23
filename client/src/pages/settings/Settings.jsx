import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../store/Context";
import axios from "axios";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const imgRef = useRef();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/users/" + user.id);
        setUsername(res.data.user.username);
        setEmail(res.data.user.email);
      } catch (error) {
        console.log("Get user failed!!!");
      }
    };
    getUser();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user.id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedUser.profilePic = fileName;

      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log("Error to uploaded file");
      }
    }

    try {
      const res = await axios.put("/users/update/" + user.id, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data.user });
      alert("User updated successfully, Please login again!!!");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log("Error to update user");
      console.log(error);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const LoadDefaultImage = (e) => {
    imgRef.current.src =
      "https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png";
  };

  const handleDeleteUser = () => {
    const deleteUser = async () => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        try {
          await axios.delete(`users/delete/${user.id}`, {
            data: { userId: user.id },
          });
          alert("User deleted successfully!!!");
          dispatch({ type: "LOGOUT" });
          window.location.replace("/");
        } catch (error) {
          alert("Error to delete user");
        }
      } else {
        return;
      }
    };
    deleteUser();
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleUpdate}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              onError={LoadDefaultImage}
              ref={imgRef}
              src={
                (file
                  ? URL.createObjectURL(file)
                  : `https://momo-blog.herokuapp.com/images/${user.profilePic}`) ||
                "https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png"
              }
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon">
                <box-icon name="user-plus"></box-icon>
              </i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username to update"
            name="name"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email to update"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password to update"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="settingsBtn">
            <button className="settingsSubmitButton" type="submit">
              Update
            </button>
          </div>
        </form>
        <button className="settingsDeleteButton" onClick={handleDeleteUser}>
          Delete
        </button>
      </div>
      <Sidebar />
    </div>
  );
}
