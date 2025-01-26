import axios from 'axios';
import { LoginRequest, SignupRequest, CommentRequest } from './interface';


const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBlogsList = async () => {
  try {
    const response = await apiClient.get('blogs/list');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching blogs:', error.response?.data);
      throw new Error(error.response?.data?.message || 'An error occurred while fetching blogs.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const getBlogDetail = async (id: number) => {
  try {
    const response = await apiClient.get(`blogs/${id}/detail/`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching blog with id ${id}:`, error.response?.data);
      throw new Error(error.response?.data?.message || `An error occurred while fetching blog with id ${id}.`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const postAccountsSignup = async (data: SignupRequest) => {
  try {
    const response = await apiClient.post('accounts/signup/', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError 型の場合
      console.error('Error fetching blogs:', error.response?.data);
      throw new Error(error.response?.data?.message || 'An error occurred while fetching blogs.');
    } else {
      // その他のエラー
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const postApiToken = async (data: LoginRequest) => {
  try {
    const response = await apiClient.post('api/token/', data);
    return response.data; // トークンデータを返す
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during login:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Login failed.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const postBlogsCommentsCreate = async (access_token: string, id: number, data: CommentRequest) => {
  try {
    const response = await apiClient.post(
      `blogs/${id}/comments/create/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during login:', error.response?.data);
      throw new Error(error.response?.data?.message || 'post comment create failed.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const getBlogsCommentsList = async (access_token: string) => {
  try {
    const response = await apiClient.get(
      `blogs/user/comments/list/`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during login:', error.response?.data);
      throw new Error(error.response?.data?.message || 'get comment list failed.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const getBlogsCommentsEdit = async (access_token: string, id: number) => {
  try {
    const response = await apiClient.get(
      `blogs/${id}/comments/edit/`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during login:', error.response?.data);
      throw new Error(error.response?.data?.message || 'get comment edit failed.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const putBlogsCommentsEdit = async (access_token: string, id: number, comment: string) => {
  try {
    const response = await apiClient.put(
      `blogs/${id}/comments/edit/`,
      { comment: comment },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during login:', error.response?.data);
      throw new Error(error.response?.data?.message || 'put comment edit failed.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const deleteBlogsCommentsEdit = async (access_token: string, id: number) => {
  try {
    const response = await apiClient.delete(
      `blogs/${id}/comments/edit/`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during login:', error.response?.data);
      throw new Error(error.response?.data?.message || 'delete comment edit failed.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};