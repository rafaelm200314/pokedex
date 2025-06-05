// filepath: /Applications/XAMPP/xamppfiles/htdocs/pokedex/routes/pokemon.js
import express from 'express';
import axios from 'axios';
import env from 'dotenv';



env.config();
const router = express.Router();
const API_URL = process.env.API_URL;




// Home route - display list of Pokemon
router.get("/", async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.render(`pages/home`, {pokemonList: response.data.results,});   
    } catch (error) {
        res.status(500).send("Error fetching pokemon data");
    }
})

router.get("/pokemon/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        console.table(response.data.stats);
        res.render(`pages/details`, {pokemon: response.data});
    } catch (error) {
        res.status(500).send("Error fetching pokemon data");
    }
})

// Search route - find Pokemon by name
router.get("/search", async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.redirect("/"); // Redirect to home if no search query
        }
        
        // First get the full list (limited to what's in the API_URL)
        const listResponse = await axios.get(API_URL);
        const allPokemon = listResponse.data.results;
        
        // Filter Pokemon by name (case-insensitive)
        const filteredPokemon = allPokemon.filter(pokemon => 
            pokemon.name.toLowerCase().includes(name.toLowerCase())
        );
        
        res.render("pages/home", {
            pokemonList: filteredPokemon,
            searchQuery: name
        });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).send("Error searching for pokemon");
    }
});

export default router;