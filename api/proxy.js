// api/proxy.js
export default async function handler(req, res) {
  const { query, latitude, longitude, radius } = req.query;

  if (!query || !latitude || !longitude) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${latitude},${longitude}&radius=${radius || 5000}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

  try {
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === "OK") {
      res.status(200).json(data.results);
    } else {
      res.status(400).json({ error: data.status });
    }
  } catch (error) {
    console.error("Error fetching Google Places:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
