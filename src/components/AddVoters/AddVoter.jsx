import React from 'react';
import './AddVoter.css';



const AddVoter = () => {
  

  return (
    <div className="form-container">
      <h1>Add Voter</h1>
      <form >
        <label>
          Email:
        <label>
          
          <input type='Email' className='email' />
        </label>
        </label>
        
        
        <button type="submit">Add</button>
      </form>
      
    </div>
  );
};

export default AddVoter;
