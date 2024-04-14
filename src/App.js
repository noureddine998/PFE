import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';


import Header from './components/Header/header';
import Login from './components/AdminLogin/Login';
import AdminAddCandidate from "./components/adminAddCandidate/Index";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
       
        
        <Routes>
        <Route exact path='/' element={<div className="background-container"><Header /></div>} />
          <Route path='/login' element={<Login />} />
          <Route path='/adminAddCandidate' element={<div className="page-with-background"><AdminAddCandidate /></div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
