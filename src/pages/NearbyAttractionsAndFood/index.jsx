import React,{useState,useEffect} from "react";
import { getNearByAttractionAndFood ,getInitNearByData} from "../../api";
import GPS from "./images/GPS.png"
import "./nearbyAttractionsAndFood.scss";
import NearbyAttractionsAndFoodItem from "./components/NearbyAttractionsAndFoodItem.jsx";
import Loading from "../../components/Loading";
export default function NearbyAttractionsAndFood({viewPoint,setNearByDetailData}) {
 
  //附近景點美食資料
  const [attractionsAndFoods,setAttractionsAndFoods]=useState({Attractions:[],Foods:[]})
  const [loading,setLoading]=useState(false)

  //景點美食資料
  useEffect(()=>{
    if (localStorage.getItem("nearbyData") === null){
      getInitNearByData(setAttractionsAndFoods)
    }else{
      setAttractionsAndFoods(JSON.parse(localStorage.getItem("nearbyData")))
      localStorage.removeItem("nearbyData")
    }
  },[])
  const {Attractions,Foods}=attractionsAndFoods
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
    setLoading(false)
    if(localStorage.getItem("scroll")!==null){
      window.scrollTo(0,parseInt(localStorage.getItem("scroll")))
      localStorage.removeItem("scroll")
    }
    },500)
  },[viewPoint,attractionsAndFoods])
  
  if(loading){
    return <Loading/>
  }else{
    return (
      <>
        <div className="nearbyAttractionsAndFood">
        {
          viewPoint? Attractions?.sort(function(a,b){return a.distance-b.distance}).map((item,index)=>{
            return <NearbyAttractionsAndFoodItem key={index} item={item} setNearByDetailData={setNearByDetailData} attractionsAndFoods={attractionsAndFoods} />
          })
          :
          Foods?.sort(function(a,b){return a.distance-b.distance}).map((item,index)=>{
            return <NearbyAttractionsAndFoodItem key={index} item={item} setNearByDetailData={setNearByDetailData} attractionsAndFoods={attractionsAndFoods}/>
          })
        }
        <div onClick={()=>{
          getNearByAttractionAndFood(setAttractionsAndFoods)
            localStorage.setItem("nearby", "true")
          }} className="nearbyButton">
          <img src={GPS} alt="" />
        </div>
        </div>
      </>
    );
  }
  
}
