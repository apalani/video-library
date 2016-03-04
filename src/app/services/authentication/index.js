'use script';

import Authentication from './authentication.service';

export default angular.module('services.authentication', [])
    .service('authentication', Authentication)
    .name;