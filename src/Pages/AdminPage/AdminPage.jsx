import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../../api/constant'; // Adjust the path as needed
import './AdminPage.css';
import VerticalNav from '../../components/VerticalNav/VerticalNav';
import { axiosClient } from '../../api/axios';


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
function AdminPage() {
    const [contract, setContract] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState();
    useEffect(() => {
        // Initialize the contract
        initContract();
    }, []);

    const initContract = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
            setContract(contractInstance);
        } else {
            console.error("Ethereum object not found, install MetaMask.");
        }
    };

    const startElection = async () => {
        try {
            if (contract) {
                await contract.startElection();
                alert("Election started successfully!");
            } else {
                alert("Contract is not initialized properly.");
            }
        } catch (error) {
            console.error("Error starting election:", error);
            alert("Failed to start the election.");
        }
    };

    const allocateSeats = async () => {
        try {
            await axiosClient.get('/sanctum/csrf-cookie');
            const response = await axiosClient.get(`/api/districts/${selectedDistrict}/set-seats`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            alert(response.data.message);
        } catch (error) {
            console.error("Error allocating seats:", error);
            alert("Failed to allocate seats.");
        }
    };

    return (
        <div className="admin-page-container">
            <VerticalNav/>
            <h1>Admin Page</h1>

            <div className="ss">
            {/* <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)}>
             {regions.map(district => (
                <option key={district} value={district}>{district}</option>
            ))}
            </select> */}

            <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)}>
            {constituencies.map(district => (
                <option key={district} value={district}>{district}</option>
            ))}
            </select>
</div>
            <button onClick={startElection}>Start Election</button>
            <button onClick={allocateSeats}>Allocate Seats to Candidates</button>
            {/* Add other admin functionalities here */}
        </div>
    );
}


export default AdminPage;
