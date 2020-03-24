"use strict";

var db = require("../db-connection");
const Favorites = require("./Favorites");
// const Restaurant = require("./Restaurant");

class FavoritesDB {
    // Favorite a restaurant
    addToFavorites(request, respond) {
        var now = new Date();
        var sql = "INSERT INTO restorant.FAVORITES(userID, restoID, createDate) VALUES(?, ?, ?)";

        function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }

        function formatDate(date) {
            var mo = [
                "Jan", "Feb", "Mar",
                "Apr", "May", "Jun", "Jul",
                "Aug", "Sep", "Oct",
                "Nov", "Dec"
            ];

            var da = [
                "Sun", "Mon", "Tue",
                "Wed", "Thu", "Fri",
                "Sat"
            ];

            var w = date.getDay();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var h = date.getHours();
            var n = date.getMinutes();
            var s = date.getSeconds();

            return da[w] + ' ' + d + ' ' + mo[m] + ' ' + y + ' ' + h + ':' + pad(n, 2) + ':' + pad(s, 2);
        }

        var favoritesObject = new Favorites(
            null,
            request.body.userID,
            request.body.restoID,
            formatDate(now)
        );
        var values = [
            favoritesObject.getUserID(),
            favoritesObject.getRestoID(),
            favoritesObject.getCreateDate(),
            favoritesObject.getFavoritesID()
        ];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Show favorite restaurants
    getAllFavorites(request, respond) {
        var userID = request.params.userID;
        var sql =
            "SELECT restoID, restoName, cuisine, cost, estType, diningOption, CONCAT(openingTime,' to ',closingTime) AS openingTime, CONCAT(restoAddress,', ',country,' ',postalCode) AS restoAddress, branch, thumb, numReviews, avgRating FROM restorant.RESTAURANT WHERE restoID IN (SELECT restoID FROM restorant.FAVORITES WHERE userID = ?)";

        db.query(sql, userID, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Unfavorite a restaurant
    deleteFromFavorites(request, respond) {
        var restoID = request.params.restoID;
        var sql = "DELETE FROM restorant.FAVORITES WHERE (restoID = ?)";

        db.query(sql, restoID, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }
}

module.exports = FavoritesDB;