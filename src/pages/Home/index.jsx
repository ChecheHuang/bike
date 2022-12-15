import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import "./home.scss"
import logo from './images/Logo.png'
import Lottie from "react-lottie";
import centerImage from "../../../src/youbike.json";


export default function Home() {

  const [lottieHeight,setLottieHeight]=useState(68)
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: centerImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(()=>{
    const width=window.innerWidth
    
    if(width<769&&width>700){
      setLottieHeight(100)
    }
    
   
  },[lottieHeight])
  return (
    <>
      <div className='home' style={{ height:`${window.innerHeight}px`}}>
        <div className='topArea'>
          <div className='lottie'>
            <Lottie
              options={defaultOptions}
              height={lottieHeight}
            />
          </div>
          <div className='logoContainer'>
            <img src={logo} alt="" />
          </div>
          <div className='slogan'>微笑單車，暢遊城市</div>
        </div>
        <Link to="/search">
          <button>尋找youbike</button>
        </Link>
        <Link to="/find">
          <button>查詢自行車道</button>
        </Link>
        <Link to="/nearby">
          <button>附近景點美食</button>
        </Link>
      <footer>Where's YouBike&copy;Code:Carl/Design:KT</footer>
      </div>
    </>
  )
}
