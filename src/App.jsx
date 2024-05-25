import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './Pages/HomePage/HomePage';
import SeatsWonByPartyChart from './components/StatisticsComponents/SeatsWonByPartyChart';
import AdminPage from './Pages/AdminPage/AdminPage';
 import AdminAddCandidate from "./components/adminAddCandidate/AdminAddCandidate";

 import AdminLogin from "./components/AdminLogin/AdminLogin";
 import CreateDistrict from './components/CreateDistrict/CreateDistrict';
import DistrictsPage from './Pages/DistrictList/DistrictList';
 import CandidatesList from './Pages/CandidatesList/CandidatesList';
 import Statistics from './components/Dashboard/Statistics';
import Login from './components/LoginUser/Login/Login'; // Import the Login component
import Signup from './components/LoginUser/Singup/Signup'; // Import the Signup component
import VotingPage from './Pages/VotingPage/VotingPage';
import GenderChart from './components/StatisticsComponents/CandidateGenderChart';
import Dashboard from './components/Dashboard/Statistics';
import DistrictsListPage from './components/Dashboard/DistrictsListPage';
import CandidatesListPage from './components/Dashboard/CandidatesListPage';
import ResultsPage from './Pages/ResultsPage/ResultsPage';
import Stats from './Pages/Statistique/Stats';
import FAQPage from './Pages/FAQ/FAQ';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          
          <Route path='/Stats' element={<Stats />} />
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/districtsListPage' element={<DistrictsListPage />} />
          <Route path='/CandidatesListPage' element={<CandidatesListPage />} />

          <Route path='/seats' element={<SeatsWonByPartyChart />} />
          <Route path='/Results' element={<ResultsPage />} />
          <Route path='/faq' element={<FAQPage />} />




           <Route path='/CreateDistrict' element={<CreateDistrict />} />
           <Route path='/genderchart' element={<GenderChart />} />
          <Route path='/DistrictList' element={<DistrictsPage />} />
          <Route path='/CandidatesList' element={<CandidatesList />} />
          <Route path='/adminAddCandidate' element={<AdminAddCandidate />} />
          <Route path='/AdminPage' element={<AdminPage />} />
             <Route path='/' element={<HomePage />} />
            
            <Route path='/statistics' element={<Statistics />} />
            
          
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/votingpage' element={<VotingPage />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
