import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface Tache {
  id: number;
  titre: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  isDone: boolean;
  utilisateurId: number;
}

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useAuth();
  const [tache, setTache] = useState<Tache | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTache = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/taches/${id}`, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });
        setTache(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
        setError('Failed to fetch task');
      } finally {
        setLoading(false);
      }
    };

    fetchTache();
  }, [id, state.token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      {tache ? (
        <>
          <h2 className="text-2xl mb-4">{tache.titre}</h2>
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
        </>
      ) : (
        <div>Tâche non trouvée</div>
      )}
    </div>
  );
};

export default TaskDetails;
