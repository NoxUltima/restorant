"use strict";

/* User.JS
__________                 __        __________                __   
\______   \ ____   _______/  |_  ____\______   \_____    _____/  |_ 
 |       _// __ \ /  ___/\   __\/  _ \|       _/\__  \  /    \   __\
 |    |   \  ___/ \___ \  |  | (  <_> )    |   \ / __ \|   |  \  |  
 |____|_  /\___  >____  > |__|  \____/|____|_  /(____  /___|  /__|  
        \/     \/     \/                     \/      \/     \/        */

/* ACCOUNT / SETTINGS PAGE */
// Gets params from URL into JS functions below
$(document).ready(function () {
    var username = getParameterByName("username");
    welcome(username);
    activate(username);
    getAccountInfo(userID);
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

/* USER & ACCOUNT PAGE */
var response = "";

// Turns on user status on to 1 whenever user login
function activate(username) {
    var request = new XMLHttpRequest();
    request.open("PUT", "/activate/" + username, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        response = JSON.parse(request.responseText);
    }
    request.send();
}

// Checks if uer is logged in to the app.
function isLoggedIn(userID) {
    var request = new XMLHttpRequest();
    request.open("GET", "timeline/" + userID, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.status == "1") {
            return true;
        } else {
            return false;
        };
    }
}

var response = "";
// Register user
function registerUser() {
    var newUser = new Object();
    newUser.username = document.getElementById("newUsername").value;
    newUser.firstName = document.getElementById("newFirstName").value;
    newUser.lastName = document.getElementById("newLastName").value;
    newUser.gender = document.getElementById("newGender").value;
    newUser.dob = document.getElementById("newDOB").value;
    newUser.country = document.getElementById("newCountry").value;
    newUser.city = document.getElementById("newCity").value;
    newUser.userAddress = document.getElementById("newAddress").value;
    newUser.mobile = document.getElementById("newMobile").value;
    newUser.email = document.getElementById("newEmail").value;
    newUser.password = document.getElementById("newPassword").value;

    // Call sendActivate() to send user a unique email
    var request = new XMLHttpRequest();
    request.open("POST", "/signup", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        window.location = "login.html?username=" + newUser.username;
    }
    request.send(JSON.stringify(newUser));
}

// Gets account info from database
function getAccountInfo(userID) {
    var request = new XMLHttpRequest();
    request.open('GET', "timeline/" + userID, true);

    request.onload = function () {
        userArray = JSON.parse(request.responseText);
        getAccountInfo();
        autofillInfo(userArray);
    };
    request.send();
}

// Displays account info in the account textboxes on page load
function autofillInfo(userArray) {
    document.getElementById("editUsername").value = userArray[0].username;
    document.getElementById("editFirstName").value = userArray[0].firstName;
    document.getElementById("editLastName").value = userArray[0].lastName;
    document.getElementById("editGender").value = userArray[0].gender;
    document.getElementById("editCountry").value = userArray[0].country;
    document.getElementById("editCity").value = userArray[0].city;
    document.getElementById("editUserAddress").value = userArray[0].userAddress;
    document.getElementById("editMobile").value = userArray[0].mobile;
    document.getElementById("editEmail").value = userArray[0].email;
}

// Updates user info
function updateInfo() {
    var user = new Object();
    user.userID = document.getElementById("editUserID").value;
    user.username = document.getElementById("editUsername").value;
    user.firstName = document.getElementById("editFirstName").value;
    user.lastName = document.getElementById("editLastName").value;
    user.gender = document.getElementById("editGender").value;
    user.country = document.getElementById("editCountry").value;
    user.city = document.getElementById("editCity").value;
    user.userAddress = document.getElementById("editAddress").value;
    user.mobile = document.getElementById("editMobile").value;
    user.email = document.getElementById("editEmail").value;
    user.password = document.getElementById("editPassword").value;

    var updateUser = new XMLHttpRequest();
    updateUser.open("PUT", "user/" + user.userID + "/update", true);
    updateUser.setRequestHeader("Content-Type", "application/json");
    updateUser.send(JSON.stringify(user));
}

// Builds mailto Link
function buildString() {
    var email = document.getElementById('to'),
        to = email.value,
        subject = encodeURIComponent(document.getElementById('subject').value),
        body = encodeURIComponent(document.getElementById('body').value),
        link = document.getElementById('link'),
        message = ''
    if (to) {
        email.className = 'not'
        message = 'mailto:' + to
        subject || body ? message += '?' : false
        subject ? message += 'subject=' + subject : false
        subject && body ? message += '&body=' + body : false
        !subject && body ? message += 'body=' + body : false
        link.innerHTML = message
    } else {
        email.className = 'error'
        notification('Please enter a recipient email address', 'error', 5)
        email.focus()
    }
}

// Reset password
function resetPassword() {
    var reset = new Object();
    reset.email = document.getElementById('resetEmail').value;
    reset.password = document.getElementById('newPassword').value;

    var request = new XMLHttpRequest();
    request.open("PUT", "resetPassword/", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        window.location = "login.html";
    }
    // Once all has been done, submit changes to database
    request.send(JSON.stringify(reset));
}

// Sends user an email to reset password
function sendResetPass() {
    var email = document.getElementById("sendEmail").value;
    var emailURI = encodeURI(email);
    var message = "mailto:" + email + "?subject=Reset%20Password&body=Hey!%0D%0A%0D%0ASorry%20you%20forgot%20your%20password!%0D%0ACopy%20this%20link%20in%20your%20browser%20to%20reset%20your%20password%3A%0D%0A%0D%0Alocalhost%3A8080%2Fresetpassword.html%3Femail%3D" + emailURI + "%0D%0A%0D%0AEnjoy!%0D%0ACreator%20of%20RestoRant";
    window.location = message;
}

// Activate user account
function activateUser(userID) {
    var userURL = "activate/" + userID;
    var activate = new XMLHttpRequest();
    activate.open("PUT", userURL, true);
    activate.setRequestHeader("Content-Type", "application/json");
    activate.send();
}

// Delete account - Display a modal to confirm deletion
function deleteAccount() {
    var username = document.getElementById("deleteUsername").value;
    var request = new XMLHttpRequest();
    request.open("DELETE", "deleteAccount/" + username, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
}