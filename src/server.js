import express from 'express';
import {fileURLToPath} from 'url';
import pokemonRoutes from '../routes/pokemon.js';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);

// Set up views directory
app.set("view engine", "ejs");

// Serve static files

// Use routes
app.use("/", pokemonRoutes);

app.listen(PORT, () => {
    console.log(`Pokedex running at http://localhost:${PORT}`);
});