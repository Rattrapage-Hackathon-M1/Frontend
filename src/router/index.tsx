import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Authentification/Login';
import TaskList from '../components/Tasks/TaskList';
import TaskCreator from '../components/Tasks/TaskCreator';
import TaskDetails from '../components/Tasks/TaskDetails';
import Signup from '../components/Authentification/Signup';
import VerifyToken from '../components/Authentification/VerifyToken';
import ChangePassword from '../components/Authentification/ChangePassword';
import Logout from '../components/Authentification/Logout';
import RefreshToken from '../components/Authentification/RefreshToken';

const AppRouter: React.FC = () => {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/refreshtoken" element={<RefreshToken />} />
        <Route path="/verifytoken" element={<VerifyToken />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/taches" element={<TaskList />} />
        <Route path="/taches/:id" element={<TaskDetails />} />
        <Route path="/create" element={<TaskCreator />} />
        <Route path="/" element={<Login />} />
      </Routes>
  );
};

export default AppRouter;
