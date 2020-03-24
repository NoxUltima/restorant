/* Restaurant.JS
__________                 __        __________                __   
\______   \ ____   _______/  |_  ____\______   \_____    _____/  |_ 
 |       _// __ \ /  ___/\   __\/  _ \|       _/\__  \  /    \   __\
 |    |   \  ___/ \___ \  |  | (  <_> )    |   \ / __ \|   |  \  |  
 |____|_  /\___  >____  > |__|  \____/|____|_  /(____  /___|  /__|  
        \/     \/     \/                     \/      \/     \/        */

/* RESTAURANT PAGE */
// Gets params from URL into JS functions below
$(document).ready(function () {
    var restoID = getParameterByName('restoID');
    getRestoInfo(restoID);
    getRestoReviews(restoID);
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
function getRestoInfo(restoID) {
    var request = new XMLHttpRequest();
    request.open('GET', "restaurants/" + restoID, true);

    request.onload = function () {
        restaurantArray = JSON.parse(request.responseText);
        showRestoInfo(restaurantArray);
        getRestoReviews(restoID);
    };
    request.send();
}

// Shows restaurant information in the restaurant page
function showRestoInfo(restaurantArray) {
    // Pad the number for postal codes
    function pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    // Pie chart for review statistics
    // Code from https://www.amcharts.com/demos/simple-pie-chart/
    am4core.ready(function () {
        // Theme
        am4core.useTheme(am4themes_material);
        // To add animations on page load
        am4core.useTheme(am4themes_animated);

        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.PieChart);

        // Add data into the JSON array
        chart.data = [{
            "rating": "1 Star",
            "number": restaurantArray[0].rating1
        },
        {
            "rating": "2 Stars",
            "number": restaurantArray[0].rating2
        },
        {
            "rating": "3 Stars",
            "number": restaurantArray[0].rating3
        },
        {
            "rating": "4 Stars",
            "number": restaurantArray[0].rating4
        },
        {
            "rating": "5 Stars",
            "number": restaurantArray[0].rating5
        }];

        // Add and configure series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "number";
        pieSeries.dataFields.category = "rating";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;
    });

    /* INFORMATION */
    // Restaurant Name
    document.getElementById("title").textContent = restaurantArray[0].restoName;
    document.getElementById("restoName").textContent = restaurantArray[0].restoName;
    // Cuisine
    document.getElementById("cuisine").textContent = restaurantArray[0].cuisine;
    // Cost
    document.getElementById("cost").textContent = restaurantArray[0].cost;
    // Operating Hours
    document.getElementById("opHours").textContent = restaurantArray[0].openingTime + " to " + restaurantArray[0].closingTime;
    // Dining Option
    document.getElementById("diningOption").textContent = restaurantArray[0].diningOption;
    // Establishment Type
    document.getElementById("estType").textContent = restaurantArray[0].estType;
    // Branch
    document.getElementById("branch").textContent = restaurantArray[0].branch;
    // Phone Number
    document.getElementById("phoneNo").textContent = restaurantArray[0].phoneNo;

    /* ADDRESS/DIRECTIONS */
    // Address
    document.getElementById("address").textContent = restaurantArray[0].restoAddress + ", " + restaurantArray[0].country + " " + pad(restaurantArray[0].postalCode, 6);
    // Google Maps IFrame
    document.getElementById("gMap").src = restaurantArray[0].gMap;

    /* MASTHEAD */
    // Random image for masthead
    // Each restaurant folder has 3 images each labelled pic1 to pic3
    var min = 1;
    var max = 4;
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    document.getElementById("masthead").style.backgroundImage = "url(images/restaurants/" + restaurantArray[0].restoID + "/pic" + random + ".jpg)";

    /* GALLERY */
    document.getElementById("pic1").src = restaurantArray[0].picture1;
    document.getElementById("pic2").src = restaurantArray[0].picture2;
    document.getElementById("pic3").src = restaurantArray[0].picture3;

    document.getElementById("link1").href = restaurantArray[0].picture1;
    document.getElementById("link2").href = restaurantArray[0].picture2;
    document.getElementById("link3").href = restaurantArray[0].picture3;

    /* LINKS */
    // YouTube Video Link
    document.getElementById("video").src = restaurantArray[0].video;
    // Phone number
    document.getElementById("call").href = "callto:" + restaurantArray[0].phoneNo;
    // "Learn More" Link
    document.getElementById("learnMore").href = restaurantArray[0].website;
    // Order/Reserve External Link
    document.getElementById("order").href = restaurantArray[0].orderLink;

    /* STATS */
    // Total Reviews
    document.getElementById("numReviews").textContent = restaurantArray[0].numReviews;
    // Average Rating
    document.getElementById("avgRating").textContent = restaurantArray[0].avgRating;

    // Number of Stars
    var avgRating = restaurantArray[0].avgRating;
    if (Math.ceil(avgRating) == 1) {
        document.getElementById("stars").innerHTML =
            '<span class="fa fa-star checked"></span>\
        <span class="fa fa-star"></span>\
        <span class="fa fa-star"></span>\
        <span class="fa fa-star"></span>\
        <span class="fa fa-star"></span>';
    } else if (Math.ceil(avgRating) == 2) {
        document.getElementById("stars").innerHTML =
            '<span class="fa fa-star checked"></span>\
        <span class="fa fa-star checked"></span>\
        <span class="fa fa-star"></span>\
        <span class="fa fa-star"></span>\
        <span class="fa fa-star"></span>';
    } else if (Math.ceil(avgRating) == 3) {
        document.getElementById("stars").innerHTML =
            '<span class="fa fa-star checked"></span>\
        <span class="fa fa-star checked"></span>\
        <span class="fa fa-star checked"></span>\
        <span class="fa fa-star"></span>\
        <span class="fa fa-star"></span>';
    } else if (Math.ceil(avgRating) == 4) {
        document.getElementById("stars").innerHTML =
            '<span class="fa fa-star checked"></span>\
        <span class="fa fa-star checked"></span>\
        <span class="fa fa-star checked"></span>\
        <span class="fa fa-star checked"></span>\
        <span class="fa fa-star"></span>';
    } else {
        document.getElementById("stars").innerHTML =
            '<span class="fa fa-star checked"></span>\
        <span class="fa fa-star checked"></span>\
        <span class="fa fa-star checked"></span>\
        <span class="fa fa-star checked"></span>\
        <span class="fa fa-star checked"></span>';
    }

    // Number of reviews of rating 1-5
    document.getElementById("rating1").textContent = restaurantArray[0].rating1;
    document.getElementById("rating2").textContent = restaurantArray[0].rating2;
    document.getElementById("rating3").textContent = restaurantArray[0].rating3;
    document.getElementById("rating4").textContent = restaurantArray[0].rating4;
    document.getElementById("rating5").textContent = restaurantArray[0].rating5;
}

// Get all reviews for one restaurant
function getRestoReviews(restoID) {
    var request = new XMLHttpRequest();
    var url = "/restaurants/" + restoID + "/reviews/";
    request.open('GET', url, true);

    request.onload = function () {
        reviewArray = JSON.parse(request.responseText);
        showRestoReviews(reviewArray);
    };
    request.send();
}

// Show all reviews for one restaurant
function showRestoReviews(reviewArray) {
    var table = document.getElementById("restoReviews");
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
        var userID = reviewArray[count].userID;
        var reviewUpdate = reviewArray[count].reviewUpdate;
        var username = reviewArray[count].username;
        var profile = reviewArray[count].profile;

        var food = reviewFood * 20;
        var service = reviewService * 20;
        var ambience = reviewAmbience * 20;
        var cost = reviewCost * 20;

        var html = '<div class="card">\
            <div class="card-body">\
                <div class="row">\
                    <div class="col-md-2">\
                        <img src="' + profile + '" class="img img-rounded img-fluid" />\
                        <p class="text-secondary text-center">' + reviewCreate + '</p>\
                        <p class="text-secondary text-center">' + reviewUpdate + '</p>\
                        <p class="text-secondary text-center">#' + reviewID + '</p>\
                    </div>\
                    <div class="col-md-10">\
                        <p>\
                            <a class="float-left" href="timeline.html?userID=' + userID + '"><i class="fas fa-user-alt"></i><strong>\
                            ' + username + '</strong></a>\
                            <h4 class="float-right">' + reviewRating + ' <i class="fa fa-star"></i></h4>\
                        </p>\
                        <div class="clearfix"></div>\
                        <h3>' + reviewTitle + '</h3>\
                        <p>' + reviewText + '</p>\
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
                            data-target="#deleteReview"> <i class="fa fa-times"></i> Delete</a>\
                        </p>\
                    </div>\
                </div>\
            </div>\
        </div><br>';

        table.insertAdjacentHTML('beforeend', html);
    }
}