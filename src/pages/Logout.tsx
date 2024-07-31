import React, { useEffect } from 'react';
import { useLogout } from '../hooks/useLogout';

const Logout: React.FC = () => {
  const { handleLogout } = useLogout();

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return <div>Logging out...</div>;
};

export default Logout;
