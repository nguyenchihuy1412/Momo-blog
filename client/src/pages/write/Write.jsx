import { useContext, useState } from "react";
import axios from "axios";
import "boxicons";
import "./write.css";
import { Context } from "../../store/Context";

export default function Write() {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.photo = fileName;
      console.log(newPost);

      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log("Internal server error");
      }
    }

    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data.post._id);
      alert(res.data.message);
    } catch (error) {
      alert("failed create post");
    }
  };

  return (
    <div className="write">
      {file && (
        <img
          className="writeImg"
          src={
            URL.createObjectURL(file) ||
            "https://wallpapercave.com/wp/wp2819765.jpg"
          }
          alt={title}
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon">
              <box-icon name="upload"></box-icon>
            </i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Write something about To Love Ru..."
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        {console.log(title, desc, file)}
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
