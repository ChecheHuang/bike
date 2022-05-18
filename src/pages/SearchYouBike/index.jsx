import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  InfoWindow,
  InfoBox,
} from "@react-google-maps/api";
import axios from "axios";
import Lottie from "react-lottie";
import { getAuthorizationHeader, citys } from "../../api";
import search from "./images/search.png";
import gps from "./images/GPS.png";
import yellowMarker from "./images/yellowMarker.png";
import blackMarker from "./images/blackMarker.png";
import grayMarker from "./images/grayMarker.png";
import centerImage from "../../youbike_GPS.json";
import "./searchYouBike.scss";
export default function SearchYouBike({ rent, showStreet }) {
  const [position, setPosition] = useState({ lat: 25.047675, lng: 121.517055 });
  const [data, setData] = useState([]);
  const [autoComplete, setAutoComplete] = useState([]);
  const [originAutoComplete, setOriginAutoComplete] = useState([]);
  const [polyLinesGroups, setPolyLinesGroups] = useState([]);
  const [autoStatus, setAutoStatus] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [cityName, setCityName] = useState("Taipei")

  const [map, setMap] = useState(null);
  const [info, setInfo] = useState({});
  function nearby(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(async function (position) {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&language=zh-TW&key=${process.env.REACT_APP_GOOGLE_KEY}`
        );
        const re = /[\d\w\s+]/g;

        const chineseCityName = response.data.plus_code.compound_code
          .replace(re, "")
          .replace("台灣", "")
          .substring(0, 3);
        const cityName = citys.find(item => { return item.city===chineseCityName}).english
        setCityName(cityName)
      },function(){alert("GPS取得失敗")},{enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0});
    }else{
      alert("目前GPS無法定位");
    }
  }


  useEffect(() => {
    (async function () {
      const response1 = await axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?%24spatialFilter=nearby(${position.lat}%2C%20${position.lng}%2C%201000)&%24format=JSON`,
        { headers: getAuthorizationHeader() }
      );

      const response2 = await axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NearBy?%24top=30&%24spatialFilter=nearby(${position.lat}%2C%20${position.lng}%2C%201000)&%24format=JSON`,
        { headers: getAuthorizationHeader() }
      );
      const response3 = await axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/${cityName}?%24format=JSON`,
        { headers: getAuthorizationHeader() }
      );
   
     
      var data = response2.data;
      var map = {};
      for (let i in data) {
        map[data[i].StationID] = i;
      }
      var autoComplete = [];
      for (let i of response1.data) {
        if (map[i.StationID]) {
          data[map[i.StationID]] = { ...data[map[i.StationID]], ...i };
          autoComplete = [
            ...autoComplete,
            {
              name: i.StationName.Zh_tw,
              position: {
                lat: i.StationPosition.PositionLat,
                lng: i.StationPosition.PositionLon,
              },
              AvailableRentBikes: data[map[i.StationID]].AvailableRentBikes,
              AvailableReturnBikes: data[map[i.StationID]].AvailableReturnBikes,
            },
          ];
        }
      }
      const polyLinesGroups = response3.data.map((item) => {
        const re = /[A-Z()]/g;
        const polyLines = item.Geometry.replace(re, "").replace(" ", "").split(",").map((item) => {
          const itemArray = item.split(" ")
          const position = { lat: parseFloat(itemArray[1]), lng: parseFloat(itemArray[0]) }
          return position
        })
        return polyLines
      })
      setAutoComplete(autoComplete);
      setOriginAutoComplete(autoComplete);
      setData(data);
      setPolyLinesGroups(polyLinesGroups)
    })();
  }, [position, cityName]);
  const [mapStyle, setMapStyle] = useState({ height: `${window.innerHeight-89}px` })
  useEffect(()=>{
    if(window.innerWidth<500){
      setMapStyle({ height: `${window.innerHeight-120}px` })
    }
  },[])
  return (
    <>
      <div className="mapContainer" style={mapStyle} >
        <div className="autoComplete">
          <div className="inputArea">
            <input
              value={searchInput}
              onFocus={() => {
                setAutoStatus(true);
              }}
              onBlur={() => {
                setAutoStatus(false);
              }}
              onChange={(e) => {
                const value = e.target.value;
                setSearchInput(value);
                const newAutoComplete = [...originAutoComplete].filter(
                  (item) => {
                    return item.name.includes(value);
                  }
                );
                setAutoComplete(newAutoComplete);
              }}
              placeholder="尋找站點"
              type="text"
            />
            <div
              className={
                "autoCompleteContainer " +
                (!autoStatus && "autoCompleteContainer-hide")
              }
            >
              {autoComplete?.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      setSearchInput(item.name);
                    }}
                    key={index}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="button"
            onClick={() => {
              const item = autoComplete.find(
                (item) => item.name === searchInput
              );
              map.panTo(item?.position);
              setInfo(item);
            }}
          >
           <div className="img">
           <img src={search} alt="" />
           </div>
          </div>
        </div>
        <div
          onClick={nearby}
          className="gpsContainer"
        >
          <img src={gps} alt="" />
        </div>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
          <GoogleMap
          onClick={()=>{
            setInfo({})
          }}
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
            onLoad={(map) => setMap(map)}
          >
            {showStreet&& polyLinesGroups.map((polyline,index)=>{
              return <Polyline
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
            })}
            {data.map((i,index) => {
              return (
                <>
                  <Marker
                    key={index}
                    onClick={() => {
                      const info = {
                        name: i.StationName.Zh_tw, AvailableRentBikes: i.AvailableRentBikes, AvailableReturnBikes: i.AvailableReturnBikes, position: {
                          lat: i.StationPosition.PositionLat,
                          lng: i.StationPosition.PositionLon,
                        }
                      }
                      setInfo(info)
                    }}
                    onMouseOver={()=>{
                      const info={name:i.StationName.Zh_tw,AvailableRentBikes:i.AvailableRentBikes,AvailableReturnBikes:i.AvailableReturnBikes,position:{ lat: i.StationPosition.PositionLat,
                      lng: i.StationPosition.PositionLon,}}
                      setInfo(info)
                    }}
                    title={i.StationName.Zh_tw}
                    label={{
                      text: rent
                        ? i.AvailableRentBikes.toString()
                        : i.AvailableReturnBikes.toString(),
                      color: (i.AvailableRentBikes.toString() === "0")? "black" :rent ? "black" : "white",
                      className: "marker-position",
                    }}
                    icon={{
                      url: rent ? (i.AvailableRentBikes.toString() === "0" ? grayMarker : yellowMarker) : (i.AvailableReturnBikes.toString() === "0" ? grayMarker : blackMarker),
                      scaledSize: new window.google.maps.Size(36, 50),
                      origin: new window.google.maps.Point(0, 0)
                    }}
                    position={{
                      lat: i.StationPosition.PositionLat,
                      lng: i.StationPosition.PositionLon,
                    }}
                  />
                </>
              );
            })}
            {JSON.stringify(info) !== "{}" && (
              <InfoWindow
                onCloseClick={() => {
                  setInfo({});
                }}
                position={info.position}
                options={{ pixelOffset: new  window.google.maps.Size(0, -53) }}
              >
                <div className="info">
                  <h4>{info.name}</h4>
                  <p>可借車輛:{info.AvailableRentBikes}</p>
                  <p>可停空位:{info.AvailableReturnBikes}</p>
                </div>
              </InfoWindow>
            )}
            <InfoBox options={{ closeBoxURL: "", enableEventPropagation: true }} position={position}>
              <Lottie
                style={{ marginTop: "0" }}
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: centerImage,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={100}
                width={100}
              />
            </InfoBox>
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}
