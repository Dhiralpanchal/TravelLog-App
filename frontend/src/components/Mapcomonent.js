import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import '../styles/styles.css';
import SearchBar from './SearchBar';
import PinMarker from './PinMarker';

function MapComponent() {
  const [coords, setCoords] = useState(null);
  const [pinData, setPinData] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(13);
  const [buttonText, setButtonText] = useState('Add Pin');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  

  useEffect(() => {
    const fetchCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
          setCurrentLocation({ latitude, longitude });
          console.log(position.coords);
        },
        (error) => {
          console.error('Error getting current position:', error);
        },
        { maximumAge: 0 }
      );
    };
  
    fetchCurrentPosition();
  }, []);
  
  useEffect(() => {
    const fetchPins = async () => {
      try {
       
        const response = await fetch('http://localhost:3000/api/pins');
        if (response.ok) {
          const pins = await response.json();
          const loggedInUser = localStorage.getItem('username');
          const userPins = pins.filter((pin) => pin.username === loggedInUser);
          setPinData(userPins);
        } else {
          console.error('Failed to fetch pins:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching pins:', error);
      }
    };
    fetchPins();
  }, []);

  
  
  const markerIcon = (color) => {
    let markerColor = 'red';
    if (color === 'blue') {
      markerColor = 'blue';
    }

    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${markerColor}.png`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
    });
  };

  const handleSearch = (input) => {
    if (pinData) {
      const filteredPins = pinData.filter((pin) => {
        const pinTitle = pin.title ? pin.title.toLowerCase() : '';
        return pinTitle.includes(input);
      });

      if (filteredPins.length > 0) {
        setCoords({ latitude: filteredPins[0].lat, longitude: filteredPins[0].long });
        setZoomLevel(15);
        setSearchResults(filteredPins);
        setIsSearching(true);
      }
    }
  };

  const handleBack = () => {
    setSearchResults([]);
    setIsSearching(false);
    setCoords(currentLocation);
    setZoomLevel(13);
  };

  const handlePinSubmit = async () => {
    try {
      const pinData = {
        username:localStorage.getItem('username'),
        title,
        description,
        rating,
        lat: coords.latitude,
        long: coords.longitude,
      };

      const response = await fetch('http://localhost:3000/api/pins', {
        method: 'POST',
         headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(pinData),
      });

      if (response.ok) {
        const savedPin = await response.json();
        console.log('Pin saved:', savedPin);
        setButtonText('Pin Added');
      } else {
        console.log('Failed To Save Pin:', response.statusText);
      }
    } catch (err) {
      console.log('Error Saving Pin', err);
    }
  };

  if (!coords) {
    return <div>Loading...</div>;
  }

  const { latitude, longitude } = coords;

  return (
    <div className="map-container">
      {!isSearching && <SearchBar handleSearch={handleSearch} />}

      {!isSearching ? (
        <MapContainer center={[latitude, longitude]} zoom={zoomLevel}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {pinData.map((pin) => (
            <PinMarker key={pin._id} pin={pin} markerIcon={markerIcon} currentLocation={currentLocation}/>
          ))}
          <Marker position={[latitude, longitude]} icon={markerIcon('blue')}>
            <Popup>
              <div>
                <h3>{buttonText === 'Pin Added' ? 'Pin Added' : 'Add Pin'}</h3>
                {buttonText !== 'Pin Added' && (
                  <div>
                    <input
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Rating(0-5)"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                    <button onClick={handlePinSubmit}>{buttonText}</button>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div className="container-back">
          <button  className="btn btn-danger" onClick={handleBack}>Back</button>
          <h4>Searched Results:</h4>
          <MapContainer center={[latitude, longitude]} zoom={zoomLevel}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {searchResults.map((pin) => (
              <PinMarker key={pin._id} pin={pin} markerIcon={markerIcon} />
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default MapComponent
