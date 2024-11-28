import {
  fetchGoogleLocationsStart,
  fetchGoogleLocationsSuccess,
  fetchGoogleLocationsFailure,
} from "../redux/slices/sportsGoogleSlice";

export const fetchGooglePlaces = (query, location, radius = 5000) => async (dispatch) => {
  // const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${location.latitude},${location.longitude}&radius=${radius}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  // const proxyUrl = process.env.REACT_APP_PROXY_URL;
  // const url = `${proxyUrl}?query=${query}&location=${location.latitude},${location.longitude}&radius=${radius}`;
  const backendUrl = "http://localhost:5000/api/google-places";

  dispatch(fetchGoogleLocationsStart());

  try {
    const response = await fetch(
      `${backendUrl}?query=${query}&latitude=${location.latitude}&longitude=${location.longitude}&radius=${radius}`
    );
    const data = await response.json();
    

    if (Array.isArray(data)) {
      console.log("Google Places Results:", data);
      dispatch(fetchGoogleLocationsSuccess(data));
    } else {
      console.error("Error fetching Google Places: Invalid response format");
      dispatch(fetchGoogleLocationsFailure("Invalid response format"));
    }
  } catch (error) {
    console.error("Error fetching Google Places:", error.message);
    dispatch(fetchGoogleLocationsFailure(error.message));
  }
};


// import {
//   fetchGoogleLocationsStart,
//   fetchGoogleLocationsSuccess,
//   fetchGoogleLocationsFailure,
// } from "../redux/slices/sportsGoogleSlice";

// export const fetchGooglePlaces = (query, location, radius = 5000) => async (dispatch) => {
//   // Si location es una cadena, la dividimos en latitud y longitud
//   let latitude, longitude;
//   if (typeof location === 'string') {
//     [latitude, longitude] = location.split(',');
//   } else {
//     // Si location ya es un objeto, usamos las propiedades directamente
//     latitude = location.latitude;
//     longitude = location.longitude;
//   }

//   // Construcción de la URL
//   const proxyUrl = process.env.REACT_APP_PROXY_URL;
//   const url = `${proxyUrl}?query=${query}&location=${latitude},${longitude}&radius=${radius}`;
//   console.log('Calling API URL:', url);

//   dispatch(fetchGoogleLocationsStart());

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
    
//     if (data.status === "OK") {
//       console.log("Google Places Results:", data.results);
//       dispatch(fetchGoogleLocationsSuccess(data.results));
//     } else {
//       console.error("Error fetching Google Places:", data.status);
//       dispatch(fetchGoogleLocationsFailure(data.status));
//     }
//   } catch (error) {
//     console.error("Error fetching Google Places:", error.message);
//     dispatch(fetchGoogleLocationsFailure(error.message));
//   }
// };
