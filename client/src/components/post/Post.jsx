import { Link } from "react-router-dom";
import "./post.css";

export default function Post({
  id,
  img,
  title,
  paragraph,
  createdAt,
  categories,
}) {
  return (
    <div className="post">
      <Link to={`/post/${id}`} className="link">
        <div className="postImgWrapper">
          {img && (
            <img
              className="postImg"
              src={`https://momo-blog.herokuapp.com/images/${img}`}
              alt=""
            />
          )}
        </div>
      </Link>
      <div className="postInfo">
        <div className="postCats">
          {categories &&
            categories.map((cat, index) => (
              <span key={index} className="postCat">
                <Link className="link" to={`/posts?cat=${cat}`}>
                  {cat}
                </Link>
              </span>
            ))}
        </div>
        <span className="postTitle">
          <Link to={`/post/${id}`} className="link">
            {title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{createdAt}</span>
      </div>
      <p className="postDesc">{paragraph}</p>
    </div>
  );
}
