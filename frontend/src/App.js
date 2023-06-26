import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Mapcomponent from './components/Mapcomonent';
import PinDetails from './components/PinDetails';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    
    const loggedIn = localStorage.getItem('isLoggedIn');

    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const handleLogin = (token,username) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('token',token);
    localStorage.setItem('username',username)
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

        {!isLoggedIn ? (
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        ) : (
          <>
            <Route path="/map" element={<Mapcomponent />} />
            <Route path="/pindetails" element={<PinDetails />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
