export interface RegisterMutation {
  username: string;
  displayName: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  token: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _name: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface PostMutation {
  title: string;
  description: string;
  image: File | null;
}

export interface PostType {
  _id: string;
  user: {
    _id: string,
    displayName: string,
  };
  title: string;
  description: string;
  image: string | null;
  createdAt: string;
  commentCount: number;
}

export interface CommentType {
  _id: string;
  postId: string;
  comment: string;
}

export type CommentWithoutId = Omit<CommentType, '_id'>;

export interface CommentWithUser {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  }
  postId: string;
  comment: string;
  createdAt: string;
}