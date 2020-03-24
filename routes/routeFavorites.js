"use strict";

const FavoritesDB = require("../Models/FavoritesDB");

var FavoritesDBObject = new FavoritesDB();

function routeFavorites(app) {
    app
        .route("/favorites/:userID/")
        .post(FavoritesDBObject.addToFavorites)
        .get(FavoritesDBObject.getAllFavorites);
    app
        .route("/favorites/:restoID/")
        .delete(FavoritesDBObject.deleteFromFavorites);
}

module.exports = { routeFavorites };