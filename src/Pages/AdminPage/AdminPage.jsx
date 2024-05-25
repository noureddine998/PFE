import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../../api/constant'; // Adjust the path as needed
import './AdminPage.css';
import VerticalNav from '../../components/VerticalNav/VerticalNav';
import { axiosClient } from '../../api/axios';
import Header from '../../components/Dashboard/Header';
import Sidebar from '../../components/Dashboard/Sidebar';
import Home from '../../components/Dashboard/Home';

function AdminPage() {
    const [contract, setContract] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState();
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
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
            const response = await axiosClient.get(`/api/allocate-seats-all`, {
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

    const endElection = async () => {
        await allocateSeats();
        try {
            if (contract) {
                await contract.endElection();
                alert("Election Ended successfully!");
            } else {
                alert("Contract is not initialized properly.");
            }
        } catch (error) {
            console.error("Error starting election:", error);
            alert("Failed to end the election.");
        }
    };


    return (
        <div className="grid-container">
           <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>

            <div className="ss">
           
        </div>
            <button className="buttonsEndStart" onClick={startElection}>Commencer les élections</button>
            <button className="buttonsEndStart" onClick={endElection}>Mettre fin aux élections</button>
            {/* Add other admin functionalities here */}
        </div>
    );
}


export default AdminPage;
