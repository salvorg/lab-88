import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {Post} from "../../types";
import {createPost} from "./postsThunks";

interface PostsState {
  items: Post[];
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
  }
});

export const postsReducer = postsSlice.reducer;

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsCreating = (state: RootState) => state.posts.creating;
export const selectPostsFetching = (state: RootState) => state.posts.fetching;