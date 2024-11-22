export const fetchGooglePlaces = async (query, location, radius = 5000) => {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${location.lat},${location.lng}&radius=${radius}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === "OK") {
      return data.results; // Devuelve los resultados encontrados
    } else {
      console.error("Error fetching Google Places: ", data.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching Google Places: ", error);
    return [];
  }
};