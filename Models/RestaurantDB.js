"use strict";

var db = require("../db-connection");
const Restaurant = require("./Restaurant");

// TODO: Implementing a versatile search and filter query, editing the SQL statement search() on the fly
// (added in the todo folder)

class RestaurantDB {
    // Search for a restaurant
    search(request, respond) {
        var query = request.query.query;
        var cuisine = request.query.cuisine;
        var estType = request.query.estType;
        var location = request.query.location;
        var dining = request.query.dining;
        var cost = request.query.cost;
        var rating = request.query.rating;
        var sortBy = request.query.sortBy;

        var sortSQL = "";
        // Convert sort queries to SQL statements using chained if statements
        if (sortBy == "asc_name") {
            sortSQL = "ORDER BY restoName ASC";
        } else if (sortBy == "desc_name") {
            sortSQL = "ORDER BY restoName DESC";
        } else if (sortBy == "asc_cost") {
            sortSQL = "ORDER BY cost ASC";
        } else if (sortBy == "desc_cost") {
            sortSQL = "ORDER BY cost DESC";
        } else if (sortBy == "asc_cuisine") {
            sortSQL = "ORDER BY cuisine ASC";
        } else if (sortBy == "desc_cuisine") {
            sortSQL = "ORDER BY cuisine DESC";
        } else if (sortBy == "asc_branch") {
            sortSQL = "ORDER BY branch ASC";
        } else if (sortBy == "desc_branch") {
            sortSQL = "ORDER BY branch DESC";
        } else if (sortBy == "asc_estType") {
            sortSQL = "ORDER BY estType ASC";
        } else if (sortBy == "desc_estType") {
            sortSQL = "ORDER BY estType DESC";
        } else if (sortBy == "asc_avgRating") {
            sortSQL = "ORDER BY avgRating ASC";
        } else if (sortBy == "desc_avgRating") {
            sortSQL = "ORDER BY avgRating DESC";
        } else if (sortBy == "asc_numReviews") {
            sortSQL = "ORDER BY numReviews ASC";
        } else if (sortBy == "desc_numReviews") {
            sortSQL = "ORDER BY numReviews DESC";
        } else {
            sortSQL = "ORDER BY restoID ASC";
        }

        // This SQL statement left incomplete to accomodate query values
        var sql = "SELECT restoID, restoName, cuisine, cost, estType, diningOption, CONCAT(openingTime, ' to ', closingTime) AS openingTime, CONCAT(restoAddress, ', ', country, ' ', postalCode) AS restoAddress, branch, thumb, numReviews, avgRating FROM restorant.RESTAURANT WHERE(";

        // Checks whether each value is not null and empty
        if (query != null && query != "") {
            sql += "restoName LIKE '%" + query + "%' OR restoAddress LIKE '%" + query + "%'";
        }
        if (cuisine != null && cuisine != "") {
            sql += " AND cuisine LIKE '%" + cuisine + "%'";
        }
        if (estType != null && estType != "") {
            sql += " AND estType LIKE '%" + estType + "%'";
        }
        if (location != null && location != "") {
            sql += " AND branch LIKE '%" + location + "%'";
        }
        if (dining != null && dining != "") {
            sql += " AND diningOption LIKE '%" + dining + "%'";
        }
        if (cost != null && cost != "") {
            sql += " AND cost LIKE '%" + cost + "%'";
        }
        if (rating != null && rating != "") {
            sql += " AND CEILING(avgRating) = " + rating;
        }
        // Add sort query at the end
        sql += ") ";
        // Remove first AND so to not produce errors
        var sql2 = sql.replace("WHERE( AND ", "WHERE(");

        var sql3 = "SELECT restoID, restoName, cuisine, cost, estType, diningOption, CONCAT(openingTime, ' to ', closingTime) AS openingTime, CONCAT(restoAddress, ', ', country, ' ', postalCode) AS restoAddress, branch, thumb, numReviews, avgRating FROM restorant.RESTAURANT WHERE(";

        // Exception handling for even more coolness
        if ((sortBy != null && sortBy != "") && (query == "" && cuisine == "" && estType == "" && location == "" && dining == "" && cost == "" && rating == "")) {
            sql2 = "SELECT restoID, restoName, cuisine, cost, estType, diningOption, CONCAT(openingTime, ' to ', closingTime) AS openingTime, CONCAT(restoAddress, ', ', country, ' ', postalCode) AS restoAddress, branch, thumb, numReviews, avgRating FROM restorant.RESTAURANT " + sortSQL;
        } else if (sortBy != null && sortBy != "") {
            if (query != null && query != "") {
                sql3 += "restoName LIKE '%" + query + "%' OR restoAddress LIKE '%" + query + "%'";
            }
            if (cuisine != null && cuisine != "") {
                sql3 += " AND cuisine LIKE '%" + cuisine + "%'";
            }
            if (estType != null && estType != "") {
                sql3 += " AND estType LIKE '%" + estType + "%'";
            }
            if (location != null && location != "") {
                sql3 += " AND branch LIKE '%" + location + "%'";
            }
            if (dining != null && dining != "") {
                sql3 += " AND diningOption LIKE '%" + dining + "%'";
            }
            if (cost != null && cost != "") {
                sql3 += " AND cost LIKE '%" + cost + "%'";
            }
            if (rating != null && rating != "") {
                sql3 += " AND CEILING(avgRating) = " + rating;
            }
            sql3 += ") ";
            sql2 = sql3.replace("WHERE( AND ", "WHERE(") + sortSQL;
        } else if (query == "" && cuisine == "" && estType == "" && location == "" && dining == "" && cost == "" && rating == "") {
            sql2 = "SELECT restoID, restoName, cuisine, cost, estType, diningOption, CONCAT(openingTime, ' to ', closingTime) AS openingTime, CONCAT(restoAddress, ', ', country, ' ', postalCode) AS restoAddress, branch, thumb, numReviews, avgRating FROM restorant.RESTAURANT";
        } else if (sql2 == "SELECT restoID, restoName, cuisine, cost, estType, diningOption, CONCAT(openingTime, ' to ', closingTime) AS openingTime, CONCAT(restoAddress, ', ', country, ' ', postalCode) AS restoAddress, branch, thumb, numReviews, avgRating FROM restorant.RESTAURANT WHERE() ORDER BY restoID ASC") { // Note this SQL statement will crash the database as WHERE is blank
            sql2 = "SELECT restoID, restoName, cuisine, cost, estType, diningOption, CONCAT(openingTime, ' to ', closingTime) AS openingTime, CONCAT(restoAddress, ', ', country, ' ', postalCode) AS restoAddress, branch, thumb, numReviews, avgRating FROM restorant.RESTAURANT" // so I did this by default
        }

        db.query(sql2, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Get all restaurants
    getAllRestaurants(request, respond) {
        var sql =
            "SELECT restoID, restoName, cuisine, cost, estType, diningOption, CONCAT(openingTime,' to ',closingTime) AS openingTime, CONCAT(restoAddress,', ',country,' ',postalCode) AS restoAddress, branch, thumb, numReviews, avgRating FROM restorant.RESTAURANT";

        db.query(sql, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Get all restaurant information
    getRestoInfo(request, respond) {
        var restoID = request.params.restoID;
        var sql = "SELECT * FROM restorant.RESTAURANT WHERE restoID = ?";

        db.query(sql, restoID, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Add a restaurant to database
    addRestaurant(request, respond) {
        var sql =
            "INSERT INTO restorant.RESTAURANT(restoName, cuisine, cost, openingTime, closingTime, estType, diningOption, restoAddress, postalCode, branch, city, country, thumb, picture1, picture2, picture3, video, website, orderLink, phoneNo, gMap, rating1, rating2, rating3, rating4, rating5, numReviews, avgRating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, 0, 0, 0, 0)";

        // Generates a new set of URLs for the restaurant images.
        var restoID = request.body.restoID;
        var url = "..public/images/restaurants/";
        var thumb = url.concat(restoID, "/thumb.jpg");
        var pic1 = url.concat(restoID, "/pic1.jpg");
        var pic2 = url.concat(restoID, "/pic2.jpg");
        var pic3 = url.concat(restoID, "/pic3.jpg");

        var restaurantObject = new Restaurant(
            request.params.restoID,
            request.body.restoName,
            request.body.cuisine,
            request.body.cost,
            request.body.openingTime,
            request.body.closingTime,
            request.body.estType,
            request.body.diningOption,
            request.body.restoAddress,
            request.body.postalCode,
            request.body.branch,
            request.body.city,
            request.body.country,
            request.body.video,
            thumb,
            pic1,
            pic2,
            pic3,
            request.body.website,
            request.body.orderLink,
            request.body.phoneNo,
            request.body.gMap,
            request.body.rating1,
            request.body.rating2,
            request.body.rating3,
            request.body.rating4,
            request.body.rating5,
            request.body.numReviews,
            request.body.avgRating
        );
        var values = [
            restaurantObject.getRestoName(),
            restaurantObject.getCuisine(),
            restaurantObject.getCost(),
            restaurantObject.getOpeningTime(),
            restaurantObject.getClosingTime(),
            restaurantObject.getEstType(),
            restaurantObject.getDiningOption(),
            restaurantObject.getRestoAddress(),
            restaurantObject.getPostalCode(),
            restaurantObject.getBranch(),
            restaurantObject.getCity(),
            restaurantObject.getCountry(),
            restaurantObject.getThumb(),
            restaurantObject.getPicture1(),
            restaurantObject.getPicture2(),
            restaurantObject.getPicture3(),
            restaurantObject.getVideo(),
            restaurantObject.getWebsite(),
            restaurantObject.getOrderLink(),
            restaurantObject.getPhoneNo(),
            restaurantObject.getGMap()
        ];

        console.log(values);

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Update restaurant information
    updateRestaurant(request, respond) {
        var sql =
            "UPDATE restorant.RESTAURANT SET restoName = ?, cuisine = ?, cost = ?, openingTime = ?, closingTime = ?, estType = ?, diningOption = ?, restoAddress = ?, postalCode = ?, branch = ?, city = ?, country = ?, video = ?, website = ?, orderLink = ?, phoneNo = ?, gMap = ? WHERE restoID = ?";

        var restaurantObject = new Restaurant(
            request.params.restoID,
            request.body.restoName,
            request.body.cuisine,
            request.body.cost,
            request.body.openingTime,
            request.body.closingTime,
            request.body.estType,
            request.body.diningOption,
            request.body.restoAddress,
            request.body.postalCode,
            request.body.branch,
            request.body.city,
            request.body.country,
            request.body.thumb,
            request.body.picture1,
            request.body.picture2,
            request.body.picture3,
            request.body.video,
            request.body.website,
            request.body.orderLink,
            request.body.phoneNo,
            request.body.gMap,
            request.body.rating1,
            request.body.rating2,
            request.body.rating3,
            request.body.rating4,
            request.body.rating5,
            request.body.numReviews,
            request.body.avgRating
        );
        var values = [
            restaurantObject.getRestoName(),
            restaurantObject.getCuisine(),
            restaurantObject.getCost(),
            restaurantObject.getOpeningTime(),
            restaurantObject.getClosingTime(),
            restaurantObject.getEstType(),
            restaurantObject.getDiningOption(),
            restaurantObject.getRestoAddress(),
            restaurantObject.getPostalCode(),
            restaurantObject.getBranch(),
            restaurantObject.getCity(),
            restaurantObject.getCountry(),
            restaurantObject.getVideo(),
            restaurantObject.getWebsite(),
            restaurantObject.getOrderLink(),
            restaurantObject.getPhoneNo(),
            restaurantObject.getGMap(),
            restaurantObject.getRestoID()
        ];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Delete a restaurant from database
    deleteRestaurant(request, respond) {
        var restoID = request.params.restoID;
        var sql = "DELETE FROM restorant.RESTAURANT WHERE restoID = ?";

        db.query(sql, restoID, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }
}

module.exports = RestaurantDB;