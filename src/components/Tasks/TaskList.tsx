import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';
import { Link } from 'react-router-dom';

interface Tache {
  id: number;
  titre: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  isDone: boolean;
  utilisateurId: number;
}

const TaskList: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: taskState, dispatch } = useTasks();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTaches = async () => {
      console.log('Fetching tasks with token:', authState.token);  // Log the fetch attempt
      try {
        const response = await axios.get('http://localhost:8000/tache/get-all-taches', {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        });
        dispatch({ type: 'SET_TACHES', payload: response.data });
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTaches();
  }, [authState.token, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Liste des Tâches</h2>
      {taskState.taches.length === 0 ? (
        <div>Aucune tâche trouvée.</div>
      ) : (
        <ul className="space-y-4">
          {taskState.taches.map(tache => (
            <li key={tache.id} className="border p-4 rounded shadow">
              <h3 className="text-xl">{tache.titre}</h3>
              <p>{tache.description}</p>
              <p>
                <strong>Date de début:</strong> {new Date(tache.dateDebut).toLocaleDateString()}
              </p>
              <p>
                <strong>Date de fin:</strong> {new Date(tache.dateFin).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {tache.isDone ? 'Terminée' : 'En cours'}
              </p>
              <Link to={`/tache/${tache.id}`} className="text-blue-500">Voir Détails</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
