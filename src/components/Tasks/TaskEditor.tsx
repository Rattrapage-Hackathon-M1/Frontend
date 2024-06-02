import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';
import { API_ROUTES } from '../../router/apiRoutes';

const TaskEditor: React.FC = () => {
  const { state: authState } = useAuth();
  const { dispatch } = useTasks();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    id: Number(id),
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    isDone: false,
    utilisateurId: null
  });
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${API_ROUTES.TACHE.DETAILS}/${id}`, {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
        console.log("Path Error: ", "${API_ROUTES.TACHE.DETAILS}/${id}");
      }
    };
    fetchTask();
  }, [id, authState.token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(API_ROUTES.TACHE.UPDATE, formData, {
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      });
      dispatch({ type: 'SET_TACHES', payload: response.data });
      setMessage('Tâche modifiée avec succès');
    } catch (error) {
      console.error('Error updating task:', error);
      setMessage('Erreur lors de la modification de la tâche');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Modifier la Tâche</h2>
        <input
          type="text"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
          placeholder="Titre"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="date"
          name="dateDebut"
          value={formData.dateDebut}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateFin"
          value={formData.dateFin}
          onChange={handleChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="isDone"
            checked={formData.isDone}
            onChange={(e) => setFormData({ ...formData, isDone: e.target.checked })}
          />
          Tâche terminée
        </label>
        <button type="submit">Modifier</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default TaskEditor;
