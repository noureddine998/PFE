import React, { useState } from 'react';
import './LoginUser.css';
import axios from 'axios';

const constituencies = [
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

const regions = [
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
