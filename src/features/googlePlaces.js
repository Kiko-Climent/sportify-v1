import {
  fetchGoogleLocationsStart,
  fetchGoogleLocationsSuccess,
  fetchGoogleLocationsFailure,
} from "../redux/slices/sportsGoogleSlice";

export const fetchGooglePlaces = (query, location, radius = 5000) => async (dispatch) => {
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
