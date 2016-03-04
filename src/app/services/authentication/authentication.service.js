'use strict';

// constant USER object used for demo purpose
const USER = {
    username: 'demo',
    password: 'demo'
};

export default class Authentication {

    constructor() {

        // initialize user model to empty object
        this.user = {};
    }

    clearAuth() {

        // empty user model
        this.user = {};
    }

    validate(user) {

        // accepts user model as parameter. Compares with USER constant
        // when matches add it to context user model, return false otherwise
        if(JSON.stringify(USER) === JSON.stringify(user)) {

            this.user = user;
            return true;

        } else {

            this.user = {};
            return false;
        }
    }

    isLoggedIn() {

        // returns true if the user is empty, false otherwise
        return JSON.stringify(this.user) !== JSON.stringify({});
    }
}