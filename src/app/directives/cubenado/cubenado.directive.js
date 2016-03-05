'use strict';

import CubeNadoController from './cubenado.controller';

const cubenado = {
    restrict: 'E',
    bindings: {
        count: '=',
        speed: '='
    },
    controller: CubeNadoController,
    controllerAs: 'cubenado',
    template: require('./cubenado.html')
};

export default angular.module('directives.cubenado', [])
    .component('cubenado', cubenado)
    .name;