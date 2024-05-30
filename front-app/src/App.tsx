import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
      <h1 className="text-2xl text-center my-4">Votre Gestionnaire des tâches</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
