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
                    <h1>Genre</h1>
                <CandidateGenderChart/>
                </div>
           </div>
           <div className='statsContainer'>
                <div className='chart'>
                    <h1>Sièges gagnés</h1>
                <SeatsWonByPartyChart/>
                </div>
           </div>
           </div>
           <div className='bigContainer'>
           <div className='statsContainer'>
                <div className='chart'>
                    <h1>Age</h1>
                <AgeDistributionChart/>
                </div>
           </div>
           <div className='statsContainer'>
                <div className='chart'>
                    <h1>Vote</h1>
                <VotingPercentageChart/>
                </div>
           </div>
           </div>
           
           
           
        </div>
    );
}

export default Stats;
