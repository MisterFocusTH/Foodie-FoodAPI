/*jshint esversion: 8 */

const express = require("express");
const router = express.Router();

const restaurants = require("../data");
let currentRestaurantsId = 10;

router.get("/", (req, res) => {
    res.json(restaurants);
});

router.get("/:id", (req, res) => {
    const restaurantId = Number.parseInt(req.params.id, 10);
    const restaurant = restaurants.find((restaurant) => restaurant.id === restaurantId);
    res.json(restaurant);
});

router.post("/", (req, res) => {
    currentRestaurantsId += 1;
    const newRestaurants = {
        id: currentRestaurantsId,
        ...req.body
    };
    restaurants.push(newRestaurants);
    res.json(newRestaurants);
});

router.put("/:id", (req, res) => {
    const restaurantId = Number.parseInt(req.params.id, 10);
    const restaurantIndex = restaurants.findIndex((restaurant) => restaurant.id === restaurantId);
    const updatedRestaurants = {
        id: restaurantId,
        ...req.body
    };
    restaurants[restaurantIndex] = updatedRestaurants;
    res.json(updatedRestaurants);
});

router.delete("/:id", (req, res) => {
    const restaurantId = Number.parseInt(req.params.id, 10);
    const restaurantIndex = restaurants.findIndex((restaurant) => restaurant.id === restaurantId);
    restaurants.splice(restaurantIndex, 1);
    res.sendStatus(204);
});

module.exports = router;