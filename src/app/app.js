'use strict';

import 'bootstrap/dist/css/bootstrap.min.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';
import home from './features/home/index';
import login from './features/login/index';
import dashboard from './features/dashboard/index';
import navigation from './directives/navigation/navigation.directive';
import authentication from './services/authentication/index';

angular.module('app', [uirouter, home, login, dashboard, navigation, authentication])
    .config(routing);