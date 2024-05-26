import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import axios from 'axios';
import { ethers } from 'ethers';
import { contractAddress, contractAbi } from '../../../api/constant';
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

const calculateAge = (birthDate) => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
  }

  return age;
};

const Signup = ({ toggleSignUp }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    gender: '',
    cin: '',
    region: '',
    localDistrict: ''
  });

  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [isEligible, setIsEligible] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleTwoFactorChange = (event) => {
    setTwoFactorCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    

    try {
      axiosClient.get('/sanctum/csrf-cookie');
      const response = await axiosClient.post('api/check-eligibility', {
        cin: formData.cin,
        phone: formData.phone,
        firstName: formData.firstName,
        lastName: formData.lastName
      });

      if (!response.data.eligible) {
        alert('You are not eligible to register.');
        return;
      }

      setTwoFactorEnabled(true);
    } catch (error) {
      console.error('Error during eligibility check:', error);
      alert('There was an error with your eligibility check.');
    }
  };

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

  const handleVoterRegistration = async (age, cin, region, localDistrict) => {
    try {
        if (!window.ethereum) {
            alert("MetaMask is not installed. Please install it to use this app.");
            return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        const tx = await contract.voterRegistration(age, cin, region, localDistrict);
        await tx.wait(); // Wait for the transaction to be mined
        return tx; // Return transaction details
    } catch (error) {
        console.error("Error registering voter:", error);
        throw new Error(`Failed to register voter: ${error.message}`);
    }
};


  const handleTwoFactorSubmit = async (event) => {
    event.preventDefault();

    if (twoFactorCode !== '25422') {
      alert('Incorrect 2FA code.');
      return;
    }

    try {

      const age = calculateAge(formData.birthDate);
      await handleVoterRegistration(age, formData.cin, formData.region, formData.localDistrict);

      await axiosClient.get('/sanctum/csrf-cookie');
      axiosClient.post('api/register', jsonFormData, {
        headers: {
          'Content-Type': 'application/json'
        }
        });

        

      alert('User registered successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('There was an error with your registration.');
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
          {!twoFactorEnabled ? (
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
                type="email"
                placeholder="Adresse e-mail"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                className="input_style"
                id="phone"
                name="phone"
                type="tel"
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
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a region</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>{region}</option>
                ))}
              </select>
              <select
                id="local-district"
                name="localDistrict"
                value={formData.localDistrict}
                onChange={handleInputChange}
                required
                disabled={!formData.region}
              >
                <option value="">Select a district</option>
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
              <button type="submit" id="signup-submit" >

                <h3>S'inscrire</h3>
              </button>
            </form>
          ) : (
            <form onSubmit={handleTwoFactorSubmit}>
              <input
                className="input_style"
                id="two-factor-code"
                name="twoFactorCode"
                type="text"
                placeholder="Enter 2FA Code"
                value={twoFactorCode}
                onChange={handleTwoFactorChange}
                required
              />
              <button type="submit" id="verify-code" style={{ width: "15%" }}>
                <h3>Verify</h3>
              </button>
            </form>
          )}
          {/* <p>Already have an account? <Link to="/login">Log in</Link></p> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
