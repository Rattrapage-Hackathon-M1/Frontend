import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ChangePassword: React.FC = () => {
  const { state } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/changepassword', formData, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      setMessage('Password changed successfully!');
    } catch (error) {
      console.error('Change password error:', error);
      setMessage('Error changing password.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Changer le Mot de Passe</h2>
        <input
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          placeholder="Ancien mot de passe"
          required
          className="border p-2"
        />
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Nouveau mot de passe"
          required
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Changer le mot de passe
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;
