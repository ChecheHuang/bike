import React,{useState,useEffect} from "react";
import location from "./images/location.png";
import tel from "./images/tel.png";
import time from "./images/time.png";
import "./detail.scss";
import { Link } from "react-router-dom";

export default function Detail({ nearbyDetailData }) {
  // detailData
  const localStorageData = JSON.parse(localStorage.getItem("detailData"))
  const [data, setData] = useState(nearbyDetailData)
  const { img, openTime, phone, address, detail } = data;
  useEffect(()=>{
      setData(localStorageData)
  },[])
  return (
    <>
      <div className="detail">
        <div className="imgContainer">
          <img src={img} alt="" />
        </div>
        <div className="infos">
          <div className="info">
            <div className="icon">
              <img src={time} alt="" />
            </div>
            <div className="information">{openTime}</div>
          </div>
          <div className="info">
            <div className="icon">
              <img src={tel} alt="" />
            </div>
            <div className="information">{phone}</div>
          </div>
          <div className="info">
            <div className="icon">
              <img src={location} alt="" />
            </div>
            <div className="information">{address}</div>
            <Link to="/detailMap">
              <button>地圖</button>
            </Link>
          </div>
        </div>
        <div className="detailText">{detail}</div>
      </div>
    </>
  );
}
