import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  googleLocations: [],
  loading: false,
  error: null,
}

const sportsGoogleSlice = createSlice({
  name: "sportsGoogle",
  initialState,
  reducers: {
    fetchGoogleLocationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchGoogleLocationsSuccess: (state, action) => {
      state.loading = false;
      state.googleLocations = action.payload;
      
    },
    fetchGoogleLocationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchGoogleLocationsStart,
  fetchGoogleLocationsSuccess,
  fetchGoogleLocationsFailure,
} = sportsGoogleSlice.actions;

export default sportsGoogleSlice.reducer;