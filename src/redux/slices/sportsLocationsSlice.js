import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [],
  loading: false
};


const sportsLocationsSlice = createSlice ({
  name: 'sportsLocations',
  initialState,
  reducers: {
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {setLocations, setLoading} = sportsLocationsSlice.actions;
export default sportsLocationsSlice.reducer;
