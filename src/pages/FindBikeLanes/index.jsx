import React,{useState,useEffect} from "react";
import { getData } from "../../api";
import Loading from "../../components/Loading";
import FindBikeLane from "./components/FindBikeLane/FindBikeLane";
import "./findBikeLanes.scss";
export default function FindBikeLanes({cityName,setBikeLane}) {
  //api拿到的資料自行車道查詢
  const [apiData, setApiData] = useState([]);
  //一開始把loading設為false
  const [loading, setLoading] = useState(false);
   //header操作city打api和loading用props傳給FindBikeLanes
   useEffect(() => {
    if (cityName !== "none") {
      window.scrollTo(0, 0);
      setLoading(true);
      getData(
        `https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/${cityName}?%24format=JSON`,
        setApiData
      );
      setTimeout(() => {
        setLoading(false);
      }, [500]);
    }
  }, [cityName]);
  return (
    <>
      {loading ? <Loading /> :
        cityName === "none" ? (
          <div className="unSelectTitle">尚未選擇任何城市</div>
        ) : (
          <div className="findBikeLaneContainer">
            {apiData?.map((item, index) => {
              if (item.AuthorityName === undefined) {

              }
              return <FindBikeLane key={index} item={item} setBikeLane={setBikeLane} />;
            })}
          </div>
        )
      }
    </>
  );
}
