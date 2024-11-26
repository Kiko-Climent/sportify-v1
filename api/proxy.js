export default async function handler(req, res) {
  const { query, location, radius } = req.query;

  // Dividir la cadena de ubicación en latitud y longitud
  const [latitude, longitude] = location.split(',');

  console.log("Proxy Query Params:", { query, latitude, longitude, radius });

  const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${latitude},${longitude}&radius=${radius}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Google Places:", error);
    res.status(500).json({ error: "Failed to fetch data from Google Places" });
  }
}
