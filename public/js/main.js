/* Main.JS
__________                 __        __________                __   
\______   \ ____   _______/  |_  ____\______   \_____    _____/  |_ 
 |       _// __ \ /  ___/\   __\/  _ \|       _/\__  \  /    \   __\
 |    |   \  ___/ \___ \  |  | (  <_> )    |   \ / __ \|   |  \  |  
 |____|_  /\___  >____  > |__|  \____/|____|_  /(____  /___|  /__|  
        \/     \/     \/                     \/      \/     \/        */

/* MAIN PAGE */
// Gets params from URL into JS functions below
$(document)
    .ready(function () {
        getRecommended();
    });

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

// Gets data for one restaurant from database
function getAllRestaurants() {
    var request = new XMLHttpRequest();
    request.open('GET', 'allRestaurants', true);

    // Parses response texts from the database over to the HTML files.
    request.onload = function () {
        restaurantArray = JSON.parse(request.responseText);
        showAllRestaurants();
    };
    request.send();
}

// Gets data for one restaurant from database
function getRecommended() {
    var request = new XMLHttpRequest();
    request.open('GET', 'allRestaurants', true);

    // Parses response texts from the database over to the HTML files.
    request.onload = function () {
        restaurantArray = JSON.parse(request.responseText);
        showRecommended(restaurantArray);
    };
    request.send();
}

// Shows recommended restaurants from restaurant array
function showRecommended(restaurantArray) {
    var randomResto = shuffle(restaurantArray);
    console.log(randomResto);

    var table = document.getElementById("recommended");
    table.innerHTML = "";
    total = randomResto.length;

    for (var count = 0; count < 6; count++) {
        var restoID = restaurantArray[count].restoID;
        var restoName = restaurantArray[count].restoName;
        var thumb = restaurantArray[count].thumb;
        var cuisine = restaurantArray[count].cuisine;
        var cost = restaurantArray[count].cost;
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
                        View</a><button class="btn btn-outline-dark btn-sm ml-auto" type="button"\
                        onclick="favoriteRestaurant(' + restoID + ', 1)"><i class="fa fa-plus"></i> \
                        Add to Favorites</button>\
                        </div>\
            </div>\
        </div>';

        table.insertAdjacentHTML('beforeend', cell);
    }
}

// Shows recommended restaurants from restaurant array
function showAllRestaurants() {
    var table = document.getElementById("allRestos");
    var total = 0;
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
                        View</a><button class="btn btn-outline-dark btn-sm ml-auto" type="button"\
                        onclick="favoriteRestaurant(' + restoID + ', 1)"><i class="fa fa-plus"></i> \
                        Add to Favorites</button>\
                        </div>\
            </div>\
        </div>';

        table.insertAdjacentHTML('beforeend', cell);
    }
}

// Shuffle elements of an array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there are still remaining elements,
    while (0 !== currentIndex) {
        // pick randomly one of them
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // and swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}