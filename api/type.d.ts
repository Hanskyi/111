export interface IUser {
    username: string;
    password: string;
    token: string;
}

export interface ICommentData {
    user: string,
    post: string,
    description: string
}

export interface IPostData {
    user: string,
    title: string,
    description: string,
    image?: string | null,
    comments?: number
}