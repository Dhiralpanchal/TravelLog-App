/*import React from 'react'
import { Link } from 'react-router-dom';
import bgimage from 'D:/TravelLog/frontend/src/styles/imgtravel.png';
function Home() {
  return (
    <div className='my-5'>
      <div>
        <h1 className='primary-text'>Welcome To The TravelTrack App</h1>
        <p className='container'>Please <Link to="/login">Login</Link> To Access The Map.</p>
      </div>
      
        <div className="image-container">
          <img src={bgimage} alt="Transparent Image" className="transparent-image" />
        </div>
      </div>
      )
}

      export default Home;*/
import React from 'react';
import { Link } from 'react-router-dom';
import bgimage from 'G:\Dhiral Work\TravelLog\frontend\src\styles\imgtravel.png';

function Home() {
  return (
    <div className='landing-page'>
      <div className='landing-content'>
        <div className='text-container'>
          <h1 className='primary-text'>Welcome To The TravelTrack App</h1>
          <p className='container'>Preserve your travel memories with personalized pins. Add the placename, rating, and other details to make it unforgettable.</p>
          <Link to="/login" className="cta-button">Start Now</Link>
        </div>
        <div className="image-container">
          <img src={bgimage} alt="Transparentside" className="transparent-image" />
        </div>
      </div>
    </div>
  );
}

export default Home;


