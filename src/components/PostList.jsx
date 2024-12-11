import { useContext, useEffect, useState } from "react";
import { Post as Card } from "./Post";
import { PostList as postListData } from "../store/post-liststore";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, addInitialPosts } = useContext(postListData);
  // console.log(postList);

  // const [datafetch, setDataFetch] = useState(false);

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setFetching(true);
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        addInitialPosts(data.posts);
        setFetching(false);
      });

    return () => {
      console.log("cleaning up UseEffect.");
      controller.abort;
    };
  }, []);
  // useEffect(() => {
  //   setFetching(true);
  //   fetch("https://dummyjson.com/posts")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       addInitialPosts(data.posts);
  //       setFetching(false);
  //     });

  //   return () => {
  //     console.log("cleaning up useEffect");
  //   };
  // }, []);

  return (
    <>
      {fetching && <LoadingSpinner />}
      {!fetching && postList.length === 0 && <WelcomeMessage />}
      <div className="postlist">
        {!fetching &&
          postList.map((Post) => <Card key={Post.id} post={Post} />)}
      </div>
    </>
  );
};

export default PostList;
