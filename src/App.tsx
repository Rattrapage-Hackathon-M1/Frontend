import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import AppRouter from './router';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Navbar />
          <AppRouter />
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
