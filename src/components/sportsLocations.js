import React from 'react';
import { useSelector } from 'react-redux';
import Map from './maps/Map'

const SportsLocations = () => {
  const filteredLocations = useSelector((state) => state.sportsLocations.filteredLocations); // Filtered Data
  const loading = useSelector((state) => state.sportsLocations.loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!filteredLocations || filteredLocations.length === 0) {
    return <div>No locations found</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center text-highlight overflow-hidden h-full pt-24">
      {/* Título centrado */}
      <div className="text-center mb-6">
        <h1 className="text-3xl uppercase font-bold">Locations Found:</h1>
      </div>
      
      {/* Contenedor principal para información y mapa */}
      <div className="w-full flex flex-col text-center lg:text-start">
        {filteredLocations.map((location, index) => {
          const fields = location.fields || {};
          const latitude = fields.location?.geoPointValue?.latitude;
          const longitude = fields.location?.geoPointValue?.longitude;

          return (
            <div
              key={index}
              className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-3"
            >
              {/* Columna de información */}
              <div className="flex-1">
                <h2 className="font-bold text-2xl">
                  {fields.name?.stringValue || "Name not available"}
                </h2>
                <p>{fields.address?.stringValue || "Address not available"}</p>
                <p>{fields.details?.stringValue || "Details not available"}</p>
                <h2 className="text-lg font-semibold">
                  Sports:{" "}
                  {fields.sport?.arrayValue?.values
                    ? fields.sport.arrayValue.values
                        .map((val) => val.stringValue)
                        .join(", ")
                    : "No sports available"}
                </h2>
              </div>

              {/* Columna del mapa */}
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
