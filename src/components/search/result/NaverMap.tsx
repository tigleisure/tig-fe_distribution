import { useBottomSheetStore } from '@store/bottomSheetStore';
import { usePinCardIndexStore } from '@store/pinCardIndexStore';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

interface NaverMapProps {
  locationArray: {
    latitude: number;
    longitude: number;
  }[];
  currentLatitude: number;
  currentLongitude: number;
  isCurrentLocationUIClicked: boolean;
}

export default function NaverMap({
  locationArray,
  currentLatitude,
  currentLongitude,
  isCurrentLocationUIClicked,
}: NaverMapProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef<naver.maps.Map | undefined>(undefined);
  const setIsBottomSheetOpen = useBottomSheetStore(
    (state) => state.setIsBottomSheetOpen
  );
  const setPinCardIndex = usePinCardIndexStore(
    (state) => state.setPinCardIndex
  );
  const markersRef = useRef<naver.maps.Marker[]>([]);

  useEffect(() => {
    if (isMapLoaded && mapRef.current) {
      mapRef.current.setCenter(
        new naver.maps.LatLng(currentLatitude, currentLongitude)
      );
    }
  }, [
    currentLatitude,
    currentLongitude,
    isMapLoaded,
    isCurrentLocationUIClicked,
  ]);

  useEffect(() => {
    if (isMapLoaded && mapRef.current) {
      // Remove existing markers
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // Add new markers
      const newMarkers = locationArray.map((location, i) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            location.latitude,
            location.longitude
          ),
          map: mapRef.current,
          icon: {
            url: '/svg/ping.svg',
          },
        });

        naver.maps.Event.addListener(marker, 'click', () => {
          setIsBottomSheetOpen(false);
          setPinCardIndex(i);
        });

        return marker;
      });

      markersRef.current = newMarkers;
    }
  }, [locationArray, setIsBottomSheetOpen, setPinCardIndex, isMapLoaded]);

  const initializeMap = () => {
    const mapOptions = {
      center: new naver.maps.LatLng(currentLatitude, currentLongitude),
      zoom: 13,
      logoControl: false,
      mapDataControl: false,
      scaleControl: false,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.RIGHT_CENTER,
        legendDisabled: false,
      },
    };
    const map = new naver.maps.Map('map', mapOptions);
    mapRef.current = map;

    // 초기 마커 추가
    const newMarkers = locationArray.map((location, i) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(location.latitude, location.longitude),
        map: map,
        icon: {
          url: '/svg/ping.svg',
        },
      });

      naver.maps.Event.addListener(marker, 'click', () => {
        setIsBottomSheetOpen(false);
        setPinCardIndex(i);
      });

      return marker;
    });

    markersRef.current = newMarkers;

    naver.maps.Event.addListener(map, 'zoom_changed', () => {
      updateMarkers(map, markersRef.current);
    });

    naver.maps.Event.addListener(map, 'dragend', () => {
      updateMarkers(map, markersRef.current);
    });
  };

  const updateMarkers = (map: naver.maps.Map, markers: naver.maps.Marker[]) => {
    const mapBounds: any = map.getBounds();

    for (let i = 0; i < markers.length; i++) {
      const position = markers[i].getPosition();

      if (mapBounds.hasLatLng(position)) {
        showMarker(map, markers[i]);
      } else {
        hideMarker(map, markers[i]);
      }
    }
  };

  const showMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
    marker.setMap(map);
  };

  const hideMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
    marker.setMap(null);
  };

  const handleMapLoad = () => {
    setIsMapLoaded(true);
    initializeMap();
  };

  return (
    <section className="w-full h-full">
      <Script
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        onReady={handleMapLoad}
      />
      <div id="map" className="w-full h-full" />
    </section>
  );
}
