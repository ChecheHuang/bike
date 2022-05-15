import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import blackMarkerStart from "./images/blackMarkerStart.png";
import blackMarkerEnd from "./images/blackMarkerEnd.png";
import "./findMap.scss";

export default function FindMap({ bikeLane }) {
  const string = bikeLane.Geometry.replace("MULTILINESTRING ", "");
  const polyline = string
    .replaceAll("(", "")
    .replaceAll(")", "")
    .split(",")
    .map((i) => {
      const newItem = i.split(" ");
      return { lat: parseFloat(newItem[1]), lng: parseFloat(newItem[0]) };
    });
  const startAndEnd = [
    {
      url: blackMarkerStart,
      position: { lat: polyline[0].lat, lng: polyline[0].lng },
    },
    { url: blackMarkerEnd, position: [...polyline].pop() },
  ];
  return (
    <>
      <div className="detailMap">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
            center={{ lat: polyline[0].lat, lng: polyline[0].lng }}
            zoom={18}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <>
              {startAndEnd.map((item, index) => {
                return (
                  <Marker
                    icon={{
                      url: item.url,
                    }}
                    position={item.position}
                    key={index}
                  />
                  
                );
              })}

              <Polyline
                path={polyline}
                options={{
                  strokeColor: "black",
                  strokeOpacity: 0,
                  strokeWeight: 3,
                  fillColor: "black",
                  fillOpacity: 0.35,
                  clickable: false,
                  draggable: false,
                  editable: false,
                  visible: true,
                  radius: 100000,
                  paths: polyline,
                  zIndex: 1,
                  icons: [
                    {
                      icon: {
                        path: "M 0,-1 0,-0.5",
                        strokeOpacity: 1,
                        scale: 6,
                      },
                      offset: "0",
                      repeat: "20px",
                    },
                  ],
                }}
              />
            </>
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}
