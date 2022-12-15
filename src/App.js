import React, { useState } from "react";
import {  HashRouter, Route, Routes } from "react-router-dom";
import Header from "../src/components/Header/Header";
import Home from "../src/pages/Home";
import FindBikeLanes from "../src/pages/FindBikeLanes";
import NearbyAttractionsAndFood from "../src/pages/NearbyAttractionsAndFood";
import SearchYouBike from "../src/pages/SearchYouBike";
import Detail from "../src/pages/Detail";
import DetailMap from "../src/pages/DetailMap";
import FindMap from "./pages/FindMap";
export default function App() {
  //是否是還車或是租車
  const [rent, setRent] = useState(true);
  //是否顯示車道
  const [showStreet, setShowStreet] = useState(false);
  //自行車道的路線及名子
  const [bikeLane,setBikeLane]=useState({})
  //是否為景點或是美食
  const [viewPoint, setViewPoint] = useState(true);
  //景點美食的資料
  const [nearbyDetailData,setNearByDetailData]=useState({position:{lat:25.047675,lng:121.517055}})
  //選擇的城市英文名字
  const [cityName, setCityName] = useState("none");
  

  return (
    <>
      <HashRouter>
        <Header
          rent={rent}
          setRent={setRent}
          viewPoint={viewPoint}
          setViewPoint={setViewPoint}
          showStreet={showStreet}
          setShowStreet={setShowStreet}
          setCityName={setCityName}
          name={nearbyDetailData.name}
          routeName={bikeLane.RouteName}
        />
        <Routes>
          {/* 尋找youbike */}
          <Route exact path="/search" element={<SearchYouBike rent={rent} showStreet={showStreet} />} />
          {/* 查詢自行車道 */}
          <Route
            exact
            path="/find"
            element={<FindBikeLanes cityName={cityName} setBikeLane={setBikeLane} />}
          />
          {/* 自行車道地圖 */}
          <Route exact path="/findMap" element={<FindMap bikeLane={bikeLane} />} />
          {/* 附近景點美食 */}
          <Route
            exact
            path="/nearby"
            element={<NearbyAttractionsAndFood viewPoint={viewPoint} setNearByDetailData={setNearByDetailData} />}
          />
          {/* 景點美食細節 */}
          <Route exact path="/detail" element={<Detail nearbyDetailData={nearbyDetailData} />} />
          {/* 景點美食地圖 */}
          <Route exact path="/detailMap" element={<DetailMap nearbyDetailData={nearbyDetailData}/>} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </HashRouter>
    </>
  );
}
