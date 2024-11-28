import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { haversineDistance } from '../features/Distance';
import Map from './maps/Map';

const SportsLocations = () => {
  const filteredLocations = useSelector((state) => state.sportsLocations.filteredLocations); // Filtered Data
  const googlePlaces = useSelector((state) => state.sportsGoogle.googleLocations); // Google Places data
  const loading = useSelector((state) => state.sportsLocations.loading);
  const userLocation = useSelector((state) => state.userLocation.userLocation); // User location

  const [showGoogle, setShowGoogle] = useState(false); // Toggle between DB and Google results
  const [googleResultsLimit, setGoogleResultsLimit] = useState(5); // Limit Google results

  if (loading) {
    return <div>Loading...</div>;
  }

  if ((!filteredLocations || filteredLocations.length === 0) && (!googlePlaces || googlePlaces.length === 0)) {
    return <div>No locations found</div>;
  }

  const googleResults = googlePlaces.slice(0, googleResultsLimit); // Limit Google results

  // Render a location (either from DB or Google)
  const renderLocation = (location, isGooglePlace) => {
    const latitude = isGooglePlace
      ? location.geometry.location.lat
      : location.fields?.location?.geoPointValue?.latitude;
    const longitude = isGooglePlace
      ? location.geometry.location.lng
      : location.fields?.location?.geoPointValue?.longitude;

    const distance =
      userLocation.latitude &&
      userLocation.longitude &&
      latitude &&
      longitude
        ? haversineDistance(userLocation, { latitude, longitude })
        : null;

    if (isGooglePlace) {
      // Google Place Result
      return (
        <div
          key={location.place_id}
          className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-3"
        >
          <div className="flex-1">
            <h2 className="font-bold text-2xl">{location.name}</h2>
            <p>{location.formatted_address}</p>
            {distance !== null && (
              <p className="mt-2 text-sm font-semibold">
                Distance: {distance.toFixed(2)} km
              </p>
            )}
          </div>
          <div className="flex-1">
            {latitude && longitude ? (
              <Map latitude={latitude} longitude={longitude} />
            ) : (
              <p>Location not available</p>
            )}
          </div>
        </div>
      );
    } else {
      // Database Result
      const fields = location.fields || {};
      const name = fields.name?.stringValue || "Name not available";
      const address = fields.address?.stringValue || "Address not available";
      const contact = fields.contact?.stringValue || "No contact available";
      const details = fields.details?.stringValue || "No details available";
      const sports =
        fields.sport?.arrayValue?.values?.map((sport) => sport.stringValue).join(", ") || "No sports listed";
      const web = fields.web?.stringValue || null;

      return (
        <div
          key={fields.id?.stringValue}
          className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-3"
        >
          <div className="flex-1">
            <h2 className="font-bold text-2xl">{name}</h2>
            <p>
              <strong>Address:</strong> {address}
            </p>
            <p>
              <strong>Contact:</strong> {contact}
            </p>
            <p>
              <strong>Details:</strong> {details}
            </p>
            <p>
              <strong>Sports:</strong> {sports}
            </p>
            {web && (
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {web}
                </a>
              </p>
            )}
            {distance !== null && (
              <p className="mt-2 text-sm font-semibold">
                Distance: {distance.toFixed(2)} km
              </p>
            )}
          </div>
          <div className="flex-1">
            {latitude && longitude ? (
              <Map latitude={latitude} longitude={longitude} />
            ) : (
              <p>Location not available</p>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <section className="flex flex-col items-center justify-center text-highlight overflow-hidden h-full pt-24">
      <div className="text-center mb-6">
        <h1 className="text-3xl uppercase font-bold">Locations Found:</h1>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className={`px-4 py-2 ${
              !showGoogle ? "bg-highlight text-bg_color" : "bg-bg_color font-bold"
            }`}
            onClick={() => setShowGoogle(false)}
          >
            Database Results
          </button>
          <button
            className={`px-4 py-2 ${
              showGoogle ? "bg-highlight text-bg_color" : "bg-bg_color font-bold"
            }`}
            onClick={() => setShowGoogle(true)}
          >
            Google Results
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col text-center lg:text-start">
        {!showGoogle &&
          filteredLocations.map((location) => renderLocation(location, false))}
        {showGoogle &&
          googleResults.map((location) => renderLocation(location, true))}
      </div>

      {showGoogle && googlePlaces.length > googleResultsLimit && (
        <div className="text-center my-4">
          <button
            className="px-4 py-2 bg-highlight text-bg_color font-bold"
            onClick={() => setGoogleResultsLimit(googleResultsLimit + 5)}
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default SportsLocations;
