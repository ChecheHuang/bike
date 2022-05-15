import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

import "./detailMap.scss";
export default function DetailMap({ nearbyDetailData }) {
  const { position, name } = nearbyDetailData;
  return (
    <>
      <div className="detailMap">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
            center={position}
            zoom={18}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
              <Marker
              label={{
                text: name,
                textAlign:"start",
                color:  "red",
                fontSize: "24px",
                fontWeight:"600",
                className: "label",
              }}
                position={position}
              />
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}
