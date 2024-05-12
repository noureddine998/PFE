import React, { useState } from 'react';
import './AdminLogin.css';
import { axiosClient } from "../../api/axios";
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();   // Initialize useHistory hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axiosClient.get('/sanctum/csrf-cookie')
      const response = await axiosClient.post('/api/admin/login', { username, password });
      localStorage.setItem('adminToken', response.data.token);
      alert(response.data.message);
    } catch (error) {
      console.error('Login error', error.response.data);
      alert(error.response.data.error);
    }
    navigate('/adminPage');

  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
