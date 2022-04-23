import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../post/Post";
import "./posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("https://momo-blog.herokuapp.com/api/posts" + search.toLowerCase());
        setPosts(res.data.posts);
      } catch (error) {
        console.log("Error fetching posts");
      }
    };
    fetchPosts();
  }, [search]);

  return (
    <div className="posts">
      {posts.map((post, index) => (
        <Post
          key={post._id}
          title={post.title}
          paragraph={post.desc}
          img={post.photo}
          createdAt={new Date(post.createdAt).toDateString()}
          categories={post.categories}
          id={post._id}
        />
      ))}
    </div>
  );
}
