import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {PostType} from "../../types";
import {createPost, fetchOnePost, fetchPosts} from "./postsThunks";

interface PostsState {
  items: PostType[];
  post: null | PostType;
  creating: boolean;
  fetching: boolean;
  fetchingOne: boolean;
}

const initialState: PostsState = {
  items: [],
  post: null,
  creating: false,
  fetching: false,
  fetchingOne: false,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createPost.fulfilled, (state) => {
      state.creating = false;
    });
    builder.addCase(createPost.rejected, (state) => {
      state.creating = false;
    });
    builder.addCase(fetchPosts.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, {payload: posts}) => {
      state.fetching = false;
      state.items = posts;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.fetching = false;
    });
    builder.addCase(fetchOnePost.pending, (state) => {
      state.fetchingOne = true;
    });
    builder.addCase(fetchOnePost.fulfilled, (state, {payload: post}) => {
      state.fetchingOne = false;
      state.post = post;
    });
    builder.addCase(fetchOnePost.rejected, (state) => {
      state.fetchingOne = false;
    });
  }
});

export const postsReducer = postsSlice.reducer;

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsCreating = (state: RootState) => state.posts.creating;
export const selectPostsFetching = (state: RootState) => state.posts.fetching;
export const selectPostFetching = (state: RootState) => state.posts.fetchingOne;
export const selectPost = (state: RootState) => state.posts.post;