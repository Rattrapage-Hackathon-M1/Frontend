import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post('http://localhost:8000/auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        dispatch({ type: 'CLEAR_AUTH_DATA' });
        navigate('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    logout();
  }, [dispatch, navigate]);

  return (
    <div className="auth-container">
      <p>Déconnexion en cours...</p>
    </div>
  );
};

export default Logout;
