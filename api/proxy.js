export default async function handler(req, res) {
  const {query, location, radius} = req.query;

  const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${location}&radius=${radius}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json(data);
  } catch(error) {
    console.error("Error fetching Google Places:", error);
    res.status(500).json({ error: "Failed to fetch data from Google Places" });
  }
}
