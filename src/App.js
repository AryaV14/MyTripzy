import React, { useState } from 'react';
import clusterPlaces from './cluster';
import './App.css';
import Maps from './Maps';
import SearchBox from './SearchBox';
import { haversine } from './haversine';

const DistanceMatrix = [
  [0, 1, 4, 14, 21, 4, 10, 17],
  [1, 0, 4, 14, 21, 4, 10, 17],
  [4, 4, 0, 10, 21, 2, 7, 13],
  [14, 14, 10, 0, 27, 10, 10, 8],
  [21, 21, 21, 27, 0, 21, 20, 26],
  [4, 4, 2, 10, 21, 0, 6, 13],
  [10, 10, 7, 10, 20, 6, 0, 8],
  [17, 17, 13, 8, 26, 13, 8, 0]
];

const locations = [
  'Fort Kochi', 'Santa Cruz Basilica & Kerala Kathakali Centre',
  'Marine Drive & Broadway MetharBazar', 'Hill Palace Museum',
  'Cherai Beach', 'Mangalavanam Bird Sanctuary', 'Lulumall Kochi',
  'Wonderla Amusement Park'
];



function App() {
  const [numDays, setNumDays] = useState(4);
  const [maxDistancePerDay, setMaxDistancePerDay] = useState(20);
  const [clusters, setClusters] = useState([]);
  const [selectPosition,setSelectPosition]= useState(null);
  const [loca, setLoca] = useState([]);
  console.log(loca);
  

  const handleNumDaysChange = (event) => {
    setNumDays(parseInt(event.target.value));
  };

  const handleMaxDistanceChange = (event) => {
    setMaxDistancePerDay(parseInt(event.target.value));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (loca.length === 0) {
      console.error("No locations selected");
      return;
    }
    const distanceMatrix = loca.map((place1, index1) =>
      loca.map((place2, index2) => index1 === index2 ? 0 : haversine(place1.lat, place1.lon, place2.lat, place2.lon))
    );
    console.log(distanceMatrix);
    const clustersResult = clusterPlaces(distanceMatrix, numDays, maxDistancePerDay,loca);
    setClusters(clustersResult);
  };
  const addPlaceToLoca = (place) => {
    setLoca([...loca, { name: place.display_name, lat: place.lat, lon: place.lon }]);
  };

  const removePlaceFromLoca = (index) => {
    setLoca(loca.filter((_, i) => i !== index));
  };


  return (
    <div className="App">
      <h1>Travel Itinerary Planner</h1>
      <div className="places">
        <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} addPlaceToLoca={addPlaceToLoca} loca={loca}/>
      </div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="numDays">Number of Days:</label>
        <input
          type="number"
          id="numDays"
          name="numDays"
          value={numDays}
          onChange={handleNumDaysChange}
          min="1"
          max="7"
          required
        />

        <label htmlFor="maxDistancePerDay">Max Distance per Day (km):</label>
        <input
          type="number"
          id="maxDistancePerDay"
          name="maxDistancePerDay"
          value={maxDistancePerDay}
          onChange={handleMaxDistanceChange}
          min="1"
          required
        />

        

        <button type="submit">Plan Itinerary</button>
      </form>

      {/* <div className="clusters-container">
        {clusters.length > 0 && (
          clusters.map((cluster, index) => (
            <div key={index} className="cluster">
              <h2>Cluster {index + 1}</h2>
              <ul>
                {cluster.map(placeIndex => (
                  // <li key={placeIndex}>{locations[placeIndex]}</li>
                  <li key={placeIndex}>{loca[placeIndex].name}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div> */}

<div className="loca-list">
        <h2>Selected Places</h2>
        <ul>
          {loca.map((place, index) => (
            <li key={index}>
              {place.name}
              <button onClick={() => removePlaceFromLoca(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

{/* 
<div className="clusters-container">
        {clusters.length > 0 && clusters.map((cluster, index) => (
          <div key={index} className="cluster">
            <h2>Day {index + 1}</h2>
            <ul>
              {cluster.places.map((place, placeIndex) => (
                <li key={placeIndex}>
                  <div>{place.name}</div>
                  <div>Leave: {place.leaveTime}</div>
                  <div>Arrive: {place.arriveTime}</div>
                  <div>Distance: {place.distance.toFixed(2)} km</div>
                </li>
              ))}
            </ul>
            <p>Total Distance: {cluster.totalDistance.toFixed(2)} km</p>
          </div>
        ))}
      </div> */}
<div className="clusters-container">
        {clusters.length > 0 && (
          clusters.map((cluster, index) => (
            <div key={index} className="cluster">
              <h2>Day {index + 1}</h2>
              <ul>
                {cluster.places.map((place, idx) => (
                  <li key={idx}>
                    <strong>{place.name}</strong> - Distance: {place.distance} km<br />
                    Leave Time: {place.leaveTime}, Arrive Time: {place.arriveTime}
                  </li>
                ))}
                <p>Total Distance: {cluster.totalDistance} km</p>
              </ul>
            </div>
          ))
        )}
      </div>

      <div className="maps">
        <Maps selectPosition={selectPosition} loca={loca}  />
      </div>
    </div>
  );
}

export default App;
