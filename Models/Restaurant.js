"use strict";

class Restaurant {
    constructor(
        restoID,
        restoName,
        cuisine,
        cost,
        openingTime,
        closingTime,
        estType,
        diningOption,
        restoAddress,
        postalCode,
        branch,
        city,
        country,
        thumb,
        picture1,
        picture2,
        picture3,
        video,
        website,
        orderLink,
        phoneNo,
        gMap,
        rating1,
        rating2,
        rating3,
        rating4,
        rating5,
        numReviews,
        avgRating
    ) {
        this.restoID = restoID;
        this.restoName = restoName;
        this.cuisine = cuisine;
        this.cost = cost;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.estType = estType;
        this.diningOption = diningOption;
        this.restoAddress = restoAddress;
        this.postalCode = postalCode;
        this.branch = branch;
        this.city = city;
        this.country = country;
        this.thumb = thumb;
        this.picture1 = picture1;
        this.picture2 = picture2;
        this.picture3 = picture3;
        this.video = video;
        this.website = website;
        this.orderLink = orderLink;
        this.phoneNo = phoneNo;
        this.gMap = gMap;
        this.rating1 = rating1;
        this.rating2 = rating2;
        this.rating3 = rating3;
        this.rating4 = rating4;
        this.rating5 = rating5;
        this.numReviews = numReviews;
        this.avgRating = avgRating;
    }

    // GET
    getRestoID() {
        return this.restoID;
    }
    getRestoName() {
        return this.restoName;
    }
    getCuisine() {
        return this.cuisine;
    }
    getCost() {
        return this.cost;
    }
    getOpeningTime() {
        return this.openingTime;
    }
    getClosingTime() {
        return this.closingTime;
    }
    getEstType() {
        return this.estType;
    }
    getDiningOption() {
        return this.diningOption;
    }
    getRestoAddress() {
        return this.restoAddress;
    }
    getPostalCode() {
        return this.postalCode;
    }
    getBranch() {
        return this.branch;
    }
    getCity() {
        return this.city;
    }
    getCountry() {
        return this.country;
    }
    getThumb() {
        return this.thumb;
    }
    getVideo() {
        return this.video;
    }
    getPicture1() {
        return this.picture1;
    }
    getPicture2() {
        return this.picture2;
    }
    getPicture3() {
        return this.picture3;
    }
    getWebsite() {
        return this.website;
    }
    getOrderLink() {
        return this.orderLink;
    }
    getPhoneNo() {
        return this.phoneNo;
    }
    getGMap() {
        return this.gMap;
    }
    getRating1() {
        return this.rating1;
    }
    getRating2() {
        return this.rating2;
    }
    getRating3() {
        return this.rating3;
    }
    getRating4() {
        return this.rating4;
    }
    getRating5() {
        return this.rating5;
    }
    getNumReviews() {
        return this.numReviews;
    }
    getAvgRating() {
        return this.avgRating;
    }
}

module.exports = Restaurant;