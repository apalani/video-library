'use strict';

import routing from './dashboard.routes';
import DashboardController from './dashboard.controller';
import content from './../../services/content/index';
import vrplayer from './../../directives/vrplayer/vrplayer.directive';

export default angular.module('app.dashboard', [content, vrplayer])
    .config(routing)
    .controller('DashboardController', DashboardController)
    .name;