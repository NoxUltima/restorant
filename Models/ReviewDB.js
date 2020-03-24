"use strict";

var db = require("../db-connection");
const Review = require("./Review");
const User = require("./User");
const Restaurant = require("./Restaurant");

// TODO: Update restaurant review statistics (call function UpdateStats) each time a review is posted or updated.
// Note: SQL statement may be the error. Check out on the

class ReviewDB {
    getAllReviews(request, respond) {
        updateStats(function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });

        var restoID = request.params.restoID;
        var sql =
            "SELECT REVIEW.reviewID, REVIEW.reviewTitle, REVIEW.reviewRating, REVIEW.reviewFood, REVIEW.reviewService, REVIEW.reviewAmbience, REVIEW.reviewCost, REVIEW.reviewText, REVIEW.reviewPicture1, REVIEW.reviewPicture2, REVIEW.reviewPicture3, REVIEW.reviewCreate, REVIEW.reviewUpdate, REVIEW.userID, USER.username, USER.profile FROM restorant.REVIEW INNER JOIN restorant.USER ON REVIEW.userID = USER.userID WHERE REVIEW.restoID = ? ORDER BY REVIEW.reviewID DESC";

        db.query(sql, restoID, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Display all reviews posted by a user
    getAllUserReviews(request, respond) {
        updateStats(function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });

        var userID = request.params.userID;
        var sql =
            "SELECT REVIEW.reviewID, REVIEW.reviewTitle, REVIEW.reviewRating, REVIEW.reviewFood, REVIEW.reviewService, REVIEW.reviewAmbience, REVIEW.reviewCost, REVIEW.reviewText, REVIEW.reviewPicture1, REVIEW.reviewPicture2, REVIEW.reviewPicture3, REVIEW.reviewCreate, REVIEW.reviewUpdate, REVIEW.restoID, RESTAURANT.restoName FROM restorant.REVIEW INNER JOIN restorant.RESTAURANT ON REVIEW.restoID = RESTAURANT.restoID WHERE REVIEW.userID = ? ORDER BY REVIEW.reviewID DESC";

        db.query(sql, userID, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Post a review
    postReview(request, respond) {
        updateStats(function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });

        var now = new Date();
        var sql =
            "INSERT INTO restorant.REVIEW(reviewTitle, reviewRating, reviewFood, reviewService, reviewAmbience, reviewCost, reviewText, reviewPicture1, reviewPicture2, reviewPicture3, reviewCreate, reviewUpdate, userID, restoID) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        // Generates a new set of URLs for the review images.
        var now = new Date();
        var url = "..public/images/reviews/";
        var restoID = request.body.restoID;
        var userID = request.body.userID;
        var date = "";
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDay();
        var h = now.getHours();
        var n = now.getMinutes();
        var s = now.getSeconds();
        var updateID = date.concat(y, "-", m, "-", d, "_", h, ".", n, ".", s);
        var pic1 = url.concat(restoID, "/", userID, "/pic1_", updateID, ".jpg");
        var pic2 = url.concat(restoID, "/", userID, "/pic2_", updateID, ".jpg");
        var pic3 = url.concat(restoID, "/", userID, "/pic3_", updateID, ".jpg");

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

        // Calculates the average rating from the four aspects.
        var food = request.body.reviewFood;
        var service = request.body.reviewService;
        var ambience = request.body.reviewAmbience;
        var cost = request.body.reviewCost;
        var rating = ((food + service + ambience + cost) / 4).toFixed(1);

        var reviewObject = new Review(
            null,
            request.body.reviewTitle,
            rating,
            food,
            service,
            ambience,
            cost,
            request.body.reviewText,
            pic1,
            pic2,
            pic3,
            formatDate(now),
            formatDate(now),
            userID,
            restoID
        );
        var values = [
            reviewObject.getReviewTitle(),
            reviewObject.getReviewRating(),
            reviewObject.getReviewFood(),
            reviewObject.getReviewService(),
            reviewObject.getReviewAmbience(),
            reviewObject.getReviewCost(),
            reviewObject.getReviewText(),
            reviewObject.getReviewPicture1(),
            reviewObject.getReviewPicture2(),
            reviewObject.getReviewPicture3(),
            reviewObject.getReviewCreate(),
            reviewObject.getReviewUpdate(),
            reviewObject.getUserID(),
            reviewObject.getRestoID(),
            reviewObject.getReviewID()
        ];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Edit an existing review
    editReview(request, respond) {
        updateStats(function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });

        var sql =
            "UPDATE restorant.REVIEW SET reviewTitle = ?, reviewRating = ?, reviewFood = ?, reviewService = ?, reviewAmbience = ?, reviewCost = ?, reviewText = ?, reviewPicture1 = ?, reviewPicture2 = ?, reviewPicture3 = ?, reviewUpdate = ? WHERE reviewID = ?";

        // Generates a new set of URLs for the review images.
        var now = new Date();
        var url = "..public/images/reviews/";
        var restoID = request.body.restoID;
        var userID = request.body.userID;
        var date = "";
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDay();
        var h = now.getHours();
        var n = now.getMinutes();
        var s = now.getSeconds();
        var updateID = date.concat(y, "-", m, "-", d, "_", h, ".", n, ".", s);
        var pic1 = url.concat(restoID, "/", userID, "/pic1_", updateID, ".jpg");
        var pic2 = url.concat(restoID, "/", userID, "/pic2_", updateID, ".jpg");
        var pic3 = url.concat(restoID, "/", userID, "/pic3_", updateID, ".jpg");

        // Calculates the average rating from the four aspects.
        var food = request.body.reviewFood;
        var service = request.body.reviewService;
        var ambience = request.body.reviewAmbience;
        var cost = request.body.reviewCost;
        var rating = ((food + service + ambience + cost) / 4).toFixed(1);

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

        var reviewObject = new Review(
            request.body.reviewID,
            request.body.reviewTitle,
            rating,
            food,
            service,
            ambience,
            cost,
            request.body.reviewText,
            pic1,
            pic2,
            pic3,
            formatDate(now),
            formatDate(now),
            userID,
            request.body.restoID
        );
        var values = [
            reviewObject.getReviewTitle(),
            reviewObject.getReviewRating(),
            reviewObject.getReviewFood(),
            reviewObject.getReviewService(),
            reviewObject.getReviewAmbience(),
            reviewObject.getReviewCost(),
            reviewObject.getReviewText(),
            reviewObject.getReviewPicture1(),
            reviewObject.getReviewPicture2(),
            reviewObject.getReviewPicture3(),
            reviewObject.getReviewUpdate(),
            reviewObject.getReviewID()
        ];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Delete an existing review
    deleteReview(request, respond) {
        updateStats(function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });

        var reviewID = request.params.reviewID;
        var sql = "DELETE FROM restorant.REVIEW where reviewID = ?";
        db.query(sql, reviewID, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }
}

function updateStats() {
    var sql = "UPDATE restorant.RESTAURANT m INNER JOIN (SELECT restoID, COUNT(reviewRating) AS rating1 FROM restorant.REVIEW r WHERE ROUND(reviewRating, 0) = 1 GROUP BY restoID) r ON m.restoID = r.restoID SET m.rating1 = r.rating1; \
    UPDATE restorant.RESTAURANT m INNER JOIN (SELECT restoID, COUNT(reviewRating) AS rating2 FROM restorant.REVIEW r WHERE ROUND(reviewRating, 0) = 2 GROUP BY restoID) r ON m.restoID = r.restoID SET m.rating2 = r.rating2; \
    UPDATE restorant.RESTAURANT m INNER JOIN (SELECT restoID, COUNT(reviewRating) AS rating3 FROM restorant.REVIEW r WHERE ROUND(reviewRating, 0) = 3 GROUP BY restoID) r ON m.restoID = r.restoID SET m.rating3 = r.rating3; \
    UPDATE restorant.RESTAURANT m INNER JOIN (SELECT restoID, COUNT(reviewRating) AS rating4 FROM restorant.REVIEW r WHERE ROUND(reviewRating, 0) = 4 GROUP BY restoID) r ON m.restoID = r.restoID SET m.rating4 = r.rating4; \
    UPDATE restorant.RESTAURANT m INNER JOIN (SELECT restoID, COUNT(reviewRating) AS rating5 FROM restorant.REVIEW r WHERE ROUND(reviewRating, 0) = 5 GROUP BY restoID) r ON m.restoID = r.restoID SET m.rating5 = r.rating5; \
    UPDATE restorant.RESTAURANT m INNER JOIN (SELECT restoID, COUNT(reviewID) AS numReviews FROM restorant.REVIEW r GROUP BY restoID) r on m.restoID = r.restoID SET m.numReviews = r.numReviews; \
    UPDATE restorant.RESTAURANT m INNER JOIN (SELECT restoID, TRUNCATE(AVG(reviewRating), 1) AS avgRating FROM restorant.REVIEW r GROUP BY restoID) r ON m.restoID = r.restoID SET m.avgRating = r.avgRating";

    db.query(sql);
}

module.exports = ReviewDB;