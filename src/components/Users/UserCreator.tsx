import React, { useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../../router/apiRoutes';

const UserCreator: React.FC = () => {
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
      await axios.post("http://localhost:8080/api/utilisateur/nouveau-utilisateur", formData);
      setMessage('Utilisateur créé avec succès');
      setFormData({
        username: '',
        mail: '',
        password: '',
        roles: 'ROLE_USER'
      });
    } catch (error) {
      console.error('Error creating user:', error);
      setMessage('Erreur lors de la création de l\'utilisateur');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Créer un Utilisateur</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Nom d'utilisateur</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nom d'utilisateur"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Créer
        </button>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </form>
    </div>
  );
};

export default UserCreator;
