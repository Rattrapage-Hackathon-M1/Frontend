import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { API_ROUTES } from '../../router/apiRoutes';
import { Link } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';

const UserList: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: userState, dispatch } = useUsers();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      console.log('Fetching users with token:', authState.token);
      try {
        const response = await axios.get(API_ROUTES.UTILISATEUR.GET_ALL, {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        });
        dispatch({ type: 'SET_UTILISATEURS', payload: response.data });
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Erreur lors de la récupération des utilisateurs');
      } finally {
        setLoading(false);
      }
    };

    fetchUtilisateurs();
  }, [authState.token, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Liste des Utilisateurs</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userState.utilisateurs.map(utilisateur => (
            <tr key={utilisateur.id}>
              <td>{utilisateur.id}</td>
              <td>{utilisateur.username}</td>
              <td>{utilisateur.mail}</td>
              <td>{utilisateur.roles}</td>
              <td>
                <Link to={`/utilisateur/${utilisateur.id}`} className="text-blue-500">Voir Détails</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
