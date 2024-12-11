import { createContext, useCallback, useMemo, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  addInitialPosts: () => {},
  deletePost: () => {},
});

const postListReducer = (currpostList, action) => {
  let newPostList = currpostList;
  if (action.type === "DELETE_POST") {
    newPostList = currpostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currpostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = (userid, title, body, likes, dislikes, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: title,
        body: body,
        reactions: { likes, dislikes },
        userId: userid,
        tags: tags,
      },
    });
  };
  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  /*useMemo*/
  // const arr = [5, 3, 9, 6, 4];
  // const sortedarr = useMemo(() => arr.sort(), [arr]);
  // console.log(sortedarr);

  const deletePost = useCallback(
    (postId) => {
      dispatchPostList({
        type: "DELETE_POST",
        payload: {
          postId,
        },
      });
    },
    [dispatchPostList]
  );

  return (
    <PostList.Provider
      value={{
        postList,
        addInitialPosts,
        addPost,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
