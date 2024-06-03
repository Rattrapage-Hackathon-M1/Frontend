import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface Utilisateur {
  id: number;
  username: string;
  mail: string;
  roles: string;
}

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Utilisateur>>({});

  useEffect(() => {
    const fetchUtilisateur = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/utilisateur/get-utilisateur-by-id?id=${id}`);
        setUtilisateur(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Erreur lors de la récupération de l\'utilisateur');
      } finally {
        setLoading(false);
      }
    };

    fetchUtilisateur();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/utilisateur/supprimer-utilisateur?id=${id}`);
      navigate('/'); // Redirect to another page after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Erreur lors de la suppression de l\'utilisateur');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(utilisateur);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:8080/api/utilisateur/modifie-utilisateur', formData);
      setUtilisateur(formData as Utilisateur);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Erreur lors de la modification de l\'utilisateur');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      {utilisateur ? (
        <>
          <h2 className="text-3xl font-bold mb-4 text-center">{utilisateur.username}</h2>
          {isEditing ? (
            <div className="text-lg">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Email:</label>
                <input
                  type="email"
                  name="mail"
                  value={formData?.mail || ''}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Roles:</label>
                <select
                  name="roles"
                  value={formData?.roles || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                  <option value="ROLE_USER">ROLE_USER</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
              </div>
            </div>
          ) : (
            <div className="text-lg">
              <p className="mb-2">
                <span className="font-semibold">Email:</span> {utilisateur.mail}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Roles:</span> {utilisateur.roles}
              </p>
              <div className="flex justify-end space-x-2">
                <button onClick={handleEdit} className="px-4 py-2 bg-yellow-500 text-white rounded">Edit</button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">Utilisateur non trouvé</div>
      )}
    </div>
  );
};

export default UserDetails;
