import { useContext } from "react";
import { TiDelete } from "react-icons/ti";
import { PostList } from "../store/post-liststore";

export const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);

  const likes = post.reactions.likes || 0;
  const dislikes = post.reactions.dislikes || 0;

  return (
    <div className="card post-card" style={{ width: " 10rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => {
              deletePost(post.id);
            }}
          >
            <TiDelete className="delete" />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="badge rounded-pill text-bg-primary hashtag mb-4"
          >
            {tag}
          </span>
        ))}

        <div className="alert alert-success reactions" role="alert">
          This post has been reacted by {likes + dislikes} people.
        </div>
      </div>
    </div>
  );
};
