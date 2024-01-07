export interface IUser {
  _id: string;
  username: string;
  token: string;
}

export interface IRegister {
  username: string,
  password: string,
}
export interface ILogin{
  username: string,
  password: string,
}

export interface IRegisterResponse {
  user: IUser,
  message: string
}

export interface ValidateError {
  errors: {
    [key: string]: {
      message: string;
      name: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface Post {
  _id: string,
  user: {
    username: string,
  };
  title: string;
  datetime: string;
  image: string | null;
  description: string;
  comments?: number
}

export interface OnePost {
  _id: string,
  user: string,
  title: string;
  datetime: string;
  image: string | null;
  description: string;
}
export interface IPostMutation {
  title: string;
  description: string;
  image: File | null;
}
export interface GlobalError {
  error: string;
}

export interface IComment {
  _id: string,
  user: {
    username: string,
  };
  post: Post;
  description: string;
}

export interface ICommentMutation {
  description: string;
  postId: string
}