import React, { useEffect, useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Tache {
  id: number;
  titre: string | null;
  description: string;
  dateDebut: string | null;
  dateFin: string | null;
  done: boolean;
  utilisateurId: number | null;
}

const TaskList: React.FC = () => {
  const { state: taskState, dispatch } = useTasks();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [tachesPassees, setTachesPassees] = useState<Tache[]>([]);
  const [tachesEnCours, setTachesEnCours] = useState<Tache[]>([]);
  const [tachesAVenir, setTachesAVenir] = useState<Tache[]>([]);

  useEffect(() => {
    const fetchTaches = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/taches/get-all-taches');
        dispatch({ type: 'SET_TACHES', payload: response.data });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        setTachesPassees(response.data.filter((tache: Tache) => new Date(tache.dateFin) < today));
        setTachesEnCours(response.data.filter((tache: Tache) => new Date(tache.dateDebut) <= today && new Date(tache.dateFin) >= today));
        setTachesAVenir(response.data.filter((tache: Tache) => new Date(tache.dateDebut) > today));
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTaches();
  }, [dispatch]);

  const renderTaches = (taches: Tache[]) => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-300">Titre</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Description</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Date de début</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Date de fin</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Status</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {taches.map((tache) => (
            <tr key={tache.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-200">{tache.titre || 'N/A'}</td>
              <td className="py-2 px-4 border-b border-gray-200">{tache.description}</td>
              <td className="py-2 px-4 border-b border-gray-200">{tache.dateDebut ? new Date(tache.dateDebut).toLocaleDateString() : 'N/A'}</td>
              <td className="py-2 px-4 border-b border-gray-200">{tache.dateFin ? new Date(tache.dateFin).toLocaleDateString() : 'N/A'}</td>
              <td className="py-2 px-4 border-b border-gray-200">{tache.done ? 'Terminée' : 'En cours'}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <Link to={`${tache.id}`} className="text-blue-500 hover:text-blue-700">Voir Détails</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
