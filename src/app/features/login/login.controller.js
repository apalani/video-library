'use strict';

export default class LoginController {
    constructor(authentication, auth, $state) {

        // adding dependencies to context
        this.authentication = authentication;
        this.$state = $state;

        // set page to login for navigation
        this.page = 'login';

        // set user model defaults
        this.user = {
            username: '',
            password: ''
        };

        // set error message defaults
        this.isError = false;

        // redirect to home page when authenticated
        auth ? $state.go('home') : $state.go('login');
    }

    login() {

        // authentication service validates user model on form submit
        // redirects to dashboard when true
        // throw error message otherwise
        if(this.authentication.validate(this.user)) {
            this.isError = false;
            this.$state.go('dashboard');
        } else {
            this.isError = true;
        }
    }
}

LoginController.$inject = ['authentication', 'auth', '$state'];