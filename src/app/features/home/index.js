'use strict';

import routing from './home.routes';
import HomeController from './home.controller';
import content from './../../services/content/index';
import cubenado from './../../directives/cubenado/cubenado.directive';

export default angular.module('app.home', [content, cubenado])
    .config(routing)
    .controller('HomeController', HomeController)
    .name;