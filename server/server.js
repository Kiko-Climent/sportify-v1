import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.send("Server Running succesfully.");
});

// Ruta para manejar solicitudes a Google Places
app.get("/api/google-places", async (req, res) => {
  const { query, latitude, longitude, radius } = req.query;

  if (!query || !latitude || !longitude) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${latitude},${longitude}&radius=${radius || 5000}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      res.json(data.results);
    } else {
      res.status(400).json({ error: data.status });
    }
  } catch (error) {
    console.error("Error fetching Google Places:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Manejo de rutas no definidas
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// Servidor escuchando en el puerto definido
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
