import React, { useEffect, useRef } from 'react';
import '../home/AddressButton';

//onClick 하기전
//현위치를 기반으로 지도 보여주기
//빨간원으로 보여주기

//onClick 하고나서
//1현위치 지도를 기반으로 집이라는 버튼을 눌렀을 때 경로 알려주기
//2버튼을 누르면 회원가입했을 때 주소를 가져와서 도착위치로 넣어주기
//3현위치와 연결해서 경로 알려주깅 + 걸리는 시간두 알려주깅
///<2~~3연결하는 하고>///
//티맵 네비경로 가져오기

const Map = ({ userAddress }) => {
  const mapContainerRef = useRef();
  const mapInitialized = useRef(false);

  console.log('버튼에서 가져옴', userAddress);

  //귀여운전자사전 >_________________<

  useEffect(() => {
    const handleGeoLocation = position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const nowPosition = { latitude, longitude };

      console.log('now', nowPosition);

      if (!mapInitialized.current) {
        initTmap(nowPosition);
        mapInitialized.current = true;
      }
    };

    if (!document.getElementById('tmapScript')) {
      navigator.geolocation.getCurrentPosition(handleGeoLocation);
    }
  }, []);
  //공식문서에서 window. 붙이면 오류안
  const initTmap = nowPosition => {
    const map = new window.Tmapv2.Map(mapContainerRef.current.id, {
      center: new window.Tmapv2.LatLng(
        nowPosition.latitude,
        nowPosition.longitude
      ),
      zoom: 17,
    });

    // 마커
    const marker = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(
        nowPosition.latitude,
        nowPosition.longitude
      ),
      // icon: 'https://imagescdn.gettyimagesbank.com/500/18/612/899/0/953455822.jpg',
      // size: new window.Size(24, 38),
      map: map,
    });
  };

  return (
    <div
      ref={mapContainerRef}
      id='TMapApp'
      style={{ height: '500px', width: '600px' }}
    ></div>
  );
};

export default Map;
