// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Navbar from './components/Navbar';
import ESG from './Pages/ESG';
import Login from './Pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './Pages/Signup';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/esg" element={<ESG />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          </Routes>
        </main>
      </Router>
    </Provider>
  );
}

export default App;
