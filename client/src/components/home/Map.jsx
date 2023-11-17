import React, { useEffect, useRef, useState } from 'react';
//현위체 마커가이쏘
//버튼의

function Map({ userAddress }) {
  const mapContainerRef = useRef();
  const mapInstanceRef = useRef(null);
  const [endMarkerPosition, setEndMarkerPosition] = useState(null);

  // Tmap 초기화
  const initTmap = nowPosition => {
    console.log('TMAP');
    const map = new window.Tmapv2.Map(
      mapContainerRef.current.id,
      {
        center: new window.Tmapv2.LatLng(
          nowPosition.latitude,
          nowPosition.longitude
        ),
        zoom: 16,
      },
      []
    );

    // 시작 현위치  마커
    const startMarker = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(
        nowPosition.latitude,
        nowPosition.longitude
      ),
      map: map,
    });

    // 도착점 즉 집
    if (endMarkerPosition) {
      // userAddress가 있을 때만 마커 생성
      //else안해도됨?
      new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(
          endMarkerPosition.latitude,
          endMarkerPosition.longitude
        ),
        map: map,
      });
    }

    // mapInstanceRef에 지도 인스턴스 저장
    mapInstanceRef.current = map;
    console.log('endMarkerPosition:', endMarkerPosition);
  };

  //////////////////////////////////////////////////처음 실행되는 지도

  useEffect(() => {
    const handleGeoLocation = position => {
      console.log('핸들');
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const nowPosition = { latitude, longitude };

      console.log('내 위치:', nowPosition);

      // Tmap 초기화
      if (!mapInstanceRef.current) {
        initTmap(nowPosition);
      }
    };

    /////////////////////////////////////////////////
    if (!document.getElementById('tmapScript')) {
      console.log('tmapscript');
      navigator.geolocation.getCurrentPosition(handleGeoLocation);
    }

    // userAddress 값이 있을 때 reAddress 함수 호출
    if (userAddress) {
      reAddress(userAddress);
    }
  }, [userAddress]);

  //////readdress FUNCTION////
  const reAddress = async endpoint => {
    try {
      const apiUrl = `https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?version=1&format=json&callback=result&coordType=WGS84GEO&fullAddr=${endpoint}&appKey=${process.env.REACT_APP_T_MAP_API_KEY}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }

      const data = await response.json();
      const resultCoordinate = data.coordinateInfo.coordinate[0];

      if (resultCoordinate) {
        let startLongitude, startLatitude;

        if (resultCoordinate.lon.length > 0) {
          startLongitude = resultCoordinate.lon;
          startLatitude = resultCoordinate.lat;
        } else {
          startLongitude = resultCoordinate.newLon;
          startLatitude = resultCoordinate.newLat;
        }

        console.log('경도 (Longitude): ' + startLongitude);
        console.log('위도 (Latitude): ' + startLatitude);

        // endMarker 위치 업데이트
        setEndMarkerPosition({
          latitude: startLatitude,
          longitude: startLongitude,
        });

        // endMarkerPosition이 업데이트된
        if (mapInstanceRef.current) {
          new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(startLatitude, startLongitude),
            map: mapInstanceRef.current,
          });
        }
      } else {
        console.log('주소에 대한 좌표 정보가 없습니다.');
      }
    } catch (error) {
      console.error('에러:', error);
    }
  };

  return (
    <div
      ref={mapContainerRef}
      id='TMapApp'
      style={{ height: '500px', width: '600px' }}
    ></div>
  );
}

export default Map;
