'use strict';

/**
 * @ngdoc overview
 * @name log330ProjetAcmeSigApp
 * @description
 * # log330ProjetAcmeSigApp
 *
 * Main module of the application.
 */
var app = angular
  .module('log330ProjetAcmeSigApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html'
      })
      .when('/registration', {
        templateUrl: 'views/registration.html'
      })
      .when('/account', {
        templateUrl: 'views/account.html'
      })
      .when('/account/trajet', {
        templateUrl: 'views/trajet.html'
      })
      .otherwise({
        //templateUrl: 'iews/login.html'
      });
  });
