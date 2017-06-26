'use strict';

/**
 * @ngdoc overview
 * @name log330ProjetAcmeSigApp
 * @description
 * # log330ProjetAcmeSigApp
 *
 * Main module of the application.
 */
angular
  .module('log330ProjetAcmeSigApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    console.log($routeProvider);
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        //templateUrl: 'iews/login.html'
      });
  });
