"use strict";

class Favorites {
    constructor(favoritesID, userID, restoID, createDate) {
        this.favoritesID = favoritesID;
        this.userID = userID;
        this.restoID = restoID;
        this.createDate = createDate;
    }

    // GET
    getFavoritesID() {
        return this.favoritesID;
    }
    getUserID() {
        return this.userID;
    }
    getRestoID() {
        return this.restoID;
    }
    getCreateDate() {
        return this.createDate;
    }

    // SET
    setFavoritesID() {
        this.favoritesID = favoritesID;
    }
    setUserID() {
        this.userID = userID;
    }
    setRestoID() {
        this.restoID = restoID;
    }
    setCreateDate() {
        this.createDate = createDate;
    }
}

module.exports = Favorites;