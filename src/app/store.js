import { configureStore } from '@reduxjs/toolkit';
import sportsLocationsReducer from '../redux/slices/sportsLocationsSlice';

export const store = configureStore({
  reducer: {
    sportsLocations: sportsLocationsReducer,
  },
});
