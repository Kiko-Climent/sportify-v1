import { createSlice } from '@reduxjs/toolkit';

const sportsLocationsSlice = createSlice({
  name: 'sportsLocations',
  initialState: {
    locations: [],
    filteredLocations: [],
    loading: false,
  },
  reducers: {
    setLocations(state, action) {
      state.locations = action.payload;
    },
    setFilteredLocations(state, action) {
      const searchTerm = action.payload.toLowerCase();
      state.filteredLocations = state.locations.filter((location) => {
        const sports = location.fields?.sport?.arrayValue?.values || [];
        return sports.some((sport) =>
          sport.stringValue.toLowerCase().includes(searchTerm)
        );
      });
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});


export const { setLocations, setFilteredLocations, setLoading } =
  sportsLocationsSlice.actions;
export default sportsLocationsSlice.reducer;
