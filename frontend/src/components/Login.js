
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const {token,_id,username} = await response.json();
        console.log('Token:',token);
        console.log('Login successful:', _id,username);
        localStorage.setItem('token', token);
        handleLogin(token,username); 
        navigate('/map'); 
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="wrapper ">
      <form className="form-box" onSubmit={handleFormSubmit}>
        <h2 className='form-title'>Login User</h2>
        <div>
          
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
        </div>
        <br />
        <div>
         
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" Enter Password"
          />
        </div>
        <br />
        <button type="submit" className='btn btn-primary'>Login</button>
        <p>{error}</p>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;
