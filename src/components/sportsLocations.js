import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocations, setLoading } from '../redux/slices/sportsLocationsSlice';

const SportsLocations = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.sportsLocations.locations); // Todos los datos
  const filteredLocations = useSelector((state) => state.sportsLocations.filteredLocations); // Datos filtrados
  const loading = useSelector((state) => state.sportsLocations.loading);

  useEffect(() => {
    dispatch(setLoading(true));

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
        dispatch(setLocations(data.documents || [])); // Almacenar todos los datos
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  const results = filteredLocations.length > 0 ? filteredLocations : locations;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!results || results.length === 0) {
    return <div>No locations found</div>;
  }

  return (
    <div>
      <h1>Sports Locations</h1>
      <ul>
        {results.map((location, index) => {
          const fields = location.fields || {};
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
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SportsLocations;
