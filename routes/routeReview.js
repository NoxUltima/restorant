"use strict";

const ReviewDB = require("../Models/ReviewDB");

var ReviewDBObject = new ReviewDB();

function routeReview(app) {
    app
        .route("/user/:userID/reviews/")
        .get(ReviewDBObject.getAllUserReviews)
    app
        .route("/restaurants/:restoID/reviews/")
        .get(ReviewDBObject.getAllReviews)
        .post(ReviewDBObject.postReview)
        .put(ReviewDBObject.editReview);
    app.route("/deleteReview/:reviewID").delete(ReviewDBObject.deleteReview);
}

module.exports = { routeReview };