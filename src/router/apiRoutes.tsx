const API_BASE_URL = 'http://localhost:8080/api/taches';

export const API_ROUTES = {
  TACHE: {
    GET_ALL: `${API_BASE_URL}/get-all-taches`,
    CREATE: `${API_BASE_URL}/nouveau-tache`,
    DETAILS: `${API_BASE_URL}/get-tache-by-id`,
    UPDATE: `${API_BASE_URL}/modifie-tache`,
  },
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    VERIFY_TOKEN: `${API_BASE_URL}/auth/verifytoken`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    CHANGE_PASSWORD: `${API_BASE_URL}/auth/changepassword`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refreshtoken`,
  },
  UTILISATEUR: {
    GET_ALL: `${API_BASE_URL}/utilisateur/get-all-utilisateurs`,
    CREATE: `${API_BASE_URL}/utilisateur/nouveau-utilisateur`,
    GET_BY_ID: `${API_BASE_URL}/utilisateur/get-utilisateur-by-id`,
    UPDATE: `${API_BASE_URL}/utilisateur/modifie-utilisateur`,
    DELETE: `${API_BASE_URL}/utilisateur/supprimer-utilisateur`,
  },
};
