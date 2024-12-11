export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  const { query, latitude, longitude, radius } = req.query;

  console.log("Query Params:", { query, latitude, longitude, radius });

  if (!query || !latitude || !longitude) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${latitude},${longitude}&radius=${radius || 5000}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  console.log("Google API URL:", apiUrl);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === "OK") {
      res.status(200).json(data.results);
    } else {
      console.error("Google Places Error:", data.error_message || data.status);
      res.status(400).json({ error: data.error_message || data.status });
    }
  } catch (error) {
    console.error("Error fetching Google Places:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
