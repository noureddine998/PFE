import React, { useState } from 'react';
import './LoginUser.css';
import axios from 'axios';
import { regions, constituencies } from '../../data/Districts';
import { useNavigate } from 'react-router-dom';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();   // Initialize useHistory hook

  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    axios.post('http://localhost:8000/api/login', data)
    .then(response => {
        console.log('Login successful', response.data);
        navigate('/DistrictList');  // Redirect to the DistrictList page
    })
    .catch(error => {
        console.error('Login error', error.response.data);
        // Optionally, handle errors here, such as displaying a login failure message
    });
};


  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div id="login-container">
      <form id="login-form" onSubmit={handleLogin}>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Adresse e-mail ou numéro de tél."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" id="login-button">Se connecter</button>
      </form>
      <button id="signup-button" onClick={toggleSignUp}>Créer nouveau compte</button>
      
      {showSignUp && <SignUpForm toggleSignUp={toggleSignUp} />}
    </div>
  );
}

function SignUpForm({ toggleSignUp }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',  // Separate field for email
    phone: '',  // Separate field for phone
    password: '',
    confirmPassword: '',
    birthDate: '',
    gender: '',
    cin: '',
    region: '',
    localDistrict: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:8000/api/register";  // Update this URL to where your Laravel API is hosted
  
    const jsonFormData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      password_confirmation: formData.confirmPassword,  // Laravel expects password_confirmation for validation
      birthDate: formData.birthDate,
      gender: formData.gender,
      cin: formData.cin,
      region: formData.region,
      localDistrict: formData.localDistrict
    };
  
    try {
      const response = await axios.post(url, jsonFormData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Registration successful! Please check your email to verify your account.');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error during registration: ' + (error.response?.data?.message || error.message));
    }
  };
  

  return (
    <div className="modal" id="signup-modal">
      <div className="modal-content" id="signup-form">
        <span className="close-button" onClick={toggleSignUp}>X</span>
        <form onSubmit={handleSubmit}>
          <input
            id="first-name"
            name="firstName"
            type="text"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            id="last-name"
            name="lastName"
            type="text"
            placeholder="Nom de famille"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
           <input
            id="email"
            name="email"
            type="email"  // Specify type as email for validation
            placeholder="Adresse e-mail"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            id="phone"
            name="phone"
            type="tel"  // Specify type as tel for phone input
            placeholder="Numéro de téléphone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <input
            id="cin"
            name="cin"
            type="text"
            placeholder="CIN"
            value={formData.cin}
            onChange={handleInputChange}
            required
          />
          <select id="region" name="region" value={formData.region} onChange={handleInputChange} required>
            {regions.map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>
          <select id="local-district" name="localDistrict" value={formData.localDistrict} onChange={handleInputChange} required>
            {constituencies.map((constituency, index) => (
              <option key={index} value={constituency}>{constituency}</option>
            ))}
          </select>
          <input
            id="birth-date"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleInputChange}
            required
          />
          <div className="gender-selection">
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleInputChange}
            />
            <label htmlFor="female">Femme</label>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleInputChange}
            />
            <label htmlFor="male">Homme</label>

                      <input
            id="password"
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          </div>
          
          <button type="submit" id="signup-submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
