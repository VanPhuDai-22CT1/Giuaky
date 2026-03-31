import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import About from './pages/About';
import Users from './pages/Users';

function NavBar() {
  const location = useLocation();
  return (
    <nav style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'18px 0',background:'#1976d2',marginBottom:32}}>
      <Link to="/" style={{
        color: location.pathname === '/' ? '#fff' : '#bbdefb',
        background: location.pathname === '/' ? '#1565c0' : 'transparent',
        padding:'8px 24px',
        borderRadius:6,
        textDecoration:'none',
        fontWeight:'bold',
        marginRight:8
      }}>Users</Link>
      <Link to="/about" style={{
        color: location.pathname === '/about' ? '#fff' : '#bbdefb',
        background: location.pathname === '/about' ? '#1565c0' : 'transparent',
        padding:'8px 24px',
        borderRadius:6,
        textDecoration:'none',
        fontWeight:'bold'
      }}>About</Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Users />} />
      </Routes>
    </Router>
  );
}
export default App;
