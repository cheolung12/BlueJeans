// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   useEffect(() => {
//     // Tmap API 스크립트가 로드되면 지도를 초기화합니다.
//     initMap();
//   }, []);
//   const initMap = () => {
//     const map = new Tmapv2.Map("map_div", {
//       center: new Tmapv2.LatLng(37.56520450, 126.98702028),
//       width: "100%",
//       height: "400px",
//       zoom: 17,
//       zoomControl: true,
//       scrollwheel: true
//     });
//     setMap(map);
//     // 마커 설정
//     setMarkers(map);
//     // 경로 데이터 가져오기
//     getRouteData();
//   };
//   const setMarkers = (map) => {
//     new Tmapv2.Marker({
//       position: new Tmapv2.LatLng(37.564991, 126.983937),
//       icon: "/upload/tmap/marker/pin_r_m_s.png",
//       iconSize: new Tmapv2.Size(24, 38),
//       map: map
//     });
//     new Tmapv2.Marker({
//       position: new Tmapv2.LatLng(37.566158, 126.988940),
//       icon: "/upload/tmap/marker/pin_r_m_e.png",
//       iconSize: new Tmapv2.Size(24, 38),
//       map: map
//     });
//   };
//   const getRouteData = () => {
//     const headers = { "appKey": "발급받은 AppKey" };
//     axios.post("https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json", {
//       headers: headers,
//       startX: "126.983937",
//       startY: "37.564991",
//       endX: "126.988940",
//       endY: "37.566158",
//       reqCoordType: "WGS84GEO",
//       resCoordType: "EPSG3857",
//       startName: "출발지",
//       endName: "도착지"
//     })
//     .then(response => {
//       const resultData = response.data.features;
//       drawRoute(resultData);
//     })
//     .catch(error => {
//       console.error("Error fetching route data: ", error);
//     });
//   };
//   const drawRoute = (resultData) => {
//     let drawInfoArr = [];
//     resultData.forEach((data, index) => {
//       if (data.geometry.type === "LineString") {
//         data.geometry.coordinates.forEach((coord) => {
//           const latlng = new Tmapv2.Point(coord[0], coord[1]);
//           const convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
//           const convertChange = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
//           drawInfoArr.push(convertChange);
//         });
//       }
//     });
//     new Tmapv2.Polyline({
//       path: drawInfoArr,
//       strokeColor: "#DD0000",
//       strokeWeight: 6,
//       map: map
//     });
//   };
//   return (
//     <div>
//       <div id="map_div" style={{ width: '100%', height: '400px' }}></div>
//       <p id="result"></p>
//     </div>
//   );
