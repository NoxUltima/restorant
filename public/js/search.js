/* Search.JS
__________                 __        __________                __   
\______   \ ____   _______/  |_  ____\______   \_____    _____/  |_ 
 |       _// __ \ /  ___/\   __\/  _ \|       _/\__  \  /    \   __\
 |    |   \  ___/ \___ \  |  | (  <_> )    |   \ / __ \|   |  \  |  
 |____|_  /\___  >____  > |__|  \____/|____|_  /(____  /___|  /__|  
        \/     \/     \/                     \/      \/     \/        */

/* SEARCH PAGE */
// Gets params from URl when search result page loads
$(document)
    .ready(function () {
        var query = getParameterByName("query");
        var cuisine = getParameterByName("cuisine");
        var dining = getParameterByName("dining");
        var estType = getParameterByName("estType");
        var location = getParameterByName("location");
        var cost = getParameterByName("cost");
        var rating = getParameterByName("rating");
        var sortBy = getParameterByName("sortBy");
        getResults(query, cuisine, dining, estType, location, cost, rating, sortBy);
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

/* SEARCH PAGE */
// Search, filter and sort restaurants, using URL and DB.
function search() {
    var query, cuisine, dining, location, cost, rating, sortBy;

    // Get variables from the form into the URL
    query = document.getElementById("searchQuery").value;
    cuisine = document.getElementById("filterCuisine").value;
    dining = document.getElementById("filterDining").value;
    estType = document.getElementById("filterEstType").value;
    location = document.getElementById("filterLocation").value;
    cost = document.getElementById("filterCost").value;
    rating = document.getElementById("filterRating").value;
    sortBy = document.getElementById("filterSortBy").value;

    // Make a URL and encode it
    var uri = "?query=" + query + "&cuisine=" + cuisine + "&dining=" + dining + "&estType=" + estType + "&location=" + location + "&cost=" + cost + "&rating=" + rating + "&sortBy=" + sortBy;
    var url = encodeURI(uri);

    // Open a HTTP request to parse the data inside the form over to the HTML.
    var request = new XMLHttpRequest();
    request.open('GET', "search" + url, true);

    // Sending over the search thing to the URL
    request.onload = function () {
        resultArray = JSON.parse(request.responseText);
        // Redirects user to search URL.
        window.location = "search.html" + url;
    };
    request.send();
}

// For this I actually need two functions, the above to redirect me to the search page
// and the other to display the results. (both functions are same same but different)
function getResults(query, cuisine, dining, estType, location, cost, rating, sortBy) {
    // Make a URL and encode it
    var uri = "?query=" + query + "&cuisine=" + cuisine + "&dining=" + dining + "&estType=" + estType + "&location=" + location + "&cost=" + cost + "&rating=" + rating + "&sortBy=" + sortBy;
    var url = encodeURI(uri);

    // Open a HTTP request to parse the data inside the form over to the HTML.
    var request = new XMLHttpRequest();
    request.open('GET', "search" + url, true);

    // Parses response texts from the database over to the HTML files.
    request.onload = function () {
        resultArray = JSON.parse(request.responseText);
        displayResults(resultArray);
    };
    request.send();
}

// Displays restaurant cards
function displayResults(resultArray) {
    var table = document.getElementById("searchResults");
    var total = 0;
    var message = "";
    table.innerHTML = "";
    total = resultArray.length;

    // Continually add restaurant cards to the HTML with a for loop
    for (var count = 0; count < total; count++) {
        var restoID = resultArray[count].restoID;
        var restoName = resultArray[count].restoName;
        var thumb = resultArray[count].thumb;
        var cuisine = resultArray[count].cuisine;
        var cost = resultArray[count].cost;
        var estType = resultArray[count].estType;
        var diningOption = resultArray[count].diningOption;
        var openingTime = resultArray[count].openingTime;
        var address = resultArray[count].restoAddress;
        var branch = resultArray[count].branch;
        var numReviews = resultArray[count].numReviews;
        var avgRating = resultArray[count].avgRating;

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
            <div class="d-flex card-footer"><button class="btn btn-dark btn-sm" type="button"><a\
                        href="restaurants.html?restoID=' + restoID + '" style="color: white !important"><i class="fa fa-eye"></i>\
                        View</a></button><button class="btn btn-outline-dark btn-sm ml-auto" type="button"\
                        onclick="favoriteRestaurant(' + restoID + ', 1)"><i class="fa fa-plus"></i> \
                        Add to Favorites</button>\
                        </div>\
            </div>\
        </div>';

        table.insertAdjacentHTML('beforeend', cell);
    }

    // Displays total restaurants
    message = total + " restaurants found";
    if (message == "0 restaurants found") {
        message = "Nothing here. Please search again.";
    }
    document.getElementById("totalRestaurants").textContent = message;
}