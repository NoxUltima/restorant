"use strict";

const express = require("express");
const bodyParser = require("body-parser");

// Routes according to route folder
const routeUser = require("./routes/routeUser");
const routeFavorites = require("./routes/routeFavorites");
const routeRestaurant = require("./routes/routeRestaurant");
const routeReview = require("./routes/routeReview");

var app = express();
var host = "127.0.0.1";
var port = 8080;
var startPage = "index.html";

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Activate routes to URLs.
routeUser.routeUser(app);
routeFavorites.routeFavorites(app);
routeRestaurant.routeRestaurant(app);
routeReview.routeReview(app);

function gotoIndex(req, res) {
    console.log(req.params);
    res.sendFile(__dirname + "/" + startPage);
}

app.get("/" + startPage, gotoIndex);
app.route("/");

var server = app.listen(port, host, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Here goes nothing: http://%s:%s", host, port);
});