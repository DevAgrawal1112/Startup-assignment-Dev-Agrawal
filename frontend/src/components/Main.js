import React from "react";
import { useState } from "react";
import { Card } from "./Card";
import { Detail } from "./Detail";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import 'dotenv/config';

export const Main = () => {
    const apikey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const api = 1;
    console.log(apikey);
    const containerStyle = {
        width: '1000px',
        height: '800px'
      };
    const center = {
        lat: -3.745,
        lng: -38.523
    };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: api
      })
      const [map, setMap] = React.useState(null)
      const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
      }, [])
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
    // const [selectedArticleId, setSelectedArticleId] = useState(null);
    return isLoaded ? (
        <div className="flex border-b-2 border-black">
            <div className="flex border-r-2 border-black w-7/12">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={2}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <></>
            </GoogleMap>
            </div>
            <div className="flex w-5/12">
                <Card />
            </div>
        </div>
    ):<></>
};
