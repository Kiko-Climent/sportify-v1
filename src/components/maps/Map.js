import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ latitude, longitude }) => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const mapOptions = {
    styles: [
      {
        featureType: "all",
        elementType: "all",
        stylers: [
          { saturation: -100 },
          { gamma: 0.5 },
        ],
      },
      {
        featureType: "all",
        elementType: "geometry",
        stylers: [
          { visibility: "on" },
        ],
      },
      {
        featureType: "administrative.country",
        elementType: "geometry.fill",
        stylers: [
          { visibility: "on" },
        ],
      },
      {
        featureType: "administrative.country",
        elementType: "labels.text",
        stylers: [
          { color: "#e90303" },
        ],
      },
      {
        featureType: "landscape.man_made",
        elementType: "geometry.fill",
        stylers: [
          { visibility: "on" },
          { saturation: "-4" },
        ],
      },
      {
        featureType: "landscape.man_made",
        elementType: "geometry.stroke",
        stylers: [
          { visibility: "on" },
          { color: "#000000" },
          { saturation: "66" },
          { lightness: "-92" },
          { gamma: "1.76" },
          { weight: "0.20" },
        ],
      },
      // Agrega aquí el resto de los estilos...
    ],
    disableDefaultUI: true, // Opcional: desactiva los controles por defecto
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
        options={mapOptions}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
