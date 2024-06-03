import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface Tache {
  id: number;
  titre: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  isDone: boolean;
  utilisateurId: number | null;
}

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tache, setTache] = useState<Tache | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Tache>>({});

  useEffect(() => {
    const fetchTache = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/taches/get-tache-by-id/${id}`);
        setTache(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
        setError('Failed to fetch task');
      } finally {
        setLoading(false);
      }
    };

    fetchTache();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/taches/modifie-tache/${id}`, formData);
      setEditing(false);
      setTache({ ...tache, ...formData } as Tache);
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/taches/supprimer-tache?id=${id}`);
      navigate('/'); // Redirect to another page after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      {tache ? (
        <>
          <h2 className="text-2xl font-bold text-gray-900">{tache.titre}</h2>
          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="titre" className="block text-sm font-medium text-gray-700">Titre</label>
                <input
                  type="text"
                  name="titre"
                  id="titre"
                  value={formData.titre || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">Date de début</label>
                <input
                  type="date"
                  name="dateDebut"
                  id="dateDebut"
                  value={formData.dateDebut || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">Date de fin</label>
                <input
                  type="date"
                  name="dateFin"
                  id="dateFin"
                  value={formData.dateFin || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isDone"
                  id="isDone"
                  checked={formData.isDone || false}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="isDone" className="ml-2 block text-sm text-gray-900">Terminée</label>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          ) : (
            <>
              <p>{tache.description}</p>
              <div className="text-gray-500">
                <p>
                  <strong>Date de début:</strong> {new Date(tache.dateDebut).toLocaleDateString()}
                </p>
                <p>
                  <strong>Date de fin:</strong> {new Date(tache.dateFin).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong> {tache.isDone ? (
                    <span className="text-green-500">Terminée</span>
                  ) : (
                    <span className="text-yellow-500">En cours</span>
                  )}
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditing(true)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Modifier
                </button>
                <button
                  onClick={handleDelete}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Supprimer
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-red-500">Tâche non trouvée</div>
      )}
    </div>
  );
};

export default TaskDetails;
