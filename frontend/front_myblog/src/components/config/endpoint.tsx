import axios from 'axios';
import { LoginRequest } from './interface';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/', 
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

export const postAccountsSignup = async () => {
  try {
    const response = await apiClient.post('accounts/signup/');
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
