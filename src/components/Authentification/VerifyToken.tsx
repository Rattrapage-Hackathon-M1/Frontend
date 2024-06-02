import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const VerifyToken: React.FC = () => {
  const { state } = useAuth();
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      console.log('Verifying token:', state.token);
      try {
        const response = await axios.get('http://localhost:8000/auth/verifytoken', {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error:', error);
        setMessage('Token is invalid or expired');
        // navigate('/login'); // Redirige vers la page de connexion en cas d'erreur
      }
    };

    if (state.token) {
      verifyToken();
    } else {
      navigate('/login');
    }
  }, [state.token, navigate]);

  return (
    <div className="auth-container">
      <h2>Vérification du Token</h2>
      <p>{message}</p>
    </div>
  );
};

export default VerifyToken;
