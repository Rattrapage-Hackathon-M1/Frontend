import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { API_ROUTES } from '../../router/apiRoutes';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ['ROLE_ADMIN'],
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
      const response = await axios.post(API_ROUTES.AUTH.SIGNUP, formData);
      dispatch({ type: 'SET_TOKEN', payload: response.data.token });
      setConfirmationMessage('Inscription réussie. Vous pouvez maintenant vous connecter.');
      setMessageType('success');
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data;
        if (errorMessage === "Erreur : l'adresse email est déjà prise") {
          setConfirmationMessage('Erreur : l\'adresse email est déjà prise');
        } else if (errorMessage === "Erreur : le username est déjà pris") {
          setConfirmationMessage('Erreur : le username est déjà pris');
        } else {
          setConfirmationMessage('Erreur lors de l’inscription. Veuillez réessayer.');
        }
      } else {
        setConfirmationMessage('Erreur lors de l’inscription. Veuillez réessayer.');
      }
      setMessageType('error');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Inscription</h2>
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
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
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
          S'inscrire
        </button>
        <p className="switch-mode">
          Vous avez déjà un compte ? <Link to="/login" className="text-blue-500">Connectez-vous</Link>
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

export default Signup;
