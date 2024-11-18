import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ latitude, longitude }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    console.error("Google Maps API Key is missing!");
    return <div>Error: Google Maps API Key not found</div>;
  }

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
