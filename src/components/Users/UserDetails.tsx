import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { API_ROUTES } from '../../router/apiRoutes';

interface Utilisateur {
  id: number;
  username: string;
  mail: string;
  roles: string;
}

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useAuth();
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUtilisateur = async () => {
      try {
        const response = await axios.get(`${API_ROUTES.UTILISATEUR.GET_BY_ID}?id=${id}`, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });
        setUtilisateur(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Erreur lors de la récupération de l\'utilisateur');
      } finally {
        setLoading(false);
      }
    };

    fetchUtilisateur();
  }, [id, state.token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      {utilisateur ? (
        <>
          <h2 className="text-2xl mb-4">{utilisateur.username}</h2>
          <p>Email: {utilisateur.mail}</p>
          <p>Roles: {utilisateur.roles}</p>
        </>
      ) : (
        <div>Utilisateur non trouvé</div>
      )}
    </div>
  );
};

export default UserDetails;
