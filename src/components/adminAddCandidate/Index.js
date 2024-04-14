


import React, { useState } from "react";
import './style.css';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    age: '',
    qualification: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any validation or additional actions before submitting the form
    // For now, let's just log the form data
    console.log(formData);
  };

  return (
    <div className="wrapper">
      <div className="sidebar" data-color="green" data-background-color="white" data-image="./assets/img/sidebar-1.jpg">
        <div className="sidebar-wrapper">
          <ul className="nav" style={{ marginTop: '50px' }}>
            <li className="nav-item">
              <a className="nav-link" href="/">
                
                <p>Candidate Details</p>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">
                
                <p>Add Candidate</p>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/table_view">
                
                <p>Register</p>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/changePhase">
                
                <p>Change State</p>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/logout">
                
                <p>LogOut</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-panel">
        <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
          <div className="container-fluid">
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon icon-bar"></span>
              <span className="navbar-toggler-icon icon-bar"></span>
              <span className="navbar-toggler-icon icon-bar"></span>
            </button>
          </div>
        </nav>

        <div className="content">
          <div className="container" style={{ width: '800px' }}>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header card-header-success">
                    <h4 className="card-title">Add Candidate Information</h4>
                  </div>
                  <br />
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-4">
                        <div className="col">
                          <div className="form-outline">
                            <input type="text" id="name" className="form-control" value={formData.name} onChange={handleChange} required />
                            <label className="form-label" htmlFor="name">Name</label>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-outline">
                            <input type="text" id="party" className="form-control" value={formData.party} onChange={handleChange} required />
                            <label className="form-label" htmlFor="party">Party</label>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col">
                          <div className="form-outline">
                            <input type="text" id="age" className="form-control" value={formData.age} onChange={handleChange} required />
                            <label className="form-label" htmlFor="age">Age</label>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-outline">
                            <input type="text" id="qualification" className="form-control" value={formData.qualification} onChange={handleChange} required />
                            <label className="form-label" htmlFor="qualification">Qualification</label>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-success btn-block mb-4">Add</button>
                    </form>
                  </div>
                  <div className="alert alert-success" id="loader">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"></button>
                    <span><b> Candidate </b> has been added Successfully....!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

