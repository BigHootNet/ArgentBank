import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { profileUpdateRequest, profileUpdateSuccess, profileUpdateFailure } from '../redux/authSlice';
import { fetchProfile } from '../utils/api';
import { User } from '../types';

export const useFetchProfile = () => {
  const dispatch = useDispatch();

  const handleFetchProfile = useCallback(async (token: string) => {
    dispatch(profileUpdateRequest());
    try {
      const response: User = await fetchProfile(token);
      dispatch(profileUpdateSuccess(response));
    } catch (error) {
      const err = error as Error;
      console.error('Fetch profile error:', err.message);
      dispatch(profileUpdateFailure(err.message || 'Failed to fetch profile'));
    }
  }, [dispatch]);

  return { handleFetchProfile };
};
