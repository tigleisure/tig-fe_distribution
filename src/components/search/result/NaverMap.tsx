import { useBottomSheetStore } from '@store/bottomSheetStore';
import { usePinCardIndexStore } from '@store/pinCardIndexStore';
import { info } from 'console';
import { set } from 'date-fns';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

interface NaverMapProps {
  locationArray: {
    latitude: number;
    longitude: number;
  }[];
  currentLatitude: number;
  currentLongitude: number;
}

export default function NaverMap({
  locationArray,
  currentLatitude,
  currentLongitude,
}: NaverMapProps) {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const setIsBottomSheetOpen = useBottomSheetStore((state) => state.setIsBottomSheetOpen);
  const setPinCardIndex = usePinCardIndexStore ((state) => state.setPinCardIndex);
  const markersRef = useRef<naver.maps.Marker[]>([]); // Declare markersRef variable
  
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter(
        new naver.maps.LatLng(currentLatitude, currentLongitude)
      );
    }
  }, [currentLatitude, currentLongitude]);
  
  useEffect(() => {
    if (mapRef.current) {
      // Remove existing markers
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
  
      // Add new markers
      const newMarkers = locationArray.map((location, i) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(location.latitude, location.longitude),
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
  }, [locationArray]);

  const initializeMap = () => {
    const mapOptions = {
      center: new naver.maps.LatLng(currentLatitude, currentLongitude),
      zoom: 13,
      logoControl: false,
      mapDataControl: false,
      scaleControl: false,
    };
    const map = new naver.maps.Map('map', mapOptions);
    mapRef.current = map;
    const markers: naver.maps.Marker[] = [];
    const infoWindows: naver.maps.InfoWindow[] = [];
    for (let i = 0; i < locationArray.length; i++) {
      markers.push(
        new naver.maps.Marker({
          position: new naver.maps.LatLng(
            locationArray[i].latitude,
            locationArray[i].longitude
          ),
          map: map,
          icon: {
            url: '/svg/ping.svg',
          },
        })
      );
      naver.maps.Event.addListener(markers[i], 'click', function () {
        setIsBottomSheetOpen(false);
        setPinCardIndex(i);
      });
      // 정보창이 예상대로 동작하지 않음. 필요하지 않으면 안 쓰는게 나을듯
      // infoWindows.push(
      //   new naver.maps.InfoWindow({
      //     content: [
      //       '<div style="width: 140px; height: 100px; padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;">',
      //       `   <div style="font-weight: bold; margin-bottom: 5px; font-size: 20px;">${i}번째 marker</div>`,
      //       `   <div style="font-size: 14px;">${'hello'}<div>`,
      //       "</div>",
      //     ].join(""),
      //     maxWidth: 300,
      //     anchorSize: {
      //       width: 12,
      //       height: 14,
      //     },
      //     borderColor: "#cecdc7",
      //   })
      // );
    }
    naver.maps.Event.addListener(map, 'zoom_changed', function () {
      updateMarkers(map, markers);
    });

    naver.maps.Event.addListener(map, 'dragend', function () {
      updateMarkers(map, markers);
    });

    const updateMarkers = (
      map: naver.maps.Map,
      markers: naver.maps.Marker[]
    ) => {
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

    // 마커 숨김 함수
    const hideMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
      marker.setMap(null);
    };

    //   function getClickHandler(seq:number) {
    //     return function() {
    //         var marker = markers[seq],
    //             infoWindow = infoWindows[seq];

    //         if (infoWindow.getMap()) {
    //             infoWindow.close();
    //         } else {
    //             infoWindow.open(map, marker);
    //         }
    //     }
    // }

    // for (var i=0, ii=markers.length; i<ii; i++) {
    //     naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));
    // }
  };

  return (
    <section className="w-full h-full">
      <Script
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        onReady={initializeMap}
      />
      <div id="map" className="w-full h-full" />
    </section>
  );
}
