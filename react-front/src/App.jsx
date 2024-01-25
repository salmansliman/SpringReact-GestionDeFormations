import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import { AuthProvider } from './Components/Login/context/AuthProvider';
import Landing from './Components/Landing/Landing';
import Profile from './Components/Profile/Profile';
import Sidebar from './Components/Sidebar/Sidebar';
import AddEntreprise from './Components/AddEntreprise/AddEntreprise';
import DashboardHome from './Components/Dashboard/DashboardHome';
import AddFormation from './Components/AddFormation/AddFormation';

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard/>} >
              <Route path='' element={<DashboardHome />} />
              <Route path="entreprise" element={<AddEntreprise/>} />
              <Route path="formations" element={<AddFormation/>} />
            </Route>
          </Routes>
          </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
