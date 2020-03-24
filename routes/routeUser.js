"use strict";

const UserDB = require("../Models/UserDB");

var UserDBObject = new UserDB();

function routeUser(app) {
    app.route("/signup/").post(UserDBObject.newUser);
    app.route("/login/").post(UserDBObject.login);
    app.route("/resetPassword/").put(UserDBObject.resetPassword);
    app.route("/user/:userID/update/").put(UserDBObject.updateUser);
    app.route("/timeline/:userID/").get(UserDBObject.displayInfo);
    app.route("/allUsers/").get(UserDBObject.displayAllUsers);
    app
        .route("/user/:userID/changeProfilePic/")
        .put(UserDBObject.changeProfilePic);
    app.route("/activate/:userID").put(UserDBObject.activateUser);
    app.route("/deactivate/:userID").put(UserDBObject.deactivateUser);
    app.route("/deleteAccount/:username").delete(UserDBObject.deleteUser);
}

module.exports = { routeUser };