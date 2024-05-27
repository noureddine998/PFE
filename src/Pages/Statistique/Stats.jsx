import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SeatsWonByPartyChart from '../../components/StatisticsComponents/SeatsWonByPartyChart';
import CandidateGenderChart from '../../components/StatisticsComponents/CandidateGenderChart';
import AgeDistributionChart from '../../components/StatisticsComponents/AgeDistributionsChart';
import './Stats.css';
import VotingPercentageChart from '../../components/StatisticsComponents/VotingPercentageChart';
function Stats() {


    return (
        <div className="VotingPageContainer">
            <header className="VotingPageHeader">
                <div>
                    <Navbar></Navbar>
                </div>
            </header>
            <div className='bigContainer'>
            <div className='statsContainer'>
                <div className='chart'>
                    <h1>Répartition des élus selon le sexe</h1>
                <CandidateGenderChart/>
                </div>
           </div>
           <div className='statsContainer'>
                <div className='chart'>
                    <h1>Répartition des sièges selon les partis politiques</h1>
                <SeatsWonByPartyChart/>
                </div>
           </div>
           </div>
           <div className='bigContainer'>
           <div className='statsContainer'>
                <div className='chart'>
                    <h1>Répartition des élus selon les tranches d'âge</h1>
                <AgeDistributionChart/>
                </div>
           </div>
           <div className='statsContainer'>
                <div className='chart'>
                    <h1>Taux de participation</h1>
                <VotingPercentageChart/>
                </div>
           </div>
           </div>
           
           
           
        </div>
    );
}

export default Stats;
