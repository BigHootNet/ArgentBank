import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUpdateProfile } from '../hooks/useUpdateProfile';

const ProfileForm: React.FC = () => {
  const { auth } = useAuth();
  const { handleUpdateProfile } = useUpdateProfile();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (auth.user) {
      setFirstName(auth.user.firstName || '');
      setLastName(auth.user.lastName || '');
    }
  }, [auth.user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (auth.token) {
      await handleUpdateProfile(auth.token, { firstName, lastName });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div>
        <label>Last Name</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
