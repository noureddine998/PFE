import React, { useState } from 'react';
import './LoginUser.css';
import axios from 'axios';
import {regions , constituencies} from '../../data/Districts';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
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
    emailOrPhone: '',
    birthDate: '',
    gender: '',
    cin: '',
    region: '',  // Region field
    localDistrict: ''  // Local District field
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = "http://localhost/PFE_V_PHP/voters.php";
    let fData = new FormData();

    Object.keys(formData).forEach(key => {
      fData.append(key, formData[key]);
    });

    axios.post(url, fData)
      .then(response => alert('Registration successful!'))
      .catch(error => alert('Error during registration: ' + error.message));
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
              id="email-or-phone"
              name="emailOrPhone"
              type="text"
              placeholder="Numéro mobile ou e-mail"
              value={formData.emailOrPhone}
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
            </div>
            <button type="submit" id="signup-submit">S'inscrire</button>
          </form>
        </div>
      </div>
    );
  
}


export default LoginForm;
