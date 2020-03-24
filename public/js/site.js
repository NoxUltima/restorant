"use strict";

/* Site.JS
__________                 __        __________                __   
\______   \ ____   _______/  |_  ____\______   \_____    _____/  |_ 
 |       _// __ \ /  ___/\   __\/  _ \|       _/\__  \  /    \   __\
 |    |   \  ___/ \___ \  |  | (  <_> )    |   \ / __ \|   |  \  |  
 |____|_  /\___  >____  > |__|  \____/|____|_  /(____  /___|  /__|  
        \/     \/     \/                     \/      \/     \/        */

// General
var currentIndex = 0;

// User/Account Settings
var response = ""; // Login message
var welcomeMsg = ""; // Welcome string
var userArray = [];

// Email messages
var mail = "mailto:"
var header = "Hey "
var activateSubject = "Activate Account"
var activateBody = ",\n\nWelcome to RestoRant!\n\nThis is a site where people give their honest opinion of their dining experiences.\
\nCongratulations on being the first user - but first, you would need to activate your account.\n\nClick on this link to continue: \n"
var activateFooter = "\n\nHave a good day! Enjoy raving and ranting!\n\nSincerely,\nCreator of RestoRant"
var resetSubject = "Reset Password"
var resetBody = ",\nWelcome again to RestoRant!\nCopy this link to your browser to reset your password.\n(This link expires within a day.)\n"
var resetFooter = "\n\nYours sincerely,\nCreator of RestoRant"
var deactivateSubject = "Account Deactivated"
var deactivateBody = ",\n\Sorry that you have to go! Come back again soon!\nIf you want to reactivate your account, you'll be notified at next login."
var deactivateFooter = "\n\nHave a good day!\n\nSincerely,\nCreator of RestoRant"
var deleteSubject = "Account Deleted"
var deleteBody = ",\n\Sorry that you have to go! Come back again soon!"
var deleteFooter = "\n\nHave a good day!\n\nSincerely,\nCreator of RestoRant"

// Restaurants
var restaurantURL = "/restaurant/";
var restaurantArray = [];
var restaurantCount = 0;

// Search query, URL stringified
var searchQuery = "";
var resultArray = [];

// Restaurant Image
var restoImgURL = "/images/restaurants/"
var reviewImgURL = "/images/reviews/"

// Reviews
var reviewArray = [];
var reviewCount = 0;

// Timeline:
// Account Info, Favorites and User Reviews
var timelineURL = "/timeline/";
var favoritesURL = "/favorites/";
var favoriteArray = [];
var favoriteCount = 0;
var userRevArray = [];
var userRevCount = 0;

/* Discarded items */
// Displays profile picture
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imageUpload").change(function () {
    readURL(this);
});

// A function I created to post reviews and all
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

    return da[w] + ' ' + d + ' ' + mo[m] + ' ' + y + ' ' + h + ':' + n + ':' + s;
}

console.log(formatDate(new Date()));