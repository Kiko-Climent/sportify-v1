import React, { useEffect } from 'react';
import { LoadScript } from "@react-google-maps/api";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLocations, setLoading } from './redux/slices/sportsLocationsSlice';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Results from './pages/Results';
import SplashScreen from './components/SplashScreen';

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const App = () => {
  const dispatch = useDispatch();

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
        dispatch(setLocations(data.documents || []));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  return (
    <Router>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route
          path="/*"
          element={
            <Layout>            
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/sports-locations" element={<Results />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
      </LoadScript>
    </Router>
  );
};

export default App;
