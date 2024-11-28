import React from 'react';
import { useSelector } from 'react-redux';
import { haversineDistance } from '../features/Distance';
import Map from './maps/Map';

const SportsLocations = () => {
  const filteredLocations = useSelector((state) => state.sportsLocations.filteredLocations); // Filtered Data
  const googlePlaces = useSelector((state) => state.sportsGoogle.googleLocations); // Correct access to Google Places locations
  const loading = useSelector((state) => state.sportsLocations.loading);
  const userLocation = useSelector((state) => state.userLocation.userLocation);  // Get user location

  if (loading) {
    return <div>Loading...</div>;
  }

  if ((!filteredLocations || filteredLocations.length === 0) && (!googlePlaces || googlePlaces.length === 0)) {
    return <div>No locations found</div>;
  }

  // Combine both filteredLocations (from DB) and googlePlaces (from Google API)
  const allLocations = [...filteredLocations, ...googlePlaces];

  return (
    <section className="flex flex-col items-center justify-center text-highlight overflow-hidden h-full pt-24">
      <div className="text-center mb-6">
        <h1 className="text-3xl uppercase font-bold">Locations Found:</h1>
      </div>
      
      <div className="w-full flex flex-col text-center lg:text-start">
        {allLocations.map((location, index) => {
          const isGooglePlace = location.hasOwnProperty('place_id'); // Check if it's a Google Place
          const fields = location.fields || {}; // DB location
          const latitude = isGooglePlace ? location.geometry.location.lat : fields.location?.geoPointValue?.latitude;
          const longitude = isGooglePlace ? location.geometry.location.lng : fields.location?.geoPointValue?.longitude;

          // Calculate distance between user and location
          const distance = userLocation.latitude && userLocation.longitude && latitude && longitude 
            ? haversineDistance(userLocation, { latitude, longitude }) 
            : null;

          return (
            <div key={index} className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-3">
              
              <div className="flex-1">
                <h2 className="font-bold text-2xl">
                  {isGooglePlace ? location.name : fields.name?.stringValue || "Name not available"}
                </h2>
                <p>{isGooglePlace ? location.vicinity : fields.address?.stringValue || "Address not available"}</p>
                <p>{isGooglePlace ? location.types.join(", ") : fields.details?.stringValue || "Details not available"}</p>
                <h2 className="text-lg font-semibold">
                  Sports:{" "}
                  {isGooglePlace
                    ? "No sports available" // Google Places doesn't have sport data
                    : fields.sport?.arrayValue?.values
                        ? fields.sport.arrayValue.values
                            .map((val) => val.stringValue)
                            .join(", ")
                        : "No sports available"}
                </h2>

                {distance !== null && (
                  <p className="mt-2 text-sm font-semibold">Distance: {distance.toFixed(2)} km</p>
                )}
              </div>

              <div className="flex-1">
                {latitude && longitude ? (
                  <div className="">
                    <Map latitude={latitude} longitude={longitude} />
                  </div>
                ) : (
                  <p>Location not available</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SportsLocations;
