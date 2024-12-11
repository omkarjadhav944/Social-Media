import { useContext, useRef } from "react";
import  { PostList } from "../store/post-liststore";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const userIdElement = useRef();
  const titleElement = useRef();
  const bodyElement = useRef();
  const reactionElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const userid = userIdElement.current.value;
    const title = titleElement.current.value;
    const body = bodyElement.current.value;
    const reaction = reactionElement.current.value;
    const tags = tagsElement.current.value.split(" ");
    userIdElement.current.value = "";
    titleElement.current.value = " ";
    bodyElement.current.value = " ";
    reactionElement.current.value = " ";
    tagsElement.current.value = " ";

    addPost(userid, title, body, reaction, tags);
  };
  return (
    <form className="createpost" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter your User Id here
        </label>
        <input
          ref={userIdElement}
          type="text"
          placeholder="Your User Id"
          className="form-control"
          id="userId"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          ref={titleElement}
          type="text"
          placeholder="How are you feeling today!"
          className="form-control"
          id="title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          ref={bodyElement}
          rows="8"
          type="text"
          placeholder="Tell us more about it"
          className="form-control"
          id="body"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="reaction" className="form-label">
          Number of Reactions
        </label>
        <input
          ref={reactionElement}
          type="text"
          placeholder="How many people reacted to this post"
          className="form-control"
          id="reaction"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your #HashTags here
        </label>
        <input
          ref={tagsElement}
          type="text"
          placeholder="Please enter tags using space"
          className="form-control"
          id="tags"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
