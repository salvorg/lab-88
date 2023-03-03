import {createAsyncThunk} from "@reduxjs/toolkit";
import {CommentType, CommentWithoutId, CommentWithUser} from "../../types";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";

export const fetchComments = createAsyncThunk<CommentWithUser[], string>(
  'comments/fetchAll',
  async (id) => {
    const response = await axiosApi.get<CommentWithUser[] | null>('/comments?post_id=' + id);

    if (response.data === null) {
      throw new Error('Not found');
    }

    return response.data;
  }
);

export const createComment = createAsyncThunk<void, CommentWithoutId, {state: RootState}>(
  'comments/create',
  async (comment, {getState}) => {
    const user = getState().users.user;

    if (user) {
      const commentData = {
        user: user._id,
        post: comment.postId,
        comment: comment.comment,
      }

      await axiosApi.post('/comments', commentData, {headers: {'Authorization': user.token}});
    } else {
      throw new Error('No user');
    }
  }
);