// import React,{ useEffect } from 'react'
// import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
// import "leaflet/dist/leaflet.css"
// import L from "leaflet";

// const icon = L.icon({
//     iconUrl: "./placeholder.png",
//     iconSize: [38,38]
// });
// const position = [51.505, -0.09]

// function ResetCenterView(props) {
//     const { selectPosition } =props;
//     const map = useMap();

//     useEffect(() =>{
//         if(selectPosition){
//             map.setView(
//                 L.latLng(selectPosition?.lat,selectPosition?.lon),
//                 map.getZoom(),
//                 {
//                     animate: true
//                 }
//             )
//         }
//     }, [selectPosition]);
//     return null;
// }

// export default function Maps(props){
//     const { selectPosition } = props;
//     const locationSelection = [selectPosition?.lat,selectPosition?.lon];

//     return (
//     <MapContainer center={position} zoom={8} scrollWheelZoom={false} style={{ width : '100%', height :'100%'}}>
//         <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=dZb4duSqbUmMALaHp8cK"
//         />
//         {selectPosition && (
//         <Marker position={locationSelection} icon={icon}>
//         <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//         </Marker>
//         )}
//         <ResetCenterView selectPosition={selectPosition}/>
//     </MapContainer>
//     )
// }

import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({
  iconUrl: './placeholder.png',
  iconSize: [38, 38],
});

const defaultPosition = [9.9312, 76.2673]; // Default position (e.g., Kochi)

function ResetCenterView({ selectPosition }) {
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [selectPosition, map]);

  return null;
}

export default function Maps({ selectPosition, loca }) {
  return (
    <MapContainer center={defaultPosition} zoom={12} scrollWheelZoom={false} style={{ width: '100%', height: '400px' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=dZb4duSqbUmMALaHp8cK"
      />
      {selectPosition && (
        <Marker position={[selectPosition?.lat, selectPosition?.lon]} icon={icon}>
          <Popup>
            Selected Position: {selectPosition.name}
          </Popup>
        </Marker>
      )}
      {loca.map((place, index) => (
        <Marker key={index} position={[place.lat, place.lon]} icon={icon}>
          <Popup>
            {place.name}
          </Popup>
        </Marker>
      ))}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}
