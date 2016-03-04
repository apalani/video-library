'use strict';

class NavigationController {
    constructor(authentication, $state) {

        // adding dependencies to context
        this.authentication = authentication;
        this.$state = $state;
    }

    isActive(current) {

        // used to add 'active' class in navigation
        return this.page === current;
    }

    isLoggedIn() {

        // used to show/hide Login/Logout links in navigation
        return this.authentication.isLoggedIn();
    }

    logout() {

        // clears user from service and redirects to login page
        this.authentication.clearAuth();
        this.$state.go('login');
    }
}

NavigationController.$inject = ['authentication', '$state'];

const navigation = {
    restrict: 'E',
    bindings: {
        page: '@'
    },
    controller: NavigationController,
    controllerAs: 'navigation',
    template: require('./navigation.html')
};

export default angular.module('directives.navigation', [])
    .component('navigation', navigation)
    .name;