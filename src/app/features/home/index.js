'use strict';

import routing from './home.routes';
import HomeController from './home.controller';
import content from './../../services/content/index';
import vrplayer from './../../directives/vrplayer/vrplayer.directive';

export default angular.module('app.home', [content, vrplayer])
    .config(routing)
    .controller('HomeController', HomeController)
    .name;