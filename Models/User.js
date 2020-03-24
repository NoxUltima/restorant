"use strict";

class User {
    constructor(
        userID,
        username,
        firstName,
        lastName,
        password,
        joined,
        profile,
        dob,
        age,
        gender,
        country,
        city,
        userAddress,
        mobile,
        email,
        status
    ) {
        this.userID = userID;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.joined = joined;
        this.profile = profile;
        this.dob = dob;
        this.age = age;
        this.gender = gender;
        this.country = country;
        this.city = city;
        this.userAddress = userAddress;
        this.mobile = mobile;
        this.email = email;
        this.status = status;
    }

    // GET
    getUserID() {
        return this.userID;
    }
    getUsername() {
        return this.username;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getPassword() {
        return this.password;
    }
    getJoined() {
        return this.joined;
    }
    getProfile() {
        return this.profile;
    }
    getDOB() {
        return this.dob;
    }
    getAge() {
        return this.age;
    }
    getGender() {
        return this.gender;
    }
    getCountry() {
        return this.country;
    }
    getCity() {
        return this.city;
    }
    getUserAddress() {
        return this.userAddress;
    }
    getMobile() {
        return this.mobile;
    }
    getEmail() {
        return this.email;
    }
    getStatus() {
        return this.status;
    }

    // SET
    setUserId() {
        this.userID = userID;
    }
    setUsername() {
        this.username = username;
    }
    setFirstName() {
        this.username = firstName;
    }
    setLastName() {
        this.lastName = lastName;
    }
    setPassword() {
        this.password = password;
    }
    setJoined() {
        this.joined = joined;
    }
    setProfile() {
        this.profile = profile;
    }
    setDOB() {
        this.dob = dob;
    }
    setAge() {
        this.age = age;
    }
    setGender() {
        this.gender = gender;
    }
    setCountry() {
        this.country = country;
    }
    setCity() {
        this.city = city;
    }
    setMobile() {
        this.mobile = mobile;
    }
    setEmail() {
        this.email = email;
    }
    setUserAddress() {
        this.userAddress = userAddress;
    }
    setStatus() {
        this.status = status;
    }
}

module.exports = User;