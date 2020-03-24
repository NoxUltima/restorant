/* Review.JS
__________                 __        __________                __   
\______   \ ____   _______/  |_  ____\______   \_____    _____/  |_ 
 |       _// __ \ /  ___/\   __\/  _ \|       _/\__  \  /    \   __\
 |    |   \  ___/ \___ \  |  | (  <_> )    |   \ / __ \|   |  \  |  
 |____|_  /\___  >____  > |__|  \____/|____|_  /(____  /___|  /__|  
        \/     \/     \/                     \/      \/     \/        */

/* REVIEW PAGE */
// Gets params from URL into JS functions below
$(document).ready(function () {
})

// Get parameter name from URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Post a review
function postReview() {
    var review = new Object();

    // Get the restaurant and user ID
    review.restoID = document.getElementById("reviewRestoID").value;
    review.userID = document.getElementById("reviewUserID").value;

    // Get ratings from form using JQuery
    review.reviewFood = parseInt($('input[name=food]:checked', '#reviewForm').val(), 10);
    review.reviewService = parseInt($('input[name=service]:checked', '#reviewForm').val(), 10);
    review.reviewAmbience = parseInt($('input[name=ambience]:checked', '#reviewForm').val(), 10);
    review.reviewCost = parseInt($('input[name=cost]:checked', '#reviewForm').val(), 10);

    // Get review title and text
    review.reviewTitle = document.getElementById("reviewTitle").value;
    review.reviewText = document.getElementById("reviewText").value;

    // Read off data from the client side to be parsed into JSON content
    // String everything to JSON content upon submission
    var postReview = new XMLHttpRequest();
    postReview.open("POST", "restaurants/" + review.restoID + "/reviews", true);
    postReview.setRequestHeader("Content-Type", "application/json");
    postReview.send(JSON.stringify(review));
    window.location = "restaurants.html?restoID=" + review.restoID;
}

// Edit a review
function editReview() {
    var review = new Object();

    // Get review title and text
    review.reviewTitle = document.getElementById("editReviewTitle").value;
    review.reviewText = document.getElementById("editReviewText").value;

    // Get ratings from form using JQuery
    review.reviewFood = parseInt($('input[name=editFood]:checked', '#editReview').val(), 10);
    review.reviewService = parseInt($('input[name=editService]:checked', '#editReview').val(), 10);
    review.reviewAmbience = parseInt($('input[name=editAmbience]:checked', '#editReview').val(), 10);
    review.reviewCost = parseInt($('input[name=editCost]:checked', '#editReview').val(), 10);

    // Get the restaurant, user and review ID to be submitted
    review.restoID = document.getElementById("editRestoID").value;
    review.userID = document.getElementById("editUserID").value;
    review.reviewID = document.getElementById("editReviewID").value;

    // String everything to JSON content upon submission
    var updateReview = new XMLHttpRequest();
    updateReview.open("PUT", "restaurants/" + review.restoID + "/reviews", true);
    updateReview.setRequestHeader("Content-Type", "application/json");
    updateReview.send(JSON.stringify(review));
    window.location = "restaurants.html?restoID=" + review.restoID;
}

// Delete a review
function deleteReview() {
    var reviewID = document.getElementById("reviewDelete").value;
    var request = new XMLHttpRequest();
    request.open("DELETE", "deleteReview/" + reviewID, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
}