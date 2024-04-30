import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import axios from 'axios';
import { regions, constituencies } from '../../../data/Districts';
import { useNavigate } from 'react-router-dom';

const Singup = ({ toggleSignUp }) => {
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
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                           <h3>Sign in</h3> 
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
				<form onSubmit={handleSubmit}>
          <input
            className="input_style"
            id="first-name"
            name="firstName"
            type="text"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            className="input_style"
            id="last-name"
            name="lastName"
            type="text"
            placeholder="Nom de famille"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
           <input
            className="input_style"
            id="email"
            name="email"
            type="email"  // Specify type as email for validation
            placeholder="Adresse e-mail"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            className="input_style"
            id="phone"
            name="phone"
            type="tel"  // Specify type as tel for phone input
            placeholder="Numéro de téléphone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <input
            className="input_style"
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
          <div className={`${styles.genderSelection} gender-selection`}>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleInputChange}
            />
            <label htmlFor="female" >Femme</label>
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
            className="input_style"
            id="password"
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            className="input_style"
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          </div>
          
          <button type="submit"  id="signup-submit" style={{ width: "15%" }}><h3>S'inscrire</h3></button>
        </form>
                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Singup;
