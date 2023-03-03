import {createAsyncThunk} from "@reduxjs/toolkit";
import {PostType, PostMutation} from "../../types";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";

export const createPost = createAsyncThunk<void, PostMutation, {state: RootState}>(
  'posts/create',
  async (postMutation, {getState}) => {
    const user = getState().users.user;

    if (user) {
    const formData = new FormData();

    const keys = Object.keys(postMutation) as (keyof PostMutation)[];

    keys.forEach(key => {
      const value = postMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/posts', formData, {headers: {'Authorization': user.token}});
    } else {
      throw new Error('No user');
    }
  }
);

export const fetchPosts = createAsyncThunk<PostType[]>(
  'posts/fetchAll',
  async () => {
    const response = await axiosApi.get<PostType[]>('/posts');
    console.log(response.data);
    return response.data;
  }
);

export const fetchOnePost = createAsyncThunk<PostType, string>(
  'posts/fetchOne',
  async (postId) => {
    const response = await axiosApi.get<PostType | null>('/posts/' + postId);

    if (response.data === null) {
      throw new Error('Not found');
    }

    return response.data;
  }
);