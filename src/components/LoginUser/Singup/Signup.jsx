import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import axios from 'axios';
// import { regions, constituencies } from '../../../data/Districts';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from "../../../api/axios";


export const constituencies = [
  "Agadir-Ida-Ou-Tanane", "Aïn Chock (Casablanca)", "Al Fida - Mers Sultan (Casablanca)", "Al Hoceïma",
  "Assa-Zag", "Azilal", "Beni Mellal", "Ben Slimane", "Berkane", "Berrechid",
  "Boujdour", "Boulmane", "Casablanca-Anfa", "Chefchaouen", "Chichaoua", "Chtouka Ait Baha",
  "El Hajeb", "El Jadida", "El Kelaa des Sraghna", "Errachidia", "Essaouira", "Fès", "Figuig", "Guelmim",
  "Guercif", "Ifrane", "Jerada", "Kénitra", "Khemisset", "Khenifra", "Khouribga", "Laâyoune",
  "Larache", "Marrakech", "M'diq-Fnideq", "Mediouna", "Meknès", "Mohammedia", "Moulay Yacoub",
  "Nador", "Nouaceur", "Ouarzazate", "Oued Ed-Dahab", "Oujda-Angad", "Rabat", "Safi", "Salé",
  "Sefrou", "Settat", "Sidi Bennour", "Sidi Ifni", "Sidi Kacem", "Sidi Slimane", "Sidi Youssef Ben Ali (Marrakech)",
  "Skhirate-Témara", "Tanger-Assilah", "Tan-Tan", "Taounate", "Taourirt", "Tarfaya", "Taroudant",
  "Tata", "Taza", "Tétouan", "Tiznit", "Youssoufia", "Zagora", "Aïn Sebaâ - Hay Mohammadi (Casablanca)",
  "Ben M'sick (Casablanca)", "Hay Hassani (Casablanca)", "Mechouar Kasba (Marrakech)", "Menara (Marrakech)",
  "Moulay Rachid (Casablanca)", "Sidi Bernoussi (Casablanca)", "Sidi Moumen (Casablanca)",
  "Al Massira (Agadir)", "Annakhil (Marrakech)", "Mouassine (Marrakech)", "Jdid (Marrakech)",
  "Sidi Youssef (Marrakech)", "El Harti (Marrakech)", "M'Hamid (Marrakech)", "Agdal (Rabat)",
  "Hassan (Rabat)", "Souissi (Rabat)", "Yacoub El Mansour (Rabat)", "Ain Atiq (Rabat)",
  "Sale Medina (Salé)", "Tabriquet (Salé)", "Bettana (Salé)", "Hay Karima (Salé)", "Hay Rahma (Salé)"
];

export const regions = [
  "Tanger-Tétouan-Al Hoceïma",
  "L'Oriental",
  "Fès-Meknès",
  "Rabat-Salé-Kénitra",
  "Béni Mellal-Khénifra",
  "Casablanca-Settat",
  "Marrakech-Safi",
  "Drâa-Tafilalet",
  "Souss-Massa",
  "Guelmim-Oued Noun",
  "Laâyoune-Sakia El Hamra",
  "Dakhla-Oued Ed-Dahab"
];


const regionDistrictMap = {
  "Tanger-Tétouan-Al Hoceïma": ["Al Hoceïma", "Chefchaouen", "Tanger-Assilah", "Tétouan", "M'diq-Fnideq", "Larache"],
  "L'Oriental": ["Berkane", "Guercif", "Jerada", "Oujda-Angad", "Nador", "Taourirt", "Figuig"],
  "Fès-Meknès": ["Fès", "Meknès", "El Hajeb", "Ifrane", "Sefrou", "Moulay Yacoub", "Khemisset", "Taza"],
  "Rabat-Salé-Kénitra": ["Rabat", "Salé", "Kénitra", "Sidi Kacem", "Sidi Slimane", "Khouribga", "Ben Slimane", "Skhirate-Témara"],
  "Béni Mellal-Khénifra": ["Beni Mellal", "Azilal", "Khenifra"],
  "Casablanca-Settat": ["Aïn Chock (Casablanca)", "Al Fida - Mers Sultan (Casablanca)", "Casablanca-Anfa", "Sidi Bernoussi (Casablanca)", "Moulay Rachid (Casablanca)", "Sidi Moumen (Casablanca)", "Ben M'sick (Casablanca)", "Aïn Sebaâ - Hay Mohammadi (Casablanca)", "Hay Hassani (Casablanca)", "Berrechid", "Settat", "El Jadida", "Sidi Bennour", "Youssoufia"],
  "Marrakech-Safi": ["Marrakech", "Chichaoua", "Essaouira", "Safi", "El Kelaa des Sraghna", "Sidi Youssef Ben Ali (Marrakech)", "Mechouar Kasba (Marrakech)", "Menara (Marrakech)", "Annakhil (Marrakech)", "Mouassine (Marrakech)", "Jdid (Marrakech)", "Sidi Youssef (Marrakech)", "El Harti (Marrakech)", "M'Hamid (Marrakech)"],
  "Drâa-Tafilalet": ["Errachidia", "Ouarzazate", "Midelt", "Tinghir", "Zagora"],
  "Souss-Massa": ["Agadir-Ida-Ou-Tanane", "Chtouka Ait Baha", "Taroudant", "Tiznit", "Tata", "Al Massira (Agadir)"],
  "Guelmim-Oued Noun": ["Guelmim", "Tan-Tan", "Sidi Ifni", "Assa-Zag"],
  "Laâyoune-Sakia El Hamra": ["Laâyoune", "Boujdour", "Tarfaya"],
  "Dakhla-Oued Ed-Dahab": ["Oued Ed-Dahab"]
};


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
	

    const [filteredDistricts, setFilteredDistricts] = useState([]);

    useEffect(() => {
      // Update the districts when region changes
      if (formData.region) {
        setFilteredDistricts(regionDistrictMap[formData.region] || []);
      }
    }, [formData.region]);


	  const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData(prevData => ({
		  ...prevData,
		  [name]: value
		}));
	  };
	
	  const handleSubmit = async (event) => {
		event.preventDefault();
		const url = "/api/register";  // Update this URL to where your Laravel API is hosted
	  
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
      await axiosClient.get('/sanctum/csrf-cookie');
		  const response =  axiosClient.post(url, jsonFormData, {
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
                      <option value="">Select a region</option>  // Placeholder option
                      {regions.map((region, index) => (
                        <option key={index} value={region}>{region}</option>
                      ))}
                    </select>
                    <select id="local-district" name="localDistrict" value={formData.localDistrict} onChange={handleInputChange} required disabled={!formData.region}>
                      <option value="">Select a district</option>  // Placeholder option
                      {filteredDistricts.map((district, index) => (
                        <option key={index} value={district}>{district}</option>
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
