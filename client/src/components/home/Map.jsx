import React, { useEffect, useRef, useState } from 'react';
import Sktelecom from './Skeleton';

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
        zoom: 14,
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
  let startLatitude, startLongitude;
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

        if (mapInstanceRef.current) {
          markersRef.current.forEach((marker) => marker.setMap(null));

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
          drawLine(lineCoordinates);
          //ㅠㅜㅠㅜㅠㅜㅠㅜㅠㅜㅜㅠㅜㅠㅜㅠㅠㅜㅠㅜㅠㅜㅠㅜㅠㅜㅠㅜㅠㅜㅠㅜㅠㅜ
          // 예시로 사용자의 현재 위치와 목적지를 이용한 호출
          // drawWalkingRoute(currentMarkerPosition, endMarkerPosition);

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

  const requestData = {
    startX: currentMarkerPosition?.longitude || 0,
    startY: currentMarkerPosition?.latitude || 0,
    endX: startLongitude || 0,
    endY: startLatitude || 0,
    startName: '출발지',
    endName: '도착',
  };

  const headers = {
    appKey: process.env.REACT_APP_T_MAP_API_KEY,
  };

  const drawLine = (coordinates) => {
    if (mapInstanceRef.current && coordinates.length >= 2) {
      const line = new window.Tmapv2.Polyline({
        path: coordinates.map(
          (coord) => new window.Tmapv2.LatLng(coord.latitude, coord.longitude)
        ),
        strokeColor: '#FF0000',
        strokeWeight: 5, // 선 두께
        map: mapInstanceRef.current,
      });
    }
  };

  const drawWalkingRoute = async (startPoint, endPoint) => {
    try {
      const apiUrl =
        'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result';
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }

      const data = await response.json();
      const { features } = data.features;

      // 경로 좌표를 올바르게 추출
      const walkingPath = features[0].geometry.coordinates.map((coord) => ({
        latitude: coord[1],
        longitude: coord[0],
      }));

      drawLine(walkingPath);
    } catch (error) {
      console.error('ㅗ', error);
    }
  };

  // const drawDirections = () => {
  //   // 경로의 출발지 및 목적지 좌표 정의
  //   const startX = 14129005.823725;
  //   const startY = 4516902.583792;
  //   const endX = 14128464.387021;
  //   const endY = 4516740.197076;

  //   // 경로 포맷 생성
  //   const route = new Tmapv2.Format.KML({ extractStyles: true, extractAttributes: true });

  //   // Tmap API 요청을 위한 URL 작성
  //   let urlStr = 'https://apis.skplanetx.com/tmap/routes/pedestrian?version=1&sort=custom&format=xml';
  //   urlStr += `&startName='${encodeURIComponent('출발지')}'&endName='${encodeURIComponent('도착지')}'`;
  //   urlStr += `&startX=${startX}&startY=${startY}&endX=${endX}&endY=${endY}`;
  //   urlStr += `&appKey=${process.env.REACT_APP_T_MAP_API_KEY}`;

  //   // Tmap API 요청을 위한 HTTP 프로토콜 생성
  //   const road = new Tmapv2.Protocol.HTTP({
  //     url: urlStr,
  //     format: route
  //   });

  //   // 경로용 Tmap 벡터 레이어 생성
  //   const routeLayer = new Tmapv2.Layer.Vector('route', { protocol: road, strategies: [new Tmap.Strategy.Fixed()] });

  //   // 레이어에 피처가 추가될 때 경로를 보여주는 이벤트 등록
  //   routeLayer.events.register('featuresadded', routeLayer, showRoute);

  //   // 맵에 경로 레이어 추가
  //   map.addLayers([routeLayer]);
  // };

  // const showRoute = (event) => {
  //   // 피처가 추가되면 맵을 경로의 범위에 맞게 줌
  //   map.zoomToExtent(event.target.getDataExtent());
  // };

  return (
    <div className='w-full'>
      {loading && (
        <div className='text-red'>
          <Sktelecom className='w-full h-[25rem] lg:h-[30rem] drop-shadow-md'/>
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
