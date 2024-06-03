import React, { useEffect, useState } from 'react';
import { useUsers } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Utilisateur {
  id: number;
  username: string;
  mail: string;
  roles: string;
}

const UserList: React.FC = () => {
  const { state: userState, dispatch } = useUsers();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/utilisateur/get-all-utilisateurs');
        dispatch({ type: 'SET_UTILISATEURS', payload: response.data });
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Erreur lors de la récupération des utilisateurs');
      } finally {
        setLoading(false);
      }
    };

    fetchUtilisateurs();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Liste des Utilisateurs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-300">ID</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Nom d'utilisateur</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Email</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Roles</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {userState.utilisateurs.map(utilisateur => (
              <tr key={utilisateur.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-200">{utilisateur.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{utilisateur.username}</td>
                <td className="py-2 px-4 border-b border-gray-200">{utilisateur.mail}</td>
                <td className="py-2 px-4 border-b border-gray-200">{utilisateur.roles}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <Link to={`${utilisateur.id}`} className="text-blue-500 hover:text-blue-700">Voir Détails</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
