import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLocation: {
    latitude: null,
    longitude: null,
  },
};

const userLocationSlice = createSlice ({
  name: 'userLocation',
  initialState,
  reducers: {
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
  },
});

export const { setUserLocation } = userLocationSlice.actions;

export default userLocationSlice.reducer;