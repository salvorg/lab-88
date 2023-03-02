import {createAsyncThunk} from "@reduxjs/toolkit";
import {Post, PostMutation} from "../../types";
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

export const fetchProducts = createAsyncThunk<Post[]>(
  'posts/fetchAll',
  async () => {
    const response = await axiosApi.get<Post[]>('/posts');
    return response.data;
  }
);