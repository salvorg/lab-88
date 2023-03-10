import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {CircularProgress, Divider, Grid, Typography} from "@mui/material";
import {fetchOnePost} from "./postsThunks";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectPost, selectPostFetching} from "./postsSlice";
import dayjs from "dayjs";
import CommentForm from "../comments/CommentForm";
import {selectCommentCreating, selectCommentFetching, selectComments} from "../comments/commentsSlice";
import {createComment, fetchComments} from "../comments/commentsThunks";
import {CommentWithoutId} from "../../types";
import CommentItem from "../comments/CommentItem";
import {selectUser} from "../users/usersSlice";

const Post = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);
  const loadingPost = useAppSelector(selectPostFetching);
  const comments = useAppSelector(selectComments);
  const loadingComments = useAppSelector(selectCommentFetching);
  const creatingComment = useAppSelector(selectCommentCreating);
  const dateTime = dayjs(post?.createdAt).format('DD.MM.YYYY HH:mm:ss');
  const user = useAppSelector(selectUser);

  const onFormSubmit = async (comment: CommentWithoutId) => {
    await dispatch(createComment(comment));
    await dispatch(fetchComments(id));
  };

  useEffect(() => {
    dispatch(fetchOnePost(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  let commentsForm;

  if (comments.length) {
    commentsForm = (
      comments.map(comment => (
        <CommentItem key={comment._id} comment={comment}/>
      )).reverse());
  } else {
    commentsForm = (<h1>There is no comments</h1>)
  }

  return (
    <>
      {loadingPost ? <CircularProgress/> : (
        <Grid container direction={"column"}>
        <Grid item sx={{mb: 3}}>
          <Typography variant="h2">{post?.title}</Typography>
          <Typography fontSize={15} color="grey">{dateTime} by <strong>{post?.user.displayName}</strong></Typography>
        </Grid>
        <Grid item sx={{mb: 5}}>
          <Typography fontSize={25}>{post?.description}</Typography>
        </Grid>
        <Divider/>
        <Grid item sx={{mb: 5}}>
          <Typography variant="h5" color="primary.main" sx={{mt: 3}}>Add your comment:</Typography>
          {user ?
            (<CommentForm id={id} onSubmit={onFormSubmit} isLoading={creatingComment}/>)
            :
            (<h3 style={{color: "red"}}>???? ???????????????????????????????????? ???????????????????????? ???? ???????? ?????????????????? ??????????????????????!</h3>)
          }
        </Grid>
        <Grid item>
          <Typography variant="h5" color="primary.main">Comments:</Typography>
        </Grid>
        <Grid item container direction={"column"}>
          {loadingComments ? <CircularProgress/> : commentsForm}
        </Grid>
      </Grid>
      )}
    </>
  );
};

export default Post;