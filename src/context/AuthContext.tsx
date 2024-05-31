import React, { createContext, useReducer, useContext, ReactNode } from 'react';

enum Role {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER'
}

interface Utilisateur {
  id: number | null;
  username: string | null;
  email: string | null;
  role: Role[];
  password: string | null;
}

interface State {
  utilisateur: Utilisateur | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthContextProps {
  state: State;
  dispatch: React.Dispatch<any>;
}

const initialState: State = {
  utilisateur: null,
  token: null,
  isAuthenticated: false
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const authReducer = (state: State, action: any): State => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        utilisateur: action.payload,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
        isAuthenticated: !!action.payload,
      };
    case 'CLEAR_AUTH_DATA':
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log('AuthProvider initialized');
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
