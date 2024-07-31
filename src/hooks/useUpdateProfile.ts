import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { profileUpdateRequest, profileUpdateSuccess, profileUpdateFailure } from '../redux/authSlice';
import { updateProfile } from '../utils/api';
import { User } from '../types';

export const useUpdateProfile = () => {
  const dispatch = useDispatch();

  const handleUpdateProfile = useCallback(async (token: string, data: Partial<User>) => {
    dispatch(profileUpdateRequest());
    try {
      const updatedProfile: User = await updateProfile(token, data);
      dispatch(profileUpdateSuccess(updatedProfile));
    } catch (error) {
      const err = error as Error;
      dispatch(profileUpdateFailure(err.message || 'Failed to update profile'));
    }
  }, [dispatch]);

  return { handleUpdateProfile };
};
