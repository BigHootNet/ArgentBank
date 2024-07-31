import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Logout from '../pages/Logout'; // Importer le composant Logout
import TransactionDetails from '../pages/TransactionDetails';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/transaction/:id" element={<TransactionDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
