'use strict';

import HomePageContent from './../../data/home.page.content';
import DashboardPageContent from './../../data/dashboard.page.content';


export default class Content {

    getHomePageContent() {

        // returns home page content
        return HomePageContent;
    }

    getDashboardPageContent() {

        // returns dashboard page content
        return DashboardPageContent;
    }
}