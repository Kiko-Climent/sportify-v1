import { configureStore } from '@reduxjs/toolkit';
import sportsLocationsReducer from '../redux/slices/sportsLocationsSlice';
import userLocationReducer from '../redux/slices/userLocationSlice';
import sportsGoogleReducer from '../redux/slices/sportsGoogleSlice';
import weatherReducer from '../redux/slices/weatherSlice';

export const store = configureStore({
  reducer: {
    userLocation: userLocationReducer,
    sportsLocations: sportsLocationsReducer,
    sportsGoogle: sportsGoogleReducer,
    weather: weatherReducer,
  },
});

export default store;