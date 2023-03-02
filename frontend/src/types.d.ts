export interface RegisterMutation {
  username: string;
  nickname: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
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

export interface Post {
  _id: string;
  title: string;
  description: string;
  image: File | null;
  createdAt: string;
}
