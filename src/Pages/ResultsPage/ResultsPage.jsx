import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosClient } from '../../api/axios';
import './ResultsPage.css';
import RNI from './logos/RNI.jpg'; 
import PJD from './logos/PJD.jpg';
import PAM from './logos/PAM.jpg';
import PI from './logos/PI.jpg';
import USFP from './logos/USFP.jpg';
import PPS from './logos/PPS.jpg';
import MP from './logos/MP.jpg';
import UC from './logos/UC.jpg';
import FFD from './logos/FFD.jpg';
import FGD from './logos/FGD.jpg';
import banner from './logos/maroc.png';
import Navbar from '../../components/Navbar/Navbar';

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

const partyLogos = {
    "Rassemblement National des Indépendants (RNI)": RNI,
    "Parti de la Justice et du Développement (PJD)": PJD,
    "Parti Authenticité et Modernité (PAM)": PAM,
    "Parti de l'Istiqlal (PI)": PI,
    "Union Socialiste des Forces Populaires (USFP)": USFP,
    "Parti du Progrès et du Socialisme (PPS)": PPS,
    "Mouvement Populaire (MP)": MP,
    "Union Constitutionnelle (UC)": UC,
    "Front des Forces Démocratiques (FFD)": FFD,
    "Fédération de la Gauche Démocratique (FGD)": FGD
};

function ResultsPage() {
    const [localCandidates, setLocalCandidates] = useState([]);
    const [regionalCandidates, setRegionalCandidates] = useState([]);
    const [formData, setFormData] = useState({ region: "", localDistrict: "" });
    const [showTables, setShowTables] = useState(false);
    const [filteredDistricts, setFilteredDistricts] = useState([]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
        if (name === 'region') {
            setFilteredDistricts(regionDistrictMap[value] || []);
        }
    };

    const fetchCandidates = (district_type, district_name) => {
        axiosClient.get(`/api/candidates/${district_type}/${district_name}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(response => {
                if (district_type === 'local') {
                    setLocalCandidates(response.data);
                } else {
                    setRegionalCandidates(response.data);
                }
                setShowTables(true);
            })
            .catch(error => {
                console.error(`Error fetching ${district_type} district candidates`, error);
            });
    };

    const handleSearch = () => {
        fetchCandidates('local', formData.localDistrict);
        fetchCandidates('regional', formData.region);
    };

    // Sort candidates by seats won in descending order before rendering
   localCandidates.sort((a, b) => b.seatsWon - a.seatsWon);
   regionalCandidates.sort((a, b) => b.seatsWon - a.seatsWon);

    return (
        <div className="VotingPageContainer">
            <header className="VotingPageHeader">
                <div>
                    <Navbar></Navbar>
                </div>
            </header>
            <div className='resultsSearch'>
            <h1>Election results</h1>
            <select id="region" name="region" value={formData.region} onChange={handleInputChange} required>
                <option value="">Select a region</option>  {/* Placeholder option */}
                {regions.map((region, index) => (
                    <option key={index} value={region}>{region}</option>
                ))}
            </select>
            <select id="local-district" name="localDistrict" value={formData.localDistrict} onChange={handleInputChange} required disabled={!formData.region}>
                <option value="">Select a district</option>  {/* Placeholder option */}
                {filteredDistricts.map((district, index) => (
                    <option key={index} value={district}>{district}</option>
                ))}
            </select>
            <button type="button" onClick={handleSearch}>Search</button>
            </div>
            {showTables && (
                <>
                    <h1>Local District Candidates</h1>
                    <table className="district-table">
                        <thead>
                            <tr>
                                <th>Party logo</th>
                                <th>Party</th>
                                <th>Name</th>
                                <th>District</th>
                                <th>Vote count</th>
                                <th>Seats Won</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localCandidates.map(candidate => (
                                <tr key={candidate.id}>
                                    <td> <img src={partyLogos[candidate.party]} alt={`Logo of ${candidate.party}`} width={50} height={50} /></td>
                                    <td>{candidate.party}</td>
                                    <td>{candidate.full_name}</td>
                                    <td>{candidate.district_name}</td>
                                    <td>{candidate.voteCount}</td>
                                    <td>{candidate.seatsWon}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h1>Regional Candidates</h1>
                    <table className="district-table">
                        <thead>
                            <tr>
                                <th>Party logo</th>
                                <th>Party Name</th>
                                <th>Name</th>
                                <th>Region</th>
                                <th>Vote count</th>
                                <th>Seats Won</th>
                            </tr>
                        </thead>
                        <tbody>
                            {regionalCandidates.map(candidate => (
                                <tr key={candidate.id}>
                                    <td> <img src={partyLogos[candidate.party]} alt={`Logo of ${candidate.party}`} width={50} height={50} /></td>
                                    <td>{candidate.party}</td>
                                    <td>{candidate.full_name}</td>
                                    <td>{candidate.district_name}</td>
                                    <td>{candidate.voteCount}</td>
                                    <td>{candidate.seatsWon}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default ResultsPage;
