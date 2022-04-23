import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../store/Context.js";
import axios from "axios";
import "./singlePost.css";

export default function SinglePost() {
  const { user } = useContext(Context);
  const { pathname } = useLocation();
  const pathId = pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/posts/${pathId}`);
        setPost(res.data.post);
        setTitle(res.data.post.title);
        setDesc(res.data.post.desc);
      } catch (error) {
        console.log("Failed to get post");
      }
    };
    getPost();
  }, [pathId]);

  const handleEdit = async () => {
    setUpdateMode(true);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`/posts/${pathId}`, {
          data: { username: user.username },
        });
        window.location.replace("/posts");
      } catch (error) {
        console.log("Failed to delete post");
      }
    }
    else {
      return;
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${pathId}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (error) {
      console.log("Failed to update post");
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img
            className="singlePostImg"
            src={`https://momo-blog.herokuapp.com/images/${post.photo}`}
            alt=""
          />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostUpdateInput"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <h1 className="singlePostTitle">
            {user && user.username === post.username && (
              <div className="singlePostEdit">
                <i className="singlePostIcon">
                  <box-icon name="edit" onClick={handleEdit}></box-icon>
                </i>
                <i className="singlePostIcon">
                  <box-icon name="trash" onClick={handleDelete}></box-icon>
                </i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode || <h3 className="singlePostTitle">{title}</h3>}
        {updateMode ? (
          <textarea
            className="singlePostUpdateTextArea"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <div className="singlePostDesc">{post.desc}</div>
        )}
        {updateMode && (
          <button className="writeSubmit" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
