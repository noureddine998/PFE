import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import AdminPage from './Pages/AdminPage/AdminPage';
import AdminAddCandidate from "./components/adminAddCandidate/AdminAddCandidate";
import HomePage from './Pages/HomePage/HomePage';
import AdminLogin from "./components/AdminLogin/AdminLogin";
import CreateDistrict from './components/CreateDistrict/CreateDistrict';
import DistrictsPage from './Pages/DistrictList/DistrictList';
import CandidatesList from './Pages/CandidatesList/CandidatesList';
import VoterList from './Pages/VoterList/VoterList';
import AddVoter from './components/AddVoters/AddVoter';
import Login from './components/LoginUser/Login/Login'; // Import the Login component
import Signup from './components/LoginUser/Singup/Singup'; // Import the Signup component
import VotingPage from './Pages/VotingPage/VotingPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/adminAddCandidate' element={<AdminAddCandidate />} />
          <Route path='/AdminPage' element={<AdminPage />} />
          <Route path='/AdminLogin' element={<AdminLogin />} />
          <Route path='/CreateDistrict' element={<CreateDistrict />} />
          <Route path='/DistrictList' element={<DistrictsPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/CandidatesList' element={<CandidatesList />} />
          <Route path='/VoterList' element={<VoterList />} />
          <Route path='/addVoter' element={<AddVoter />} />
          {/* Add routes for Login and Signup */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/votingpage' element={<VotingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
