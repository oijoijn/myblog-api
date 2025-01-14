export interface Comment {
    blog: number;
    owner: string;
    comment: string;
    created_at: string;
    updated_at: string;
}

export interface Blog {
    id: number;
    title: string;
    created_at: string;
    tsx_path: string;
    img_path: string;
}

export type BlogListResponse = Blog[];

export interface Blog_Detail {
    id: number;
    title: string;
    created_at: string;
    tsx_path: string;
    img_path: string;
    comments: Comment[];
}

export type BlogDetailResponse = Blog_Detail;

export interface Signup {
    username: string;
    password1: string;
    password2: string;
}

export type SignupRequest = Signup;

export interface Login {
    username: string;
    password: string;
}

export type LoginRequest = Login;

export interface LoginUser {
    username: string;
}

export type StateLoginUser = LoginUser;