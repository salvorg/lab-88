import React from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {Typography} from "@mui/material";
import {PostMutation} from "../../types";
import PostForm from "./components/PostForm";
import {createPost} from "./postsThunks";

const NewPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (postMutation: PostMutation) => {
      await dispatch(createPost(postMutation)).unwrap();
      navigate('/');
  };

  return (
    <>
      <Typography variant="h4" sx={{mb: 2}}>New post</Typography>
      <PostForm onSubmit={onFormSubmit}/>
    </>
  );
};

export default NewPost;