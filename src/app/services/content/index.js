'use script';

import Content from './content.service';

export default angular.module('services.content', [])
    .service('content', Content)
    .name;