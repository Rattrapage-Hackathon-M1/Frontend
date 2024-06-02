import React, { createContext, useReducer, useContext, ReactNode } from 'react';


interface Utilisateur {
  id: number;
  username: string;
  mail: string;
  roles: string;
}

interface UserState {
  utilisateurs: Utilisateur[];
}

interface UserAction {
  type: string;
  payload?: any;
}

const initialState: UserState = {
  utilisateurs: [],
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_UTILISATEURS':
      return {
        ...state,
        utilisateurs: action.payload,
      };
    case 'ADD_UTILISATEUR':
      return {
        ...state,
        utilisateurs: [...state.utilisateurs, action.payload],
      };
    default:
      return state;
  }
};

const UserContext = createContext<{ state: UserState; dispatch: React.Dispatch<UserAction> } | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
