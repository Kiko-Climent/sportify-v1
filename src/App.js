import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLocations, setLoading } from './redux/slices/sportsLocationsSlice';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Results from './pages/Results';
// import SplashScreen from './components/SplashScreen';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true)); // Comenzar el estado de carga

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
        dispatch(setLocations(data.documents || [])); // Guardar los datos en Redux
        dispatch(setLoading(false)); // Finalizar el estado de carga
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        dispatch(setLoading(false)); // Manejar errores
      });
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sports-locations" element={<Results />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
