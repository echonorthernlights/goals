import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Header from './components/Header';
function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route element={<Login />} exact path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Dashboard />} path="/" />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
