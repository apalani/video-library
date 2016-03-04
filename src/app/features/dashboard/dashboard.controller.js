'use strict';

export default class DashboardController {
    constructor(content, auth, $state) {

        // set page to dashboard for navigation
        this.page = 'dashboard';

        // get dashboard page content from content service
        this.content = content.getDashboardPageContent();

        // redirect to login page when not authenticated
        auth ? $state.go('dashboard') : $state.go('login');
    }
}

DashboardController.$inject = ['content', 'auth', '$state'];