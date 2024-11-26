import {
  fetchGoogleLocationsStart,
  fetchGoogleLocationsSuccess,
  fetchGoogleLocationsFailure,
} from "../redux/slices/sportsGoogleSlice";

export const fetchGooglePlaces = (query, location, radius = 5000) => async (dispatch) => {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${location.latitude},${location.longitude}&radius=${radius}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  console.log('Calling API URL:', url);

  dispatch(fetchGoogleLocationsStart());

  try {
    const response = await fetch(url);
    const data = await response.json();
    

    if (data.status === "OK") {
      console.log("Google Places Results:", data.results);
      dispatch(fetchGoogleLocationsSuccess(data.results));
    } else {
      console.error("Error fetching Google Places:", data.status);
      dispatch(fetchGoogleLocationsFailure(data.status));
    }
  } catch (error) {
    console.error("Error fetching Google Places:", error.message);
    dispatch(fetchGoogleLocationsFailure(error.message));
  }
};
