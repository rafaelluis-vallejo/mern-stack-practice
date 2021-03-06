"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pokemon_species_model_1 = __importDefault(require("../models/pokemon-species.model"));
const pokemonSpeciesRouter = express_1.Router();
pokemonSpeciesRouter.get('/', (req, res) => {
    pokemon_species_model_1.default.find()
        .then((species) => res.json(species))
        .catch((err) => res.status(400).json('Error: ' + err));
});
pokemonSpeciesRouter.post('/add', (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const level = req.body.level;
    const type = req.body.type;
    const date = req.body.date;
    const newPokemonSpecies = new pokemon_species_model_1.default({
        username,
        description,
        level,
        type,
        date
    });
    newPokemonSpecies.save()
        .then(() => res.json('Pokemon added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
});
pokemonSpeciesRouter.get('/:id', (req, res) => {
    pokemon_species_model_1.default.findById(req.params.id)
        .then(species => res.json(species))
        .catch(err => res.status(400).json('Error: ' + err));
});
pokemonSpeciesRouter.delete('/:id', (req, res) => {
    pokemon_species_model_1.default.findByIdAndDelete(req.params.id)
        .then(() => res.json('Pokemon deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
pokemonSpeciesRouter.post('/update/:id', (req, res) => {
    pokemon_species_model_1.default.findById(req.params.id)
        .then((species) => {
        species.username = req.body.username;
        species.description = req.body.description;
        species.level = req.body.type;
        species.type = req.body.type;
        species.date = req.body.date;
        species.save()
            .then(() => res.json('Pokemon updated!'))
            .catch((err) => res.status(400).json('Error: ' + err));
    })
        .catch(err => res.status(400).json('Error: ' + err));
});
exports.default = pokemonSpeciesRouter;
