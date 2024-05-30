import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    roles: ['user'],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', formData);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-md mx-auto">
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          placeholder="Nom"
          className="border p-2"
        />
        <input
          type="text"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          placeholder="Prénom"
          className="border p-2"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          S'inscrire
        </button>
      </form>
      <p className="mt-4">
        Déjà un compte ? <Link to="/" className="text-blue-500">Se connecter</Link>
      </p>
    </div>
  );
};

export default Signup;
