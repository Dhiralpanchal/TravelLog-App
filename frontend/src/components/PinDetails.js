import React, { useEffect, useState } from 'react';

function PinDetails() {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pins');
        if (response.ok) {
          const pinsData = await response.json();
          const loggedInUser = localStorage.getItem('username');
          const userPins = pinsData.filter((pin) => pin.username === loggedInUser);
          setPins(userPins);
        } else {
          console.log('Failed to fetch pins');
        }
      } catch (err) {
        console.log('Error fetching pins');
      }
    };
    fetchPins();
  }, []);

  return (
    <div className="container-card">
    
      <div className="row">
        {pins.map((pin) => (
          <div className="col-sm-4" key={pin.id}>
            <div className="card mb-3 " > 
                <h3 className="card-header">{pin.title}</h3>
                <p className="card-text">Description: {pin.description}</p>
                <p className="card-text">Rating:{pin.rating}</p>
                <p className="card-text">Created Time: {pin.createdAt}</p>  
                <p className="card-text">Latitude:{pin.lat}</p>
                <p className="card-text">Longitude:{pin.long}</p>
                
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PinDetails;
