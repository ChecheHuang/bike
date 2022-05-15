import React, { useState } from "react";
import "./map.scss";
import GoogleMapReact from "google-map-react";




function Map(props) {
 
  const [position, setPosition] = useState({ lat: 25.047675, lng: 121.517055 });
  
  return (
    <>
      <div className="mapContainer">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
          defaultCenter={position}
          center={position}
          defaultZoom={18}
          margin={[50, 50, 50, 50]}
          options={""}
          onChange={(e) => {
          
          }}
          onChildClick={""}
        >
          
          
        </GoogleMapReact>
      </div>
     
    </>
  );
}
export default Map;
