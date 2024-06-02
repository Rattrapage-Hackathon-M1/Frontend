import React, { useEffect, useState } from 'react';
import axiosInstance from '../../instance';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Tache {
  id: number;
  titre: string | null;
  description: string;
  dateDebut: string | null;
  dateFin: string | null;
  isDone: boolean;
  utilisateurId: number | null;
}

const TaskList: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: taskState, dispatch } = useTasks();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [tachesPassees, setTachesPassees] = useState<Tache[]>([]);
  const [tachesEnCours, setTachesEnCours] = useState<Tache[]>([]);
  const [tachesAVenir, setTachesAVenir] = useState<Tache[]>([]);

  useEffect(() => {
    const fetchTaches = async () => {
      console.log('Fetching tasks with token:', authState.token);
      try {
        const response = await axios.get('http://localhost:8000/tache/get-all-taches', {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        });
        dispatch({ type: 'SET_TACHES', payload: response.data });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        setTachesPassees(response.data.filter((tache: Tache) => new Date(tache.dateFin) < today));
        setTachesEnCours(response.data.filter((tache: Tache) => new Date(tache.dateFin).getTime() === today.getTime()));
        setTachesAVenir(response.data.filter((tache: Tache) => new Date(tache.dateFin) > today));

      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTaches();
  }, [authState.token, dispatch]);

  const renderTaches = (taches: Tache[]) => (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Description</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {taches.map(tache => (
          <tr key={tache.id}>
            <td>{tache.titre || 'N/A'}</td>
            <td>{tache.description}</td>
            <td>{tache.dateDebut ? new Date(tache.dateDebut).toLocaleDateString() : 'N/A'}</td>
            <td>{tache.dateFin ? new Date(tache.dateFin).toLocaleDateString() : 'N/A'}</td>
            <td>{tache.isDone ? 'Terminée' : 'En cours'}</td>
            <td><Link to={`/tache/${tache.id}`} className="text-blue-500">Voir Détails</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Liste des Tâches</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h3 className="text-xl mb-2">Passées</h3>
          {renderTaches(tachesPassees)}
        </div>
        <div>
          <h3 className="text-xl mb-2">En cours</h3>
          {renderTaches(tachesEnCours)}
        </div>
        <div>
          <h3 className="text-xl mb-2">À venir</h3>
          {renderTaches(tachesAVenir)}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
