import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { signupRequest, signupFailure } from '../redux/authSlice';
import { signup as apiSignup } from '../utils/api';
import { useLogin } from './useLogin';

export const useSignup = () => {
  const dispatch = useDispatch();
  const { handleLogin } = useLogin();

  const handleSignup = useCallback(async (email: string, password: string, firstName: string, lastName: string) => {
    dispatch(signupRequest());
    try {
      const user = await apiSignup(email, password, firstName, lastName);
      if (!user) throw new Error('Signup failed');
      await handleLogin(email, password);
    } catch (error) {
      const err = error as Error;
      dispatch(signupFailure(err.message || 'Signup failed'));
    }
  }, [dispatch, handleLogin]);

  return { handleSignup };
};
