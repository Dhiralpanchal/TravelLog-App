
import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

function PinMarker({ pin, markerIcon, currentLocation }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState(pin.description);
  const [editedRating, setEditedRating] = useState(pin.rating);

  const updatePin = async (pinToUpdate) => {
   
    try {
      const response = await fetch(`http://localhost:3000/api/pins/${pinToUpdate._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify(pinToUpdate),
      });

      if (response.ok) {
        const updatedPin = await response.json();
        console.log('Pin updated:', updatedPin);
      } else {
        console.log('Failed to update pin:', response.statusText);
      }
    } catch (err) {
      console.log('Error updating pin:', err);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedDescription(pin.description);
    setEditedRating(pin.rating);
  };

  const handleSaveEdit = () => {
    pin.description = editedDescription;
    pin.rating = editedRating;
    setIsEditMode(false);
    updatePin(pin);
  };

  return (
    <Marker key={pin._id} position={[pin.lat, pin.long]} icon={markerIcon('red')}>
      <Popup>
        <div>
          {isEditMode ? (
            <>
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <input
                type="number"
                value={editedRating}
                onChange={(e) => setEditedRating(e.target.value)}
              />
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{pin.title}</h3>
              <p>Description: {pin.description}</p>
              <p>Rating: {pin.rating}</p>
              <p>Added by: {pin.username}</p>
              <p>Latitude: {pin.lat}</p>
              <p>Longitude: {pin.long}</p>
              {currentLocation &&
                Math.abs(pin.lat - currentLocation.latitude) < 0.0001 &&
                Math.abs(pin.long - currentLocation.longitude) < 0.0001 && (
                  <button onClick={handleEdit}>Edit</button>
                )}
            </>
          )}
        </div>
      </Popup>
    </Marker>
  );
}

export default PinMarker;















/*{currentLocation &&
                Math.abs(pin.lat - currentLocation.latitude) < 0.0001 &&
                Math.abs(pin.long - currentLocation.longitude) < 0.0001 && (
                  <button onClick={handleEdit}>Edit</button>
                )} */