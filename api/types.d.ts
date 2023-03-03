import {ObjectId, Schema} from 'mongoose';

export interface IUser {
  username: string;
  displayName: string;
  password: string;
  token: string;
}

export interface PostMutation {
  user: {
    _id: ObjectId,
    displayName: string,
  };
  title: string;
  description: string;
  image: string | null;
}

export interface PostType {
  user: string;
  title: string;
  description: string;
  image: string | null;
}


