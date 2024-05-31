import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TaskCreator: React.FC = () => {
  const { state } = useAuth();
  const [formData, setFormData] = useState({ titre: '', description: '', dateDebut: '', dateFin: '', isDone: false });
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/tache/nouveau-tache', formData, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      setMessage('Tâche créée avec succès');
      navigate('/tasks');
    } catch (error) {
      console.error('Error creating task:', error);
      setMessage('Erreur lors de la création de la tâche');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Créer une Tâche</h2>
        <input type="text" name="titre" value={formData.titre} onChange={handleChange} placeholder="Titre" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input type="date" name="dateDebut" value={formData.dateDebut} onChange={handleChange} required />
        <input type="date" name="dateFin" value={formData.dateFin} onChange={handleChange} required />
        <button type="submit">Créer</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default TaskCreator;
