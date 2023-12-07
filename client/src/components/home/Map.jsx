import React, { useEffect, useState } from 'react';

const Map = ({ userAddress }) => {
  const [directionData, setDirectionData] = useState(null);
  const [houseCoordinates, setHouseCoordinates] = useState(null);
  const [nowCoordinates, setNowCoordinates] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_MAP_JS_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const mapOption = {
              center: new window.kakao.maps.LatLng(lat, lon),
              level: 3,
            };

            const map = new window.kakao.maps.Map(mapContainer, mapOption);

            const locPosition = new window.kakao.maps.LatLng(lat, lon);
            const message = '<div style="padding:5px;">여기 있으시군요!</div>';
            nowMarker(map, locPosition, message);

            const geocoder = new window.kakao.maps.services.Geocoder();
            const callback = function (result, status) {
              if (status === window.kakao.maps.services.Status.OK) {
                if (result.length > 0) {
                  const firstResult = result[0];
                  const x = firstResult.x;
                  const y = firstResult.y;

                  const houseCoordinates = new window.kakao.maps.LatLng(y, x);
                  setHouseCoordinates(houseCoordinates);

                  houseMarker(map, houseCoordinates, '마커 메시지');

                  // 사용자의 주소를 기반으로 좌표를 가져오면서 지도가 다 그려진 상태에서 호출
                  fetchData(map, locPosition, houseCoordinates);
                }
              }
            };

            geocoder.addressSearch(userAddress, callback);
          });
        }
      });
    };
  }, [userAddress]);

  const nowMarker = (map, locPosition) => {
    // 현재 위치 마커
    const imageSrc =
      'https://bluejeansbucket2.s3.ap-northeast-2.amazonaws.com/user/nowPosition-removebg-preview.png';
    const imageSize = new window.kakao.maps.Size(64, 69);
    const imageOption = { offset: new window.kakao.maps.Point(27, 69) };

    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    const marker = new window.kakao.maps.Marker({
      map: map,
      position: locPosition,
      image: markerImage,
    });

    map.setCenter(locPosition);

    // 현재 위치 좌표를 상태에 저장
    setNowCoordinates(locPosition);
  };

  const houseMarker = (map, locPosition) => {
    // 집 위치 마커
    const imageSrc =
      'https://bluejeansbucket2.s3.ap-northeast-2.amazonaws.com/user/housePosition-removebg-preview.png';
    const imageSize = new window.kakao.maps.Size(64, 69);
    const imageOption = { offset: new window.kakao.maps.Point(27, 69) };

    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    const marker = new window.kakao.maps.Marker({
      map: map,
      position: locPosition,
      image: markerImage,
    });

    map.setCenter(locPosition);
  };

  const fetchData = async (map, nowCoordinates, houseCoordinates) => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_API_MAP_REST_KEY;
    const origin = `${nowCoordinates.getLng()},${nowCoordinates.getLat()}`;
    const destination = `${houseCoordinates.getLng()},${houseCoordinates.getLat()}`;
    const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin}&destination=${destination}&waypoints=&priority=RECOMMEND&car_fuel=GASOLINE&car_hipass=false&alternatives=false&road_details=false`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('data!!!!!', data);
      console.log('first', data.routes[0]);
      console.log('second', data.routes[0].sections);
      console.log('third', data.routes[0].sections[0].guides);
      const last = data.routes[0].sections[0].guides;
      setDirectionData(data);
      console.log('tqtqtq', last);
      setDirectionData(data);

      // 폴리라인을 생성하고 지도에 추가
      const pathCoordinates = last.map((guide) => {
        const { x, y } = guide;
        return new window.kakao.maps.LatLng(y, x);
      });
      // 경로를 연결할 폴리라인 생성
      const polyline = new window.kakao.maps.Polyline({
        path: pathCoordinates,
        strokeWeight: 5,
        strokeColor: '#FF0000',
        strokeOpacity: 1,
        strokeStyle: 'solid',
      });

      polyline.setMap(map);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div
      id='map'
      style={{ width: '100%', height: '400px', marginBottom: '30px' }}
    ></div>
  );
};

export default Map;
