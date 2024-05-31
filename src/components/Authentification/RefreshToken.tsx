import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const RefreshToken: React.FC = () => {
  const { state, dispatch } = useAuth();
  const [message, setMessage] = useState<string>('');

  const handleRefreshToken = async () => {
    try {
      const response = await axios.post('http://localhost:8000/auth/refreshtoken', {
        refreshToken: localStorage.getItem('refreshToken')
      });
      const { token } = response.data;
      dispatch({ type: 'SET_TOKEN', payload: token });
      setMessage('Token refreshed successfully!');
    } catch (error) {
      console.error('Refresh token error:', error);
      setMessage('Error refreshing token.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Rafraîchir le Token</h2>
      <button onClick={handleRefreshToken} className="bg-blue-500 text-white p-2">
        Rafraîchir le Token
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RefreshToken;
