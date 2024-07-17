// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Navbar from './components/Navbar';
import ESG from './Pages/ESG';
import Login from './Pages/Login';
import ProtectedRoute from './components/ProtectedRoute'; // Ensure this matches the file name
import { AuthProvider } from './components/AuthContext'; // Ensure this matches the file name

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/esg" element={<ESG />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
