'use strict';

import './vrplayer.css';
import VRPlayerController from './vrplayer.controller';

const vrplayer = {
    restrict: 'E',
    bindings: {
        url: '@'
    },
    controller: VRPlayerController,
    controllerAs: 'vrplayer',
    template: require('./vrplayer.html')
};

export default angular.module('directives.vrplayer', []) //ng2
    .component('vrplayer', vrplayer)
    .name;