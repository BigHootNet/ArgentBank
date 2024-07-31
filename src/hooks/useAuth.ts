import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { loginRequest, loginSuccess, loginFailure } from '../redux/authSlice';
import { useFetchProfile } from './useFetchProfile';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const { handleFetchProfile } = useFetchProfile();

  const initializeAuth = useCallback(async (token: string) => {
    dispatch(loginRequest());
    try {
      await handleFetchProfile(token);
      dispatch(loginSuccess({ token }));
    } catch (error) {
      const err = error as Error;
      console.error('Failed to fetch profile:', err.message);
      dispatch(loginFailure(err.message || 'Failed to fetch profile'));
    }
  }, [dispatch, handleFetchProfile]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      initializeAuth(token);
    }
  }, [initializeAuth]);

  return { auth };
};
