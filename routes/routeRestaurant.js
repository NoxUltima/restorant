"use strict";

const RestaurantDB = require("../Models/RestaurantDB");

var RestaurantDBObject = new RestaurantDB();

function routeRestaurant(app) {
    app.route("/search").get(RestaurantDBObject.search);
    app.route("/allRestaurants").get(RestaurantDBObject.getAllRestaurants);
    app
        .route("/restaurants/:restoID/")
        .get(RestaurantDBObject.getRestoInfo)
        .put(RestaurantDBObject.updateRestaurant);
    app.route("/addRestaurant/").post(RestaurantDBObject.addRestaurant);
    app
        .route("/restaurants/:restoID/delete/")
        .delete(RestaurantDBObject.deleteRestaurant);
}

module.exports = { routeRestaurant };