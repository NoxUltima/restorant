"use strict";

var db = require("../db-connection");
const User = require("./User");

class UserDB {
    // Register a new user
    newUser(request, respond) {
        var now = new Date();
        var sql =
            "INSERT INTO restorant.USER(username, firstName, lastName, password, joined, profile, dob, age, gender, country, city, userAddress, mobile, email, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)";

        // Generates URL of profile picture from username.
        var username = request.body.username;
        var url = "../public/images/users/";
        var profile = url.concat(username, ".jpg");

        // Gets input from date of birth (from HTML calendar object)
        var dob = request.body.dob;
        var age = getAge(dob);

        // Calculates age from date of birth
        function getAge(DOB) {
            var today = new Date();
            var birthDate = new Date(DOB);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age = age - 1;
            }
            return age;
        }

        function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }

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

            return da[w] + ' ' + d + ' ' + mo[m] + ' ' + y + ' ' + h + ':' + pad(n, 2) + ':' + pad(s, 2);
        }

        var userObject = new User(
            null,
            username,
            request.body.firstName,
            request.body.lastName,
            request.body.password,
            formatDate(now),
            profile,
            dob,
            age,
            request.body.gender,
            request.body.country,
            request.body.city,
            request.body.userAddress,
            request.body.mobile,
            request.body.email,
            request.body.status
        );
        var values = [
            userObject.getUsername(),
            userObject.getFirstName(),
            userObject.getLastName(),
            userObject.getPassword(),
            userObject.getJoined(),
            userObject.getProfile(),
            userObject.getDOB(),
            userObject.getAge(),
            userObject.getGender(),
            userObject.getCountry(),
            userObject.getCity(),
            userObject.getUserAddress(),
            userObject.getMobile(),
            userObject.getEmail(),
            userObject.getStatus(),
            userObject.getUserID()
        ];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Login
    login(request, respond) {
        var username = request.body.username;
        var password = request.body.password;
        var msg = "";

        var sql = "SELECT userID, password FROM restorant.USER WHERE username = ?";
        // Verify password from URL
        db.query(sql, username, function (error, result) {
            if (error) {
                respond.json(error);
            } else {
                // If user is found, result has a record
                if (result.length > 0) {
                    if (password == result[0].password) {
                        msg = "1";
                        console.log(msg);
                        var userID = result[0].userID;
                        console.log(userID);
                    } else {
                        msg = "Login Failed";
                        console.log(msg);
                    }
                } else {
                    // If user not found, result has no record
                    msg = "User not found";
                }
                respond.json(prepareMessage(msg));
            }
        });
    }

    // Reset password
    resetPassword(request, respond) {
        var sql =
            "UPDATE restorant.USER SET password = ? WHERE email = ?";

        var userObject = new User(
            request.body.userID,
            request.body.username,
            request.body.firstName,
            request.body.lastName,
            request.body.password,
            request.body.joined,
            request.body.profile,
            request.body.dob,
            request.body.age,
            request.body.gender,
            request.body.country,
            request.body.city,
            request.body.userAddress,
            request.body.mobile,
            request.body.email,
            request.body.status
        );
        var values = [
            userObject.getPassword(),
            userObject.getEmail()
        ];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Show user info
    displayInfo(request, respond) {
        var userID = request.params.userID;
        var sql =
            "SELECT * FROM restorant.USER WHERE userID = ?";

        db.query(sql, userID, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Show user info
    displayAllUsers(request, respond) {
        var sql =
            "SELECT * FROM restorant.USER";

        db.query(sql, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Change profile picture
    changeProfilePic(request, respond) {
        // Generates URL of new profile picture from username.
        var now = new Date();
        var userID = request.body.userID;
        var username = request.body.username;
        var url = "../public/images/users/";
        var date = "";

        // Gets time values and concatenates them into a custom code.
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDay();
        var h = now.getHours();
        var n = now.getMinutes();
        var s = now.getSeconds();
        var updateID = date.concat(y, "-", m, "-", d, "_", h, ".", n, ".", s);

        // Generates a new profile URL from both the username and the update date/time.
        var profile = url.concat(username, "_", updateID, ".jpg");
        var sql =
            "UPDATE restorant.USER SET profile = ? WHERE username = ? AND userID = ?";

        var userObject = new User(
            userID,
            request.body.username,
            request.body.firstName,
            request.body.lastName,
            request.body.password,
            request.body.joined,
            profile,
            request.body.dob,
            request.body.age,
            request.body.gender,
            request.body.country,
            request.body.city,
            request.body.userAddress,
            request.body.mobile,
            request.body.email,
            request.body.status
        );
        var values = [
            userObject.getProfile(),
            userObject.getUsername(),
            userObject.getUserID()
        ];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Update user details
    updateUser(request, respond) {
        var now = new Date();
        var sql =
            "UPDATE restorant.USER SET username = ?, firstName = ?, lastName = ?, gender = ?, country = ?, city = ?, userAddress = ?, mobile = ?, email = ?, password = ? WHERE userID = ?";

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

        var userObject = new User(
            request.body.userID,
            request.body.username,
            request.body.firstName,
            request.body.lastName,
            request.body.password,
            formatDate(now),
            request.body.profile,
            request.body.dob,
            request.body.age,
            request.body.gender,
            request.body.country,
            request.body.city,
            request.body.userAddress,
            request.body.mobile,
            request.body.email,
            request.body.status
        );
        var values = [
            userObject.getUsername(),
            userObject.getFirstName(),
            userObject.getLastName(),
            userObject.getGender(),
            userObject.getCountry(),
            userObject.getCity(),
            userObject.getUserAddress(),
            userObject.getMobile(),
            userObject.getEmail(),
            userObject.getPassword(),
            userObject.getUserID()
        ];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Delete user
    deleteUser(request, respond) {
        var username = request.params.username;
        var sql = "DELETE FROM restorant.USER WHERE username = ?";

        db.query(sql, username, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Activate user
    activateUser(request, respond) {
        var username = request.params.username;
        var sql = "UPDATE restorant.USER SET status = 1 WHERE userID = ?";

        db.query(sql, username, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }

    // Deactivate user
    deactivateUser(request, respond) {
        var username = request.params.username;
        var sql = "UPDATE restorant.USER SET status = 0 WHERE username = ?";

        db.query(sql, username, function (error, result) {
            if (error) {
                throw error;
            } else {
                respond.json(result);
            }
        });
    }
}

// Creates a custom message to be sent back to the client.
function prepareMessage(msg) {
    var obj = { message: msg };
    return obj;
}

module.exports = UserDB;