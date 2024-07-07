'use client';
import { info } from 'console';
import Script from 'next/script';

export default function NaverMap() {
  const initializeMap = () => {
    const mapOptions = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 15,
      logoControl: false,
      mapDataControl: false,
      scaleControl: false
    };
    const map = new naver.maps.Map('map', mapOptions);
    const markers: naver.maps.Marker[] = [];
    const infoWindows: naver.maps.InfoWindow[] = [];
    for (let i = 1; i < 100; i++) {
      markers.push(
        new naver.maps.Marker({
          position: new naver.maps.LatLng(
            37.3595704 + i * 0.001,
            127.105399 + i * 0.001
          ),
          map: map,
          icon: {
            // content:
            //   '<div style="background-color: #f00; color: #fff; padding: 5px;">마커</div>',
            url: '/svg/tig.svg',
          },
        })
      );
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

    const updateMarkers = (map: naver.maps.Map, markers: naver.maps.Marker[]) => {
      const mapBounds : any = map.getBounds();
    
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
        onLoad={initializeMap}
      />
      <div id="map" className="w-full h-full" />
    </section>
  );
}
