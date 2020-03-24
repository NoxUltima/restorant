"use strict";

class Review {
    constructor(
        reviewID,
        reviewTitle,
        reviewRating,
        reviewFood,
        reviewService,
        reviewAmbience,
        reviewCost,
        reviewText,
        reviewPicture1,
        reviewPicture2,
        reviewPicture3,
        reviewCreate,
        reviewUpdate,
        userID,
        restoID
    ) {
        this.reviewID = reviewID;
        this.reviewTitle = reviewTitle;
        this.reviewRating = reviewRating;
        this.reviewFood = reviewFood;
        this.reviewService = reviewService;
        this.reviewAmbience = reviewAmbience;
        this.reviewCost = reviewCost;
        this.reviewText = reviewText;
        this.reviewPicture1 = reviewPicture1;
        this.reviewPicture2 = reviewPicture2;
        this.reviewPicture3 = reviewPicture3;
        this.reviewCreate = reviewCreate;
        this.reviewUpdate = reviewUpdate;
        this.userID = userID;
        this.restoID = restoID;
    }

    // GET
    getReviewID() {
        return this.reviewID;
    }
    getReviewTitle() {
        return this.reviewTitle;
    }
    getReviewRating() {
        return this.reviewRating;
    }
    getReviewFood() {
        return this.reviewFood;
    }
    getReviewService() {
        return this.reviewService;
    }
    getReviewAmbience() {
        return this.reviewAmbience;
    }
    getReviewCost() {
        return this.reviewCost;
    }
    getReviewText() {
        return this.reviewText;
    }
    getReviewPicture1() {
        return this.reviewPicture1;
    }
    getReviewPicture2() {
        return this.reviewPicture2;
    }
    getReviewPicture3() {
        return this.reviewPicture3;
    }
    getReviewCreate() {
        return this.reviewCreate;
    }
    getReviewUpdate() {
        return this.reviewUpdate;
    }
    getUserID() {
        return this.userID;
    }
    getRestoID() {
        return this.restoID;
    }

    // SET
    setReviewID() {
        this.reviewID = reviewID;
    }
    setReviewTitle() {
        this.reviewTitle = reviewTitle;
    }
    setReviewRating() {
        this.reviewRating = reviewRating;
    }
    setReviewFood() {
        this.reviewFood = reviewFood;
    }
    setReviewService() {
        this.reviewService = reviewService;
    }
    setReviewAmbience() {
        this.reviewAmbience = reviewAmbience;
    }
    setReviewCost() {
        this.reviewCost = reviewCost;
    }
    setReviewText() {
        this.reviewText = reviewText;
    }
    setReviewPicture1() {
        this.reviewPicture1 = reviewPicture1;
    }
    setReviewPicture2() {
        this.reviewPicture2 = reviewPicture2;
    }
    setReviewPicture3() {
        this.reviewPicture3 = reviewPicture3;
    }
    setReviewCreate() {
        this.reviewCreate = reviewCreate;
    }
    setReviewUpdate() {
        this.reviewUpdate = reviewUpdate;
    }
    setUserID() {
        this.userID = userID;
    }
    setRestoID() {
        this.restoID = restoID;
    }
}

module.exports = Review;