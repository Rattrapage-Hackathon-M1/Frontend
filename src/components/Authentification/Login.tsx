import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { API_ROUTES } from '../../router/apiRoutes';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { dispatch } = useAuth();
  const [confirmationMessage, setConfirmationMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_ROUTES.AUTH.LOGIN, {
        username: formData.username,
        password: formData.password,
      });
      const { token, user } = response.data;
      dispatch({ type: 'SET_TOKEN', payload: token });
      dispatch({ type: 'SET_USER', payload: user });
      navigate('/verifytoken'); // Redirect to tasks page
    } catch (error) {
      console.error('There was an error!', error);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data;
        if (errorMessage === "Username ou mot de passe incorrect") {
          setError('Username ou mot de passe incorrect');
        } else {
          setError('Erreur lors de la connexion. Veuillez réessayer.');
        }
      } else {
        setError('Erreur lors de la connexion. Veuillez réessayer.');
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nom d'utilisateur"
          required
          className="border p-2"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          required
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Se connecter
        </button>
        <p className="switch-mode">
          Pas de compte ? <Link to="/signup" className="text-blue-500">Inscrivez-vous</Link>
        </p>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
