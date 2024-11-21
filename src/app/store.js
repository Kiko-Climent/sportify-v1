import { configureStore } from '@reduxjs/toolkit';
import sportsLocationsReducer from '../redux/slices/sportsLocationsSlice';
import userLocationReducer from '../redux/slices/userLocationSlice'

export const store = configureStore({
  reducer: {
    userLocation: userLocationReducer,
    sportsLocations: sportsLocationsReducer,
  },
});

export default store;