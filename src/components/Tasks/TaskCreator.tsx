import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';
import { API_ROUTES } from '../../router/apiRoutes';
import '../../style.css';

const TaskCreator: React.FC = () => {
  const { state: authState } = useAuth();
  const { dispatch } = useTasks();
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [utilisateurId, setUtilisateurId] = useState(1);
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'titre') setTitre(value);
    if (name === 'description') setDescription(value);
    if (name === 'dateDebut') setDateDebut(value);
    if (name === 'dateFin') setDateFin(value);
  };

  useEffect(() => {
    setFormData({
      titre,
      description,
      dateDebut: new Date(dateDebut),
      dateFin: new Date(dateFin),
      isDone: false,
      utilisateurId
    });
  }, [titre, description, dateDebut, dateFin]);

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: new Date(dateDebut),
    dateFin: new Date(dateFin),
    isDone: false,
    utilisateurId
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_ROUTES.TACHE.CREATE, formData, {
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      });
      dispatch({ type: 'ADD_TACHE', payload: response.data });
      setMessage('Tâche créée avec succès');
    } catch (error) {
      console.error('Error creating task:', error);
      setMessage('Erreur lors de la création de la tâche');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre</label>
          <input
            type="text"
            name="titre"
            value={titre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date de début</label>
          <input
            type="date"
            name="dateDebut"
            value={dateDebut}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date de fin</label>
          <input
            type="date"
            name="dateFin"
            value={dateFin}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Ajouter Tâche</button>
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
};

export default TaskCreator;
