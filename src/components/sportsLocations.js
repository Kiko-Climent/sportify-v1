import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocations, setLoading } from '../redux/slices/sportsLocationsSlice';
import Map from '../components/maps/Map.js';

const SportsLocations = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.sportsLocations.locations);
  const loading = useSelector((state) => state.sportsLocations.loading);

  useEffect(() => {
    dispatch(setLoading(true)); // Iniciamos el estado de carga

    fetch(
      'https://firestore.googleapis.com/v1/projects/sportify-v1/databases/(default)/documents/sports_locations'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data); // Verifica la estructura de los datos
        dispatch(setLocations(data.documents || [])); // Almacenamos los datos en Redux
        dispatch(setLoading(false)); // Finalizamos el estado de carga
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        dispatch(setLoading(false)); // Finalizamos el estado de carga si hay error
      });
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!locations || locations.length === 0) {
    return <div>No locations found</div>; // Manejo cuando no hay datos
  }

  return (
    <div>
      <h1>Sports Locations</h1>
      <ul>
        {locations.map((location, index) => {
          const fields = location.fields || {};
          const latitude = fields.location?.geoPointValue?.latitude;
          const longitude = fields.location?.geoPointValue?.longitude;

          return (
            <li key={index}>
              <h2>{fields.name?.stringValue || 'Name not available'}</h2>
              <p>{fields.address?.stringValue || 'Address not available'}</p>
              <p>{fields.details?.stringValue || 'Details not available'}</p>
              <p>
                Sports:{' '}
                {fields.sport?.arrayValue?.values
                  ? fields.sport.arrayValue.values
                      .map((val) => val.stringValue)
                      .join(', ')
                  : 'No sports available'}
              </p>
              {latitude && longitude && (
                <Map latitude={latitude} longitude={longitude} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SportsLocations;
