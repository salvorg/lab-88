import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {PostType} from "../../types";
import {createPost, fetchPosts} from "./postsThunks";

interface PostsState {
  items: PostType[];
  creating: boolean;
  fetching: boolean;
}

const initialState: PostsState = {
  items: [],
  creating: false,
  fetching: false,
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
  }
});

export const postsReducer = postsSlice.reducer;

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsCreating = (state: RootState) => state.posts.creating;
export const selectPostsFetching = (state: RootState) => state.posts.fetching;