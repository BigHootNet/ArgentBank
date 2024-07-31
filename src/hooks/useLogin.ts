import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginRequest, loginSuccess, loginFailure, profileUpdateSuccess } from '../redux/authSlice';
import { login as apiLogin, fetchProfile } from '../utils/api';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = useCallback(async (email: string, password: string) => {
    dispatch(loginRequest());
    try {
      const { token } = await apiLogin(email, password);
      if (!token) throw new Error('Token not received');
      localStorage.setItem('token', token);
      console.log('Token set in localStorage:', token);

      // Fetch the user profile
      const profileData = await fetchProfile(token);
      dispatch(loginSuccess({ token }));
      dispatch(profileUpdateSuccess(profileData));
      navigate('/profile');
    } catch (error) {
      const err = error as Error;
      console.error('Login error:', err.message);
      dispatch(loginFailure(err.message || 'Login failed'));
    }
  }, [dispatch, navigate]);

  return { handleLogin };
};
