import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registrationSuccess,setRegistrationSuccess] = useState(false);
  const handleFormSubmit = async (e) => { 
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        setRegistrationSuccess(true);
        console.log('Registration successful');
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className=' wrapper my-10'>
      <form className='form-box' onSubmit={handleFormSubmit}>
        <h2 className='form-title'>Register User</h2>
        <div>
          <label>UserName:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
        </div>
        <br></br>
        <div>
          <label>Email Id:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <br></br>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </div>
        <br></br>
        <button type="submit" className='btn btn-primary'>Register</button>
        <p>{error}</p>
        {
          registrationSuccess && (
            <p className="success-message">User Successfully Registered!</p>
          )
        }
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
      
    </div>
  )
}

export default Signup
