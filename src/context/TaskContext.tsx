import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface Tache {
  id: number;
  titre: string;
  description: string;
  dateDebut: Date;
  dateFin: Date;
  isDone: boolean;
  utilisateurId: number;
}

interface TaskState {
  taches: Tache[];
}

interface TaskAction {
  type: string;
  payload?: any;
}

const initialState: TaskState = {
  taches: [],
};

const TaskContext = createContext<{ state: TaskState; dispatch: React.Dispatch<TaskAction> } | undefined>(undefined);

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'SET_TACHES':
      return {
        ...state,
        taches: action.payload,
      };
    case 'ADD_TACHE':
      return {
        ...state,
        taches: [...state.taches, action.payload],
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
