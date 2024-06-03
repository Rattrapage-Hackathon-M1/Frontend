import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import AppRouter from './router';
import Navbar from './components/Navbar';
import { UserProvider } from './context/UserContext';
import './style.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <UserProvider>
          <Router>
            <Navbar />
            <AppRouter />
          </Router>
        </UserProvider>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
