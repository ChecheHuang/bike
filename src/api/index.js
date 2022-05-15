import jsSHA from "jssha";
import axios from "axios";
import placeholderImg from "../images/placeholderImg.png"
export function getData(api,setData){
    axios.get(
        api,
      {
         headers: getAuthorizationHeader()
      }
   )
   .then(function (response) {
    setData(response.data)
   })
   .catch(function (error) {
     console.log(error);
   }); 
}


export function getAuthorizationHeader() {
    //  填入自己 ID、KEY 開始
        let AppID = 'a465ec9e862b4c6cb1388215b593a2d0';
        let AppKey = 'D1VEDZ9dYJ6pkyxDK2QzK47GY3I';
    //  填入自己 ID、KEY 結束
        let GMTString = new Date().toGMTString();
        let ShaObj = new jsSHA('SHA-1', 'TEXT');
        ShaObj.setHMACKey(AppKey, 'TEXT');
        ShaObj.update('x-date: ' + GMTString);
        let HMAC = ShaObj.getHMAC('B64');
        let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';
        return { 'Authorization': Authorization, 'X-Date': GMTString }; 
    }
    
    export const citys = [
        { city: "台北市", english: "Taipei" },
        { city: "新北市", english: "NewTaipei" },
        { city: "桃園市", english: "Taoyuan" },
        { city: "台中市", english: "Taichung" },
        { city: "台南市", english: "Tainan" },
        { city: "高雄市", english: "Kaohsiung" },
        { city: "基隆市", english: "Keelung" },
        { city: "新竹縣", english: "HsinchuCounty" },
        { city: "苗栗縣", english: "MiaoliCounty" },
        { city: "彰化縣", english: "ChanghuaCounty" },
        { city: "南投縣", english: "NantouCounty" },
        { city: "雲林縣", english: "YunlinCounty" },
        { city: "嘉義縣", english: "ChiayiCounty" },
        { city: "嘉義市", english: "Chiayi" },
        { city: "屏東縣", english: "PingtungCounty" },
        { city: "宜蘭縣", english: "YilanCounty" },
        { city: "花蓮縣", english: "HualienCounty" },
        { city: "台東縣", english: "TaitungCounty" },
        { city: "澎湖縣", english: "PenghuCounty" },
        { city: "金門縣", english: "KinmenCounty" },
    ];

    export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1); // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return Number(d.toFixed(1));
      }
      function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }

      export function getNearByAttractionAndFood(setData){
          var data=[]
          var Attractions=[]
          var Foods=[]
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
            axios
                  .get(
                    `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24spatialFilter=nearby(${position.coords.latitude}%2C%20${position.coords.longitude}%2C%202000)&%24format=JSON`,
                    {
                      headers: getAuthorizationHeader(),
                    }
                  )
                  .then(function (response) {
                    for(let item of response.data ){
                          const distance=getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,item.Position.PositionLat,item.Position.PositionLon)
                          if(distance<=20){
                            var newPosition={lat:item?.Position?.PositionLat,lng:item?.Position?.PositionLon}
                              Attractions=[...Attractions,{distance:distance,name:item.ScenicSpotName||"尚未提供",phone:item.Phone||"尚未提供",position:newPosition||{lat:0,lng:0},img:item.Picture.PictureUrl1||placeholderImg,address:item.Address||"尚未提供",openTime:item.OpenTime||"尚未提供",detail:item.DescriptionDetail||"尚未提供"}]
                          }
                    }
                    data.Attractions=Attractions
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                  axios
                  .get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel?%24top=30&%24spatialFilter=nearby(${position.coords.latitude}%2C%20${position.coords.longitude}%2C%202000)&%24format=JSON`,
                    {
                      headers: getAuthorizationHeader(),
                    }
                  )
                  .then(function (response) {
                    for(let item of response.data ){
                          const distance=getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,item.Position.PositionLat,item.Position.PositionLon)
                          if(distance<=20){
                              var newPosition={lat:item?.Position?.PositionLat,lng:item?.Position?.PositionLon}
                              Foods=[...Foods,{distance:distance,name:item.RestaurantName||"尚未提供",phone:item.Phone||"尚未提供",position:newPosition||{lat:0,lng:0},img:item.Picture.PictureUrl1||placeholderImg,address:item.Address||"尚未提供",openTime:item.OpenTime||"尚未提供",detail:item.DescriptionDetail||"尚未提供"}]
                          }
                    }
                    data.Foods=Foods
                    setData(data)
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
          });

      }
      //產生min到max之間的亂數
      function getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1))+min;
      };
      export function getInitNearByData(setData){
        var data=[]
        var Attractions=[]
        var Foods=[]
      navigator.geolocation.getCurrentPosition(function (position) {
        axios
        .get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24top=30&%24skip=${getRandom(1,3000)}&%24format=JSON`,
          {
            headers: getAuthorizationHeader(),
          }
        )
        .then(function (response) {
          for(let item of response.data ){
                const distance=getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,item.Position.PositionLat,item.Position.PositionLon)
                var newPosition={lat:item?.Position?.PositionLat,lng:item?.Position?.PositionLon}
                    Attractions=[...Attractions,{distance:distance,name:item.ScenicSpotName||"尚未提供",phone:item.Phone||"尚未提供",position:newPosition||{lat:0,lng:0},img:item.Picture.PictureUrl1||placeholderImg,address:item.Address||"尚未提供",openTime:item.OpenTime||"尚未提供",detail:item.DescriptionDetail||"尚未提供"}]
          }
          data.Attractions=Attractions
        })
        .catch(function (error) {
          console.log(error);
        });
        axios
        .get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?%24top=30&%24skip=${getRandom(1,3000)}&%24format=JSON`,
          {
            headers: getAuthorizationHeader(),
          }
        )
        .then(function (response) {
          for(let item of response.data ){
                const distance=getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,item.Position.PositionLat,item.Position.PositionLon)
                var newPosition={lat:item?.Position?.PositionLat,lng:item?.Position?.PositionLon}
                Foods=[...Foods,{distance:distance,name:item.RestaurantName||"尚未提供",phone:item.Phone||"尚未提供",position:newPosition||{lat:0,lng:0},img:item.Picture.PictureUrl1||placeholderImg,address:item.Address||"尚未提供",openTime:item.OpenTime||"尚未提供",detail:item.DescriptionDetail||"尚未提供"}]
          }
          data.Foods=Foods
          setData(data)
        })
        .catch(function (error) {
          console.log(error);
        });
        });

    }