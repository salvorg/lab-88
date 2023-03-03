import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchPosts} from "./postsThunks";
import {selectPosts, selectPostsFetching} from "./postsSlice";
import PostItem from "./components/PostItem";
import {CircularProgress, Grid} from "@mui/material";

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const fetching = useAppSelector(selectPostsFetching);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  let form;

  if (posts.length > 0) {
    form = (posts.map(post => (
      <PostItem
        key={post._id}
        id={post._id}
        displayName={post.user.displayName}
        title={post.title}
        image={post.image}
        createdAt={post.createdAt}
      />
    )).reverse())
  } else {
    form = (<Grid item>There is no posts at all, please, add some posts to be happy</Grid>)
  }

  return (
    <Grid container flexDirection={"column"} spacing={2}>
      {fetching ? <CircularProgress sx={{margin: 2}}/> : form}
    </Grid>
  );
};

export default Posts;