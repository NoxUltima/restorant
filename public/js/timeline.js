/* Timeline.JS
__________                 __        __________                __   
\______   \ ____   _______/  |_  ____\______   \_____    _____/  |_ 
 |       _// __ \ /  ___/\   __\/  _ \|       _/\__  \  /    \   __\
 |    |   \  ___/ \___ \  |  | (  <_> )    |   \ / __ \|   |  \  |  
 |____|_  /\___  >____  > |__|  \____/|____|_  /(____  /___|  /__|  
        \/     \/     \/                     \/      \/     \/        */

/* TIMELINE PAGE */
// Gets params from URL into JS functions below
$(document).ready(function () {
    var userID = getParameterByName('userID');
    getUserInfo(userID);
    getFavoriteRestaurants(userID);
    getUserReviews(userID);
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

/* TIMELINE PAGE */
// Gets account info from database
function getUserInfo(userID) {
    var request = new XMLHttpRequest();
    request.open('GET', "timeline/" + userID, true);

    request.onload = function () {
        userArray = JSON.parse(request.responseText);
        displayUserInfo(userArray);
    };
    request.send();
}

// Displays user info on the Info tab
function displayUserInfo(userArray) {
    // Username
    document.getElementById("username").textContent = userArray[0].username;
    // Full Name
    document.getElementById("fullName").textContent = userArray[0].firstName + " " + userArray[0].lastName;
    // Age
    document.getElementById("age").textContent = userArray[0].age;
    // Gender
    document.getElementById("gender").textContent = userArray[0].gender;
    // City and Country
    document.getElementById("countryState").textContent = userArray[0].city + ", " + userArray[0].country;
    // Address
    document.getElementById("address").textContent = userArray[0].userAddress;
    // Mobile
    document.getElementById("mobile").textContent = userArray[0].mobile;
    // Email
    document.getElementById("email").textContent = userArray[0].email;
    // Profile Picture
    document.getElementById("profile").src = userArray[0].profile;
}

// Get and display all favorite restaurants from database
function getFavoriteRestaurants(userID) {
    var request = new XMLHttpRequest();
    request.open('GET', "favorites/" + userID, true);

    request.onload = function () {
        restaurantArray = JSON.parse(request.responseText);
        displayFavorites(restaurantArray);
    };
    request.send();
}

// Display all favorite restaurants
function displayFavorites(restaurantArray) {
    var table = document.getElementById("favorites");
    table.innerHTML = "";
    total = restaurantArray.length;

    for (var count = 0; count < total; count++) {
        var restoID = restaurantArray[count].restoID;
        var restoName = restaurantArray[count].restoName;
        var cost = restaurantArray[count].cost;
        var thumb = restaurantArray[count].thumb;
        var cuisine = restaurantArray[count].cuisine;
        var estType = restaurantArray[count].estType;
        var diningOption = restaurantArray[count].diningOption;
        var openingTime = restaurantArray[count].openingTime;
        var address = restaurantArray[count].restoAddress;
        var branch = restaurantArray[count].branch;
        var numReviews = restaurantArray[count].numReviews;
        var avgRating = restaurantArray[count].avgRating;

        // HTML restaurant cards
        var cell = '<div class="col-md-6 col-lg-4 filtr-item">\
        <div class="card border-dark">\
            <div class="card-header bg-dark text-light">\
                <h5 class="m-0">' + restoName + '<br></h5>\
            </div><img class="img-fluid card-img w-100 d-block rounded-0" src="' + thumb + '">\
            <div class="card-body">\
                <p class="card-text">Cuisine: <strong>' + cuisine + '</strong></p>\
                <p class="card-text">Establishment Type: <strong>' + estType + '</strong><br></p>\
                <p class="card-text">Cost: <strong>' + cost + '</strong><br></p>\
                <p class="card-text">Dining: <strong>' + diningOption + '</strong><br></p>\
                <p class="card-text">Opening Time: <strong>' + openingTime + '</strong><br></p>\
                <p class="card-text">Address: <strong>' + address + '</strong><br></p>\
                <p class="card-text">Branch: <strong>' + branch + '</strong><br></p>\
                <p class="card-text">Average Rating: <strong>' + avgRating + '</strong><br></p>\
                <p class="card-text">Total Reviews: <strong>' + numReviews + '</strong><br></p>\
            </div>\
            <div class="d-flex card-footer"><a class="btn btn-dark btn-sm" href="restaurants.html?restoID=' +
            restoID + '" style="color: white !important" type="button">\
                        <i class="fa fa-eye"></i>\
                        View</a></button><button class="btn btn-outline-dark btn-sm ml-auto" type="button"\
                    onclick="unfavoriteRestaurant(' + restoID + ')"><i class="fa fa-minus"></i> \
                    Remove from Favorites</button>\
                    </div>\
        </div>\
    </div>';

        table.insertAdjacentHTML('beforeend', cell);
    }
}

// Get all reviews posted by a user
function getUserReviews(userID) {
    var request = new XMLHttpRequest();
    request.open('GET', "user/" + userID + "/reviews", true);

    request.onload = function () {
        reviewArray = JSON.parse(request.responseText);
        showAllUserReviews(reviewArray);
    };
    request.send();
}

// Show all reviews posted by a user
function showAllUserReviews(reviewArray) {
    var table = document.getElementById("userReviews");
    table.innerHTML = "";
    total = reviewArray.length;

    for (var count = 0; count < total; count++) {
        // Gets review data from database
        var reviewID = reviewArray[count].reviewID;
        var reviewTitle = reviewArray[count].reviewTitle;
        var reviewRating = reviewArray[count].reviewRating;
        var reviewFood = reviewArray[count].reviewFood;
        var reviewService = reviewArray[count].reviewService;
        var reviewAmbience = reviewArray[count].reviewAmbience;
        var reviewCost = reviewArray[count].reviewCost;
        var reviewText = reviewArray[count].reviewText;
        var reviewCreate = reviewArray[count].reviewCreate;
        var reviewUpdate = reviewArray[count].reviewUpdate;
        var restoName = reviewArray[count].restoName;

        var food = reviewFood * 20;
        var service = reviewService * 20;
        var ambience = reviewAmbience * 20;
        var cost = reviewCost * 20;

        var html = '<div class="card">\
            <div class="card-body">\
                <div class="row">\
                    <div class="col-md-3">\
                    <h4 class="text-center">' + restoName + '</h4>\
                        <p class="text-secondary text-center">' + reviewCreate + '</p>\
                        <p class="text-secondary text-center">' + reviewUpdate + '</p>\
                        <p class="text-secondary text-center">#' + reviewID + '</p>\
                    </div>\
                    <div class="col-md-9">\
                        <div class="clearfix"></div>\
                        <h3>' + reviewTitle + '</h3>\
                        <p>' + reviewText + '</p>\
                        <p>\
                        <h4 class="float-right">' + reviewRating + ' <i class="fa fa-star"></i></h4>\
                        </p>\
                        <h5>Ratings</h5>\
                        <div class="col-md-10">\
                            <span style="font-weight: bold">Food<div class="progress">\
                                    <div class="progress-bar bg-warning float-right text-center" role="progressbar"\
                                        style="width: ' + food + '%" aria-valuenow="' + reviewFood + '" aria-valuemin="0" aria-valuemax="5">' + reviewFood + '\
                                    </div>\
                                </div></span>\
                            <span style="font-weight: bold">Service<div class="progress">\
                                    <div class="progress-bar text-center" role="progressbar" style="width: ' + service + '%"\
                                        aria-valuenow="' + reviewService + '" aria-valuemin="0" aria-valuemax="5">' + reviewService + '</div>\
                                </div></span>\
                            <span style="font-weight: bold">Ambience<div class="progress">\
                                    <div class="progress-bar bg-danger text-center" role="progressbar"\
                                        style="width: ' + ambience + '%" aria-valuenow="' + reviewAmbience + '" aria-valuemin="0" aria-valuemax="5">' + reviewAmbience + '\
                                    </div>\
                                </div></span>\
                            <span style="font-weight: bold">Cost<div class="progress">\
                                    <div class="progress-bar bg-success text-center" role="progressbar"\
                                        style="width: ' + cost + '%" aria-valuenow="' + reviewCost + '" aria-valuemin="0" aria-valuemax="5">' + reviewCost + '</div>\
                                </div></span>\
                        </div>\
                        <br>\
                        <p>\
                            <a class="float-right btn btn-primary text-white ml-2" data-toggle="modal"\
                                data-target="#editReview"><i class="fa fa-edit"></i> Edit</a>\
                            <a class="float-right btn text-white btn-danger" data-toggle="modal"\
                            data-target="#deleteReview"><i class="fa fa-times"></i> Delete</a>\
                        </p>\
                    </div>\
                </div>\
            </div>\
        </div><br>';

        table.insertAdjacentHTML('beforeend', html);
    }
}

// Add restaurant to favorites
function favoriteRestaurant(restoID, userID) {
    var favorite = new Object();
    favorite.restoID = restoID;
    favorite.userID = userID;

    // New HttpRequest instance
    var request = new XMLHttpRequest();
    request.open('POST', "favorites/" + userID, true);

    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        window.location = "timeline.html?userID=" + userID;
    }
    request.send(JSON.stringify(favorite));
}

// Remove restaurant from favorites
function unfavoriteRestaurant(restoID) {
    // New HttpRequest instance
    var request = new XMLHttpRequest();
    request.open('DELETE', "favorites/" + restoID, true);

    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        window.location = "restaurants.html?restoID=" + restoID;
    }
    request.send();
}