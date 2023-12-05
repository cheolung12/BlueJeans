import React, { useEffect, useRef, useState } from 'react';
import Sktelecom from './Skeleton';
import axios from 'axios';

function Map({ userAddress }) {
  const mapContainerRef = useRef();
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  let resultdrawArr = [];

  const [endMarkerPosition, setEndMarkerPosition] = useState(null);
  const [currentMarkerPosition, setCurrentMarkerPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapVisible, setMapVisible] = useState(false);
  const [showSktelecom, setShowSkelecom] = useState(false);

  const [arrPoint, setArrPoint] = useState([]);
  const imgUrlS =
    'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png';

  const imgUrlE =
    'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png';

  useEffect(() => {
    const handleGeoLocation = async () => {
      try {
        const position = await getCurrentPosition();
        const nowPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        if (!mapInstanceRef.current) {
          initTmap(nowPosition);
          setMapVisible(true);
        }
      } catch (error) {
        console.error('에러:', error);
      } finally {
        setLoading(false);
      }
    };

    const getCurrentPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    handleGeoLocation();
  }, []);

  useEffect(() => {
    if (userAddress) {
      setLoading(true);
      reAddress(userAddress);
    }
  }, [userAddress]);

  const initTmap = (nowPosition) => {
    const map = new window.Tmapv2.Map(
      mapContainerRef.current.id,
      {
        center: new window.Tmapv2.LatLng(
          nowPosition.latitude,
          nowPosition.longitude
        ),
        zoom: 17,
      },
      []
    );
    console.log('nowPosition', nowPosition);

    const currentMarker = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(
        nowPosition.latitude,
        nowPosition.longitude
      ),
      icon: imgUrlS,
      iconSize: new window.Tmapv2.Size(30, 40),
      map: map,
    });

    mapInstanceRef.current = map;
    markersRef.current.push(currentMarker);
    setCurrentMarkerPosition(nowPosition);
  };

  const reAddress = async (endpoint) => {
    try {
      const apiUrl = `https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?version=1&format=json&callback=result&coordType=WGS84GEO&fullAddr=${endpoint}&appKey=${process.env.REACT_APP_T_MAP_API_KEY}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }

      const data = await response.json();
      const resultCoordinate = data.coordinateInfo.coordinate[0];

      let startLatitude, startLongitude;

      if (resultCoordinate) {
        if (resultCoordinate.lon.length > 0) {
          startLongitude = resultCoordinate.lon;
          startLatitude = resultCoordinate.lat;
        } else {
          startLongitude = resultCoordinate.newLon;
          startLatitude = resultCoordinate.newLat;
        }

        setEndMarkerPosition({
          latitude: startLatitude,
          longitude: startLongitude,
        });
        console.log('start', { startLatitude, startLongitude });
        const house = { startLatitude, startLongitude };
        console.log('house', house);

        if (mapInstanceRef.current) {
          markersRef.current.forEach((marker) => marker.setMap(null));

          //마커
          const currentMarker = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(
              currentMarkerPosition.latitude,
              currentMarkerPosition.longitude
            ),
            icon: imgUrlS,
            iconSize: new window.Tmapv2.Size(30, 40),
            map: mapInstanceRef.current,
          });
          console.log('currentMarkerPosition', currentMarkerPosition);
          markersRef.current.push(currentMarker);

          //마커
          const endMarker = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(startLatitude, startLongitude),
            icon: imgUrlE,
            iconSize: new window.Tmapv2.Size(30, 40),
            map: mapInstanceRef.current,
          });

          markersRef.current.push(endMarker);

          const lineCoordinates = [
            {
              latitude: currentMarkerPosition.latitude,
              longitude: currentMarkerPosition.longitude,
            },
            { latitude: startLatitude, longitude: startLongitude },
          ];

          //drawLine 함수만 다시 정의해서 LindCoordinates 넣기
          // drawLine(lineCoordinates);
          //ㅠㅜㅠㅜㅠㅜㅠㅜㅠㅜㅜㅠㅜㅠㅜㅠㅠㅜㅠㅜㅠㅜㅠㅜㅠㅜㅠㅜㅠㅜㅠㅜㅠㅜ
          drawWalkingRoute(currentMarkerPosition, endMarkerPosition);

          centerMap(currentMarkerPosition, {
            latitude: startLatitude,
            longitude: startLongitude,
          });
          setMapVisible(true);
          setShowSkelecom(false);
        }
      } else {
        console.log('주소에 대한 좌표 정보가 없습니다.');
        setMapVisible(false);
        setShowSkelecom(false);
      }
    } catch (error) {
      console.error('에러:', error);
    } finally {
      setLoading(false);
    }
  };

  const centerMap = (position1, position2) => {
    if (mapInstanceRef.current && position1 && position2) {
      const bounds = new window.Tmapv2.LatLngBounds();
      bounds.extend(
        new window.Tmapv2.LatLng(position1.latitude, position1.longitude)
      );
      bounds.extend(
        new window.Tmapv2.LatLng(position2.latitude, position2.longitude)
      );

      const center = bounds.getCenter();
      mapInstanceRef.current.setCenter(center);
    }
  };

  const drawLine = async (resultData) => {
    let drawInfoArr = [];

    for (const feature of resultData.features) {
      console.log(feature.geometry.type);
      if (feature.geometry.type === 'LineString') {
        // 좌표에 다 있음 배열안에 배열
        console.log('LineString 좌표:', feature.geometry.coordinates);

        for (const coord of feature.geometry.coordinates) {
          const latlng = new window.Tmapv2.Point(coord[0], coord[1]);
          const convertPoint =
            new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
          const convertChange = new window.Tmapv2.LatLng(
            convertPoint._lat,
            convertPoint._lng
          );
          drawInfoArr.push(convertChange);
        }
      }
    }

    // console.log('tqtqtqtqt', drawInfoArr);
    // new window.Tmapv2.Polyline({
    //   path: arr,
    //   strokeColor: '#DD0000',
    //   strokeWeight: 6,
    //   map: mapInstanceRef.current,
    // });
  };

  // const forfunc = (x) => {
  //   let drawInfoArr = [];
  //   for (const feature of x) {
  //     console.log(feature.geometry.type);
  //     if (feature.geometry.type === 'LineString') {
  //       // 좌표에 다 있음 배열안에 배열
  //       console.log('LineString 좌표:', feature.geometry.coordinates);

  //       for (const coord of feature.geometry.coordinates) {
  //         const latlng = new window.Tmapv2.Point(coord[0], coord[1]);
  //         const convertPoint =
  //           new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
  //         const convertChange = new window.Tmapv2.LatLng(
  //           convertPoint._lat,
  //           convertPoint._lng
  //         );
  //         drawInfoArr.push(convertChange);
  //       }
  //     }
  //   }

  //   return drawInfoArr;
  // };

  // const poly = (arr) => {
  //   new window.Tmapv2.Polyline({
  //     path: arr,
  //     strokeColor: '#DD0000',
  //     strokeWeight: 6,
  //     map: mapInstanceRef.current,
  //   });
  // };

  const drawWalkingRoute = async () => {
    console.log(endMarkerPosition);
    const requestData = {
      startX: '126.945319',
      startY: '37.548575',
      endX: '126.9456645',
      endY: '37.5476279',
      startName: '출발지',
      endName: '도착',
    };
    const headers = {
      appKey: process.env.REACT_APP_T_MAP_API_KEY,
    };

    console.log(requestData);
    try {
      const apiUrl = `https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result`;

      const response = await axios({
        method: 'POST',
        url: apiUrl,
        data: requestData,
        headers: {
          'Content-Type': 'application/json',
          appKey: process.env.REACT_APP_T_MAP_API_KEY,
        },
      });
      const resultData = response.data;
      drawLine(resultData);

      console.log('경로 좌표들', resultData);
    } catch (error) {
      console.error('에러:', error);
    }
  };

  // const drawLine = (resultData) => {
  //   let drawInfoArr = [];
  //   if (resultData.features) {
  //     resultData.features.forEach((feature) => {
  //       if (feature.geometry.type === 'LineString') {
  //         console.log('LineString 좌표:', feature.geometry.coordinates);

  //         feature.geometry.coordinates.forEach((coord) => {
  //           const latlng = new window.Tmapv2.Point(coord[0], coord[1]);
  //           const convertPoint =
  //             new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
  //           const convertChange = new window.Tmapv2.LatLng(
  //             convertPoint._lat,
  //             convertPoint._lng
  //           );
  //           drawInfoArr.push(convertChange);
  //         });
  //       }
  //     });
  //     drawLine(drawInfoArr);
  //   }

  return (
    <div className='w-full'>
      {loading && (
        <div className='text-red'>
          <Sktelecom className='w-full h-[25rem] lg:h-[30rem] drop-shadow-md -z-10' />
        </div>
      )}
      <div
        ref={mapContainerRef}
        id='TMapApp'
        className='w-full h-[25rem] lg:h-[30rem] drop-shadow-md'
      ></div>
    </div>
  );
}

export default Map;
