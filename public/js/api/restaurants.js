
// Find all image files from folder
function listGallery(dir) {
    var results = []; // Output an array of file URLs
    var list = fs.readdirSync(dir);

    list.forEach(function (file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);

        // Recurse & find files within subdirectories
        if (stat && stat.isDirectory()) {
            results = results.concat(listGallery(file));
        } else {
            // Split string to file type and name with regex
            filetype = file.split(".").pop();
            filename = file.split(/(\\|\/)/g).pop();

            // Filter out only JPG and PNG files not named "thumb"
            if ((filetype == "jpg" || filetype == "png")
                && filename != "thumb.jpg") {
                results.push(file);
            }
        }
    });

    return results;
}

// Show images in the Gallery
function displayGallery(restoID) {
    // Get images from /restaurants and /reviews folder
    var listRestoImg = listGallery("images/restaurants" + restoID);
    var listReviewImg = listGallery("images/restaurants/reviews/" + restoID);
    var images = listRestoImg.concat(listReviewImg);

    var table = document.getElementById("restoGallery");
    var total = 0;
    table.innerHTML = "";
    total = images.length;
    imageCount = 0;

    for (var count = 0; count < total; count++) {
        var imageURL = images[count];
        var index = count + 1;
        var cell = '<div class="col-sm-4 d-flex justify-content-center align-items-center">\
            <a data-fancybox="gallery" data-caption="picture ' + index + '" href="' + imageURL + '">\
            <img class="img-fluid" src="' + imageURL + '" alt="picture ' + index + '"></a></div>';

        table.insertAdjacentHTML('beforeend', cell);
        imageCount++;
    }
}

// Adds restaurant to database
function addRestaurant() {
    var restaurant = new Object();

    // Get these values from the form
    restaurant.restoName = document.getElementById("addRestoName").value;
    restaurant.cuisine = document.getElementById("addCuisine").value;
    restaurant.cost = document.getElementById("addCost").value;
    restaurant.openingTime = document.getElementById("addOpeningTime").value;
    restaurant.closingTime = document.getElementById("addClosingTime").value;
    restaurant.estType = document.getElementById("addEstType").value;
    restaurant.diningOption = document.getElementById("addDiningOption").value;
    restaurant.restoAddress = document.getElementById("addRestoAddress").value;
    restaurant.postalCode = document.getElementById("addPostalCode").value;
    restaurant.branch = document.getElementById("addBranch").value;
    restaurant.city = document.getElementById("addCity").value;
    restaurant.country = document.getElementById("addCountry").value;
    restaurant.video = document.getElementById("addVideo").value;
    restaurant.website = document.getElementById("addWebsite").value;
    restaurant.orderLink = document.getElementById("addOrderLink").value;
    restaurant.phoneNo = document.getElementById("addPhoneNo").value;
    restaurant.gMap = document.getElementById("addGMap").value;

    // Read URL from images

    var newRestaurant = new XMLHttpRequest();
    newRestaurant.open("POST", "/addRestaurant/", true);
    newRestaurant.setRequestHeader("Content-Type", "application/json");
    newRestaurant.send(JSON.stringify(restaurant));
}

// Updates restaurant details
function updateRestaurant() {
    // Autofills in the current values from the database
    document.getElementById("editRestoName").value = restaurantArray[currentIndex].restoName;
    document.getElementById("editCuisine").value = restaurantArray[currentIndex].cuisine;
    document.getElementById("editCost").value = restaurantArray[currentIndex].cost;
    document.getElementById("editOpeningTime").value = restaurantArray[currentIndex].openingTime;
    document.getElementById("editClosingTime").value = restaurantArray[currentIndex].closingTime;
    document.getElementById("editEstType").value = restaurantArray[currentIndex].estType;
    document.getElementById("editDiningOption").value = restaurantArray[currentIndex].diningOption;
    document.getElementById("editRestoAddress").value = restaurantArray[currentIndex].restoAddress;
    document.getElementById("editPostalCode").value = restaurantArray[currentIndex].postalCode;
    document.getElementById("editBranch").value = restaurantArray[currentIndex].branch;
    document.getElementById("editCity").value = restaurantArray[currentIndex].city;
    document.getElementById("editCountry").value = restaurantArray[currentIndex].country;
    document.getElementById("editVideo").value = restaurantArray[currentIndex].video;
    document.getElementById("editWebsite").value = restaurantArray[currentIndex].website;
    document.getElementById("editOrderLink").value = restaurantArray[currentIndex].orderLink;
    document.getElementById("editPhoneNo").value = restaurantArray[currentIndex].phoneNo;
    document.getElementById("editGMap").value = restaurantArray[currentIndex].gMap;

    var response = confirm("Are you sure you want to delete this restaurant?");

    if (response == true) {
        var editURL = restaurantURL + "/" + restaurantArray[currentIndex].restoID;
        var editRestaurant = new XMLHttpRequest();
        editRestaurant.open("PUT", editURL, true);
        editRestaurant.setRequestHeader("Content-Type", "application/json");

        // Gets the new values in the database
        restaurantArray[currentIndex].restoName = document.getElementById("editRestoName").value;
        restaurantArray[currentIndex].cuisine = document.getElementById("editCuisine").value;
        restaurantArray[currentIndex].cost = document.getElementById("editCost").value;
        restaurantArray[currentIndex].openingTime = document.getElementById("editOpeningTime").value;
        restaurantArray[currentIndex].closingTime = document.getElementById("editClosingTime").value;
        restaurantArray[currentIndex].estType = document.getElementById("editEstType").value;
        restaurantArray[currentIndex].diningOption = document.getElementById("editDiningOption").value;
        restaurantArray[currentIndex].restoAddress = document.getElementById("editRestoAddress").value;
        restaurantArray[currentIndex].postalCode = document.getElementById("editPostalCode").value;
        restaurantArray[currentIndex].branch = document.getElementById("editBranch").value;
        restaurantArray[currentIndex].city = document.getElementById("editCity").value;
        restaurantArray[currentIndex].country = document.getElementById("editCountry").value;
        restaurantArray[currentIndex].video = document.getElementById("editVideo").value;
        restaurantArray[currentIndex].website = document.getElementById("editWebsite").value;
        restaurantArray[currentIndex].orderLink = document.getElementById("editOrderLink").value;
        restaurantArray[currentIndex].phoneNo = document.getElementById("editPhoneNo").value;
        restaurantArray[currentIndex].gMap = document.getElementById("editGMap").value;

        editRestaurant.send(JSON.stringify(restaurantArray[currentIndex]));
    }
}

// Deletes restaurant from database
function deleteRestaurant() {
    var response = confirm("Are you sure you want to delete this restaurant?");

    if (response == true) {
        var item = element.getAttribute("item");
        var deleteURL = restaurantURL + "/" + restaurantArray[0].restoID + "/delete/";
        var deleteRestaurant = new XMLHttpRequest();
        deleteRestaurant.open("DELETE", deleteURL, true);
        deleteRestaurant.send();
    }
}