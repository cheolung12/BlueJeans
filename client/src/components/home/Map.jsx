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

      if (resultCoordinate) {
        let startLongitude, startLatitude;

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

        const requestData = {
          startX: currentMarkerPosition.latitude,
          startY: currentMarkerPosition.longitude,
          endX: startLatitude,
          endY: startLongitude,
          // passList: '경도,위도_경도,위도_경도,위도',
          // reqCoordType: 'WGS84GEO',
          // resCoordType: 'EPSG3857',
          // startName: '출발지',
          // endName: '도착지',
        };
        console.log(requestData);

        const headers = {
          appKey: process.env.REACT_APP_T_MAP_API_KEY,
        };

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

          await drawPedestrianRoute(
            currentMarkerPosition.latitude,
            currentMarkerPosition.longitude,
            startLatitude,
            startLongitude
          );

          drawLine(lineCoordinates);

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

  const drawLine = (arrPoints) => {
    if (mapInstanceRef.current && arrPoints.length >= 2) {
      const lineCoordinates = arrPoints.map(
        (point) => new window.Tmapv2.LatLng(point.latitude, point.longitude)
      );

      const polyline_ = new window.Tmapv2.Polyline({
        path: lineCoordinates,
        strokeColor: 'red',
        strokeWeight: 4,
        map: mapInstanceRef.current,
      });
    }
  };
  const drawPedestrianRoute = async (lineCoordinates) => {
    try {
      const response = await axios.post(
        'https://apis.openapi.sk.com/tmap/routes/pedestrian',
        {
          startX: lineCoordinates[0].latitude,
          startY: lineCoordinates[0].longitude,
          endX: lineCoordinates[lineCoordinates.length - 1].latitude,
          endY: lineCoordinates[lineCoordinates.length - 1].longitude,
          reqCoordType: 'WGS84GEO',
          resCoordType: 'EPSG3857',
          appKey: process.env.REACT_APP_T_MAP_API_KEY,
        }
      );

      const data = response.data;

      if (data.features && data.features.length > 0) {
        const geometry = data.features[0].geometry;

        if (geometry.type === 'LineString') {
          const routeCoordinates = geometry.coordinates.map(
            (coord) => new window.Tmapv2.LatLng(coord[1], coord[0])
          );

          // 기존 도보 경로를 지우고 새로운 도보 경로를 그립니다.
          if (resultdrawArr.length > 0) {
            for (let i in resultdrawArr) {
              resultdrawArr[i].setMap(null);
            }
            resultdrawArr = [];
          }

          const pedestrianPolyline = new window.Tmapv2.Polyline({
            path: routeCoordinates,
            strokeColor: 'blue',
            strokeWeight: 3,
            map: mapInstanceRef.current,
          });

          resultdrawArr.push(pedestrianPolyline);
        }
      }
    } catch (error) {
      console.error('도보 경로를 그리는 중 에러:', error);
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

  return (
    <div className='relative'>
      {loading && (
        <div className=' text-red'>
          <Sktelecom />
        </div>
      )}
      <div
        ref={mapContainerRef}
        id='TMapApp'
        className='w-[53.125rem] h-[30rem] drop-shadow-md'
      ></div>
    </div>
  );
}

export default Map;
