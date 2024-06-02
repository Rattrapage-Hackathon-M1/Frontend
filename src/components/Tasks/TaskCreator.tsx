import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';
import { API_ROUTES } from '../../router/apiRoutes';


const TaskCreator: React.FC = () => {
  const { state: authState } = useAuth();
  const { dispatch } = useTasks();
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [utilisateurId, setUtilisateurId] = useState(1);
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: new Date(dateDebut),
    dateFin: new Date(dateFin),
    isDone: false,
    utilisateurId
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Titre</label>
        <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Date de début</label>
        <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required />
      </div>
      <div>
        <label>Date de fin</label>
        <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} required />
      </div>
      <button type="submit">Ajouter Tâche</button>
    </form>
  );
};

export default TaskCreator;
