import React, { useState, useEffect } from 'react';
import './CreateDistrict.css';

// Define DistrictType enum
const DistrictType = {
  local: 'local',
  regional: 'regional'
};

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

const CreateDistrict = ({ onSubmit }) => {
  const [districtType, setDistrictType] = useState(DistrictType.local); // Default to 'local'
  const [districtName, setDistrictName] = useState('');
  const [seatsToWin, setSeatsToWin] = useState(0);
  const [districtOptions, setDistrictOptions] = useState([]);

  useEffect(() => {
    if (districtType === DistrictType.local) {
      setDistrictOptions(constituencies);
    } else if (districtType === DistrictType.regional) {
      setDistrictOptions(regions);
    }
    setDistrictName('');
  }, [districtType]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      districtType,
      districtName,
      seatsToWin
    });
  };

  return (
    <div className="form-container">
      <h1>Create District</h1>
      <form onSubmit={handleSubmit}>
        <label>
          District Type:
          <select value={districtType} onChange={e => setDistrictType(e.target.value)}>
            <option value={DistrictType.local}>Local</option>
            <option value={DistrictType.regional}>Regional</option>
          </select>
        </label>
        <label>
          District Name:
          <select value={districtName} onChange={e => setDistrictName(e.target.value)} required>
            <option value="">Select District Name</option>
            {districtOptions.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </label>
        <label>
          Seats to Win:
          <input type="number" value={seatsToWin} onChange={e => setSeatsToWin(parseInt(e.target.value, 10))} required />
        </label>
        <button type="submit">Create District</button>
      </form>
      <div className="note">
        Note: District creation will take several minutes.
      </div>
    </div>
  );
};

export default CreateDistrict;
