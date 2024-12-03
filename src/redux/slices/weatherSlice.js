import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: '',
  temp: null,
  description: '',
  humidity: null,
  wind: null,
  icon: '',
}

const weatherSlice = createSlice ({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action) => {
      state.location = action.payload.location;
      state.temp = action.payload.temp;
      state.description = action.payload.description;
      state.humidity = action.payload.humidity;
      state.wind = action.payload.wind;
      state.icon = action.payload.icon;
    },
  },
});

export const { setWeather } = weatherSlice.actions;
export default weatherSlice.reducer;