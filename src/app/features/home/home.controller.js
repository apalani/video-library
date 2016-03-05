'use strict';

export default class HomeController {
    constructor(content) {

        // set page to home for navigation
        this.page = 'home';

        // get home page content from content service
        this.content = content.getHomePageContent();

        // set count and speed model defaults
        this.count = 1000;
        this.speed = 3;
    }
}

HomeController.$inject = ['content'];