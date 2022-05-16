import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import logo from "./images/Logo.png";
import activebike from "./images/activebike.png";
import parking from "./images/parking.png";
import bike from "./images/bike.png";
import activeparking from "./images/activeparking.png";
import food from "./images/food.png";
import blackFood from "./images/blackFood.png";
import attraction from "./images/attraction.png";
import attraction2 from "./images/attraction2.png";
import rwdbike from "./images/rwdbike.png";
import rwdparking from "./images/rwdparking.png";
import rwdattraction from "./images/rwdattraction.png";
import rwdfood from "./images/rwdfood.png";
//城市別名
import {citys} from '../../api'


import "./header.scss";

export default function Header(props) {
    const {rent,setRent,viewPoint,setViewPoint,showStreet,setShowStreet,setCityName,name,routeName}=props
    
    //控制下拉選單
    const [selectStatus, setSelectStatus] = useState(false);
    //下拉選單縮回來0.6秒再把select補齊
    const [bgStatus,setBgStatus]=useState(false)
    //select裡面顯示的字
    const [selectedCity, setSelectCity] = useState("選擇縣市");
    //控制是否顯示下拉選單
    const toggleSelect=()=> {
        setSelectStatus(!selectStatus);
        // setBgStatus(true)
        // if(selectStatus){
        //     setTimeout(()=>{
        //         setBgStatus(false)
        //     },500)
        // }
    }
    //控制下拉選單的字
    const selectCity=(city, english)=> {
        setSelectCity(city);
        setCityName(english)
        
    }
    //還車狀態
    const rentBike = () => {
        setRent(true);
    };
    //租車狀態
    const returnBike = () => {
        setRent(false);
    };
    //景點狀態
    const viewPointClick=()=>{
        setViewPoint(true)
    }
    //美食狀態
    const foodClick=()=>{
        setViewPoint(false)
    }
    //控制是否顯示車道
    const handleShow=()=> {
        setShowStreet(!showStreet);
    }
    //取得位置路徑
    const location = useLocation();
    const path = location.pathname.replace("/", "");
    useEffect(()=>{
<<<<<<< HEAD
        window.scrollTo(0, 0)
    },[path])
=======
        if(path!=="nearby"){
            window.scrollTo(0, 0)
        }
    },[path])
  
>>>>>>> 5eb159fdc7d7f7a0e075406ffe7786b02e569278
    //依據rwd載入不同圖片
    const [rentImage,setRentImage]=useState(activebike)
    const [rentImage2,setRentImage2]=useState(bike)
    const [parkImage,setParkImage]=useState(parking)
    const [parkImage2,setParkImage2]=useState(activeparking)


    const[viewImage,setViewImage]=useState(attraction)
    const[viewImage2,setViewImage2]=useState(attraction2)
    const[foodImage,setFoodImage]=useState(blackFood)
    const[foodImage2,setFoodImage2]=useState(food)

    const navigate = useNavigate();
    const handleBack = () => {
        if(path==="nearby"){
            localStorage.removeItem("nearby")
        }
        navigate(-1);
    };



    useEffect(()=>{
        const width=window.innerWidth
        if(width<769){
            setRentImage(bike)
            setRentImage2(rwdbike)
            setParkImage(rwdparking)
            setParkImage2(parking)

            setViewImage(rwdattraction)
            setViewImage2(attraction)
            setFoodImage(rwdfood)
            setFoodImage2(blackFood)
        }
    },[])
    
    return (
        <>
            {path.length !== 0 && (
                <>
                    
                    <header>
                        <div onClick={handleBack} className="logo">
                                <img src={logo} alt="" />
                        </div>

                        {path === "search" && (
                            <div
                                onClick={handleShow}
                                className={"showStreet " + (showStreet && "showStreetActive")}
                            >
                                <div className={"show " + (showStreet && "showActive")}>
                                    顯示車道
                                </div>
                                <div
                                    className={"showButton " + (showStreet && "showButtonActive")}
                                ></div>
                                <div className={"hide " + (showStreet && "hideActive")}>
                                    隱藏車道
                                </div>
                            </div>
                        )}
                        {path === "find" && (
                            <>
                                <div
                                    onClick={toggleSelect}
                                    className={
                                        "selectCity " + (selectStatus && "selectCityActive")
                                    }
                                >
                                    <div className="selectedOption">
                                        <div className={"bg " + (bgStatus&& "bgActive")}></div>
                                        <div>{selectedCity}</div>
                                        <div className="triangle"></div>
                                    </div>
                                    <div
                                        className={"options " + (selectStatus && "optionsActive")}
                                    >
                                        {citys.map((item, index) => {
                                            const { city, english } = item;
                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        selectCity(city, english);
                                                    }}
                                                    className="option"
                                                >
                                                    {city}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </>
                        )}
                        {path === "detail" && <div className="detailText">{name}</div>}
                        {path === "detailMap" && <div className="detailText">{name}</div>}
                        {path === "findMap" && <div className="detailText">{routeName}</div>}
                    </header>
                    {
                        path === "search" &&
                        <div className="selectButtons">
                            <div
                                onClick={rentBike}
                                className={"selectButton " + (rent && "selectButtonActive")}
                            >
                                <div className="iconBike">
                                    <img src={rent ? rentImage : rentImage2} alt="" />
                                </div>
                                <p>租車</p>
                            </div>
                            <div
                                onClick={returnBike}
                                className={"selectButton " + (!rent && "selectButtonActive")}
                            >
                                <div className="icon">
                                    <img src={rent ? parkImage : parkImage2} alt="" />
                                </div>
                                <p>還車</p>
                            </div>
                        </div>
                        
                    }
                    {
                        path === "nearby" &&
                        <div className="selectButtons" >
                            <div
                                onClick={viewPointClick}
                                className={"selectButton " + (viewPoint && "selectButtonActive")}
                            >
                                <div className="icon">
                                    <img src={viewPoint ? viewImage2 : viewImage} alt="" />
                                </div>
                                <p>景點</p>
                            </div>
                            <div
                                onClick={foodClick}
                                className={"selectButton " + (!viewPoint && "selectButtonActive")}
                            >
                                <div className="icon">
                                    <img src={viewPoint ?  foodImage : foodImage2} alt="" />
                                </div>
                                <p>美食</p>
                            </div>
                        </div>
                    }
                    <div className="headerBlock"></div>
                </>
            )}
        </>
    );
}
