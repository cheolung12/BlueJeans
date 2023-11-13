import React, { useEffect, useRef } from 'react';

//onClick 하기전
//현위치를 기반으로 지도 보여주기
//빨간원으로 보여주기

//onClick 하고나서
//1현위치 지도를 기반으로 집이라는 버튼을 눌렀을 때 경로 알려주기
//2버튼을 누르면 회원가입했을 때 주소를 가져와서 도착위치로 넣어주기
//3현위치와 연결해서 경로 알려주깅 + 걸리는 시간두 알려주깅
///<2~~3연결하는 하고>///
//티맵 네비경로 가져오기

const Map = () => {
  const mapContainerRef = useRef();

  useEffect(() => {
    const handleGeoLocation = position => {
      const script = document.createElement('script');

      script.id = 'tmapScript';

      console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log(latitude, longitude);
      const scriptContent =
        'const map = new Tmapv2.Map("' +
        mapContainerRef.current.id +
        '", {' +
        'center: new Tmapv2.LatLng(' +
        latitude +
        ', ' +
        longitude +
        '),' +
        'zoom: 17,' +
        '});';

      script.innerHTML = scriptContent;
      script.type = 'text/javascript';
      script.async = true;
      document.head.appendChild(script);

      console.log(mapContainerRef.current.id);
    };

    if (!document.getElementById('tmapScript')) {
      navigator.geolocation.getCurrentPosition(handleGeoLocation);
    }
  }, [mapContainerRef]);

  return (
    <div
      ref={mapContainerRef}
      id='TMapApp'
      style={{ height: '500px', width: '600px' }}
    ></div>
  );
};

export default Map;
