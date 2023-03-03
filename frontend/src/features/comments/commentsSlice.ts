import {CommentWithUser} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createComment, fetchComments} from "./commentsThunks";
import {RootState} from "../../app/store";

interface CommentsState {
  items: CommentWithUser[];
  fetching: boolean;
  creating: boolean;
}

const initialState: CommentsState = {
  items: [],
  fetching: false,
  creating: false,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, {payload: comments}) => {
      state.fetching = false;
      state.items = comments;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.fetching = false;
    });

    builder.addCase(createComment.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createComment.fulfilled, (state) => {
      state.creating = false;
    });
    builder.addCase(createComment.rejected, (state) => {
      state.creating = false;
    });
  }
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentFetching = (state: RootState) => state.comments.fetching;
export const selectCommentCreating = (state: RootState) => state.comments.creating;
