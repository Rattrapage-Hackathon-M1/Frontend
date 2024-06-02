import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { API_ROUTES } from '../../router/apiRoutes';

const UserCreator: React.FC = () => {
  const { state: authState } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    mail: '',
    password: '',
    roles: 'ROLE_USER'
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_ROUTES.UTILISATEUR.CREATE, formData, {
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      });
      setMessage('Utilisateur créé avec succès');
    } catch (error) {
      console.error('Error creating user:', error);
      setMessage('Erreur lors de la création de l\'utilisateur');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Créer un Utilisateur</h2>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nom d'utilisateur"
          required
        />
        <input
          type="email"
          name="mail"
          value={formData.mail}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          required
        />
        <button type="submit">Créer</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default UserCreator;
