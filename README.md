# Projet Frontend - Gestion des Utilisateurs et des Tâches

Ce projet frontend permet la gestion des utilisateurs et des tâches via une interface web. Il inclut des fonctionnalités d'authentification, de création, de modification et de suppression de tâches et d'utilisateurs.

## Table des matières

- [Technologies](#technologies)
- [Installation](#installation)
- [Structure du Projet](#structure-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [API Routes](#api-routes)
- [Contexte](#contexte)
- [Composants](#composants)

## Technologies

- React
- TypeScript
- Axios
- React Router
- Context API

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Rattrapage-Hackathon-M1/Frontend.git
    ```
2. Accédez au répertoire du projet :
    ```bash
    cd projet-frontend
    ```
3. Installez les dépendances :
    ```bash
    npm install
    ```
4. Démarrez l'application :
    ```bash
    npm start
    ```

## Structure du Projet

```css
src/
├── components/
│   ├── Authentification/
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── VerifyToken.tsx
│   │   ├── ChangePassword.tsx
│   │   ├── Logout.tsx
│   │   ├── RefreshToken.tsx
│   ├── Tasks/
│   │   ├── TaskList.tsx
│   │   ├── TaskCreator.tsx
│   │   ├── TaskDetails.tsx
│   ├── Users/
│   │   ├── UserCreator.tsx
│   │   ├── UserList.tsx
│   │   ├── UserDetails.tsx
├── context/
│   ├── AuthContext.tsx
│   ├── TaskContext.tsx
├── router/
│   ├── apiRoutes.tsx
│   ├── index.tsx
├── App.tsx
├── main.tsx
```

## Fonctionnalités

### Authentification
- Login : Permet à un utilisateur de se connecter.
- Signup : Permet à un nouvel utilisateur de s'inscrire.
- VerifyToken : Vérifie la validité du jeton d'authentification.
- ChangePassword : Permet à un utilisateur de changer son mot de passe.
- Logout : Permet à un utilisateur de se déconnecter.
- RefreshToken : Rafraîchit le jeton d'authentification.

### Gestion des Tâches
- TaskList : Affiche la liste des tâches, classées par statut (passées, en cours, à venir).
- TaskCreator : Permet de créer une nouvelle tâche.
- TaskDetails : Affiche les détails d'une tâche spécifique.

### Gestion des Utilisateurs
- UserList : Affiche la liste des utilisateurs.
- UserCreator : Permet de créer un nouvel utilisateur.
- UserDetails : Affiche les détails d'un utilisateur spécifique.

## API Routes
Les routes API sont définies dans apiRoutes.tsx :

  ```typescript
    const API_BASE_URL = 'http://localhost:8000';

    export const API_ROUTES = {
      TACHE: {
        GET_ALL: `${API_BASE_URL}/tache/get-all-taches`,
        CREATE: `${API_BASE_URL}/tache/nouveau-tache`,
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
  ```


## Contexte
### AuthContext
Le AuthContext gère l'état d'authentification de l'application. Il stocke les informations de l'utilisateur, le jeton d'authentification et l'état de connexion.

### TaskContext
Le TaskContext gère l'état des tâches dans l'application. Il stocke la liste des tâches et fournit des actions pour les manipuler (ajout, mise à jour, suppression).

## Composants
### Authentification
- Login.tsx : Formulaire de connexion.
- Signup.tsx : Formulaire d'inscription.
- VerifyToken.tsx : Vérifie la validité du jeton.
- ChangePassword.tsx : Formulaire pour changer de mot de passe.
- Logout.tsx : Gère la déconnexion.
- RefreshToken.tsx : Rafraîchit le jeton d'authentification.
### Tâches
- TaskList.tsx : Affiche une liste de tâches classées par statut.
- TaskCreator.tsx : Formulaire de création de tâches.
- TaskDetails.tsx : Affiche les détails d'une tâche spécifique.
### Utilisateurs
- UserList.tsx : Affiche une liste d'utilisateurs.
- UserCreator.tsx : Formulaire de création d'utilisateurs.
- UserDetails.tsx : Affiche les détails d'un utilisateur spécifique.
