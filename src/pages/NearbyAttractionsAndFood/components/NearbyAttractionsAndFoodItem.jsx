import React from "react";
import tel from "../images/tel.png";
import { Link } from "react-router-dom";
export default function NearbyAttractionsAndFoodItem({ item, setNearByDetailData, setScrollY}) {
  const {distance,img,phone,name}=item
  var imgUrl=img
  if(img===undefined){
    imgUrl="https://images.pexels.com/photos/7409749/pexels-photo-7409749.jpeg?cs=srgb&dl=pexels-albina-white-7409749.jpg&fm=jpg"
  }
  const setDetailData=()=>{
    var newData={...item}
    localStorage.setItem("detailData", JSON.stringify(newData))
    setNearByDetailData(newData)
    setScrollY(800)
    console.log(window.scrollY)
  }
  
 
  return (
    <Link onClick={setDetailData}  to="/detail" style={{ textDecoration: "none" }}>
      <div className="nearbyAttractionsAndFoodItem">
        <div className="imgContainer">
          <img
            src={imgUrl}
            alt=""
          />
        </div>
        <div className="details">
          <div className="distance">{distance}公里</div>
          <div className="title">{name}</div>
          <div className="phoneArea">
            <div className="phoneContainer">
              <img src={tel} alt="" />
            </div>
            <div className="phone">{phone}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
