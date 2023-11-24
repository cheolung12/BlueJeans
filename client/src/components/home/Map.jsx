import React, { useEffect, useRef, useState } from 'react';

function Map({ userAddress }) {
  const mapContainerRef = useRef();
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  let resultdrawArr = [];

  const [endMarkerPosition, setEndMarkerPosition] = useState(null);
  const [currentMarkerPosition, setCurrentMarkerPosition] = useState(null);

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
        }
      } catch (error) {
        console.error('에러:', error);
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

          drawPedestrianRoute(
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
        }
      } else {
        console.log('주소에 대한 좌표 정보가 없습니다.');
      }
    } catch (error) {
      console.error('에러:', error);
    }
  };

  const drawLine = (arrPoints) => {
    if (mapInstanceRef.current && arrPoints.length >= 2) {
      const lineCoordinates = arrPoints.map(
        (point) => new window.Tmapv2.LatLng(point.latitude, point.longitude)
      );

      const polyline_ = new window.Tmapv2.Polyline({
        path: lineCoordinates,
        strokeColor: 'FF0000',
        strokeWeight: 7,
        map: mapInstanceRef.current,
      });
    }
  };

  const drawPedestrianRoute = async (startLat, startLng, endLat, endLng) => {
    const apiEndpoint = `https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result&startX=${startLng}&startY=${startLat}&endX=${endLng}&endY=${endLat}&reqCoordType=WGS84GEO&resCoordType=EPSG3857&startName=출발지&endName=도착지&appKey=${process.env.REACT_APP_T_MAP_API_KEY}`;

    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const geometry = data.features[0].geometry;

        if (geometry.type === 'LineString') {
          const lineCoordinates = geometry.coordinates.map(
            (coord) => new window.Tmapv2.LatLng(coord[1], coord[0])
          );

          if (resultdrawArr.length > 0) {
            for (let i in resultdrawArr) {
              resultdrawArr[i].setMap(null);
            }
            resultdrawArr = [];
          }

          const polyline_ = new window.Tmapv2.Polyline({
            path: lineCoordinates,
            strokeColor: '0000FF',
            strokeWeight: 3,
            map: mapInstanceRef.current,
          });

          resultdrawArr.push(polyline_);
        }
      }
    } catch (error) {
      console.error('에러:', error);
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
    <div
      ref={mapContainerRef}
      id='TMapApp'
      className='w-[53.125rem] h-[34.375rem] pt-7 drop-shadow-md'
    ></div>
  );
}

export default Map;
