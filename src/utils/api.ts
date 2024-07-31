import axios from 'axios';
import { User } from '../types';

const API_URL = 'http://localhost:3001/api/v1';


const getAuthHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const login = async (email: string, password: string): Promise<{ token: string }> => {
  const response = await axios.post<{ status: number; message: string; body: { token: string } }>(`${API_URL}/user/login`, { email, password });
  return response.data.body;
};

export const signup = async (email: string, password: string, firstName: string, lastName: string): Promise<{ id: string; email: string }> => {
  const response = await axios.post<{ status: number; message: string; body: { id: string; email: string } }>(
    `${API_URL}/user/signup`,
    { email, password, firstName, lastName }
  );
  return response.data.body;
};

export const fetchProfile = async (token: string): Promise<User> => {
  const response = await axios.post<{ status: number; message: string; body: User }>(`${API_URL}/user/profile`, null, getAuthHeaders(token));
  return response.data.body;
};

export const updateProfile = async (token: string, data: Partial<User>): Promise<User> => {
  const response = await axios.put<{ status: number; message: string; body: User }>(`${API_URL}/user/profile`, data, getAuthHeaders(token));
  return response.data.body;
};
