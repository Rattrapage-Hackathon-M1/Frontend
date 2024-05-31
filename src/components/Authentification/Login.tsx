import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { dispatch } = useAuth();
  const [confirmationMessage, setConfirmationMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/login', formData);
      dispatch({ type: 'SET_TOKEN', payload: response.data.token });
      setConfirmationMessage('Connexion réussie.');
      setMessageType('success');
      navigate('/verifytoken'); // Redirige vers la page de vérification du token
    } catch (error) {
      console.error('Error:', error);
      setConfirmationMessage('Erreur lors de la connexion. Veuillez réessayer.');
      setMessageType('error');
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
        {confirmationMessage && (
          <div className={messageType === 'error' ? 'error-message' : 'success-message'}>
            {confirmationMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
