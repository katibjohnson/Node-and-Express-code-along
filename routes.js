"use strict";
const express = require("express");
const routes = express.Router();

//mobies that will power the API
const movies = [
  {
    id: 1,
    title: "movie1",
    year: 1999,
    animated: false,
  },
  {
    id: 2,
    title: "movie2",
    year: 1980,
    animated: true,
  },
  {
    id: 3,
    title: "movie3",
    year: 2014,
    animated: false,
  },
];

let nextId = 5;

// GET /movies  respond with JSON array of movies

routes.get("/movies", (req, res) => {
  res.json(movies);
});

routes.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    res.send(`No movie with id ${id} exists.`);
  }
});

routes.post("/movies", (req, res) => {
  const movie = req.body;
  movie.id = nextId++;
  movies.push(movie);
  res.status(201);
  res.json(movie);
});

// routes.put("/movies:id", (req, res) => {
//     const movie = req.body;

// })

routes.delete("/movies/:id", (req, res) => {
  console.log("ran delete");
  const id = parseInt(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    movies.splice(index, 1);
  }
  res.status(204);
  console.log("finish");
  res.send();
});

//export routes for use in server.js
module.exports = routes;
