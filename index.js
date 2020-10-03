/*jshint esversion: 8 */

const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");

const restaurantsRouter = require("./routes/restaurants");
const indexRouter = require("./routes");

const logger = require("./middleware/logger");

const app = express();

// Template Engines
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded( { extended: false } ));

// Custom Middleware
app.use(logger);

// Routes - Restaurants
app.use("/apis/restaurants", restaurantsRouter);
app.use("/", indexRouter);

app.listen(3000, () => {
    console.log("Server Are Now Started On Port : 3000");
});