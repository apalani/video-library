'use strict';

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            template: require('./dashboard.html'),
            controller: 'DashboardController',
            controllerAs: 'dashboard',
            resolve: {
                auth: function(authentication) {
                    return authentication.isLoggedIn();
                }
            }
        });
}